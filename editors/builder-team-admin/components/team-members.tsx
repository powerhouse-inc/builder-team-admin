import { useMemo, useCallback } from "react";
import type { FileNode } from "document-drive";
import {
  useDocumentsInSelectedDrive,
  useDrives,
  useGetDocuments,
  useDocumentById,
} from "@powerhousedao/reactor-browser";
import {
  ObjectSetTable,
  type ColumnDef,
  type ColumnAlignment,
  PHIDInput,
} from "@powerhousedao/document-engineering";
import type {
  BuilderProfileDocument,
  BuilderProfileState,
} from "@powerhousedao/builder-profile/document-models/builder-profile";
import { actions as builderProfileActions } from "@powerhousedao/builder-profile/document-models/builder-profile";

type Contributor = {
  phid: string;
  name: string;
  slug: string;
  icon: string | null;
};

type ProfileOption = {
  id: string;
  label: string;
  value: string;
  title: string;
};

export function ContributorsSection({}) {
  const drives = useDrives();
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();

  // find builder-profile document in the selected drive
  const builderProfileDocument = useMemo(() => {
    if (!documentsInSelectedDrive) return null;
    return documentsInSelectedDrive.find(
      (doc) => doc.header.documentType === "powerhouse/builder-profile",
    );
  }, [documentsInSelectedDrive]);
  const [buildDoc, dispatch] = useDocumentById(
    builderProfileDocument?.header.id,
  );

  const contributors = useMemo<string[]>(() => {
    const state = buildDoc?.state as
      | { global?: { contributors?: string[] } }
      | undefined;
    return state?.global?.contributors || [];
  }, [buildDoc]);

  // Map all builder profile FileNodes from all drives with their driveId
  const builderProfileNodesWithDriveId = useMemo(() => {
    if (!drives) return [];
    return drives.flatMap((drive) => {
      const builderProfileNodes = drive.state.global.nodes.filter(
        (node): node is FileNode =>
          node.kind === "file" &&
          "documentType" in node &&
          node.documentType === "powerhouse/builder-profile",
      );
      return builderProfileNodes.map((node) => ({
        node,
        driveId: drive.header.id,
      }));
    });
  }, [drives]);

  // Get all unique builder PHIDs from the nodes
  const builderPhids = useMemo(() => {
    return builderProfileNodesWithDriveId.map(({ node }) => node.id);
  }, [builderProfileNodesWithDriveId]);

  // Fetch all builder profile documents from all drives
  const builderProfileDocuments = useGetDocuments(builderPhids);

  // Create a map of PHID to document for quick lookup
  const builderProfileMap = useMemo(() => {
    const map = new Map<string, BuilderProfileDocument>();
    if (!builderProfileDocuments) return map;
    builderProfileDocuments.forEach((doc) => {
      if (doc.header.documentType === "powerhouse/builder-profile") {
        map.set(doc.header.id, doc as BuilderProfileDocument);
      }
    });
    return map;
  }, [builderProfileDocuments]);

  // Helper function to get builder profile documents from all drives
  const getBuilderProfiles = useCallback((): ProfileOption[] => {
    return builderProfileNodesWithDriveId.map(({ node }) => {
      const doc = builderProfileMap.get(node.id);
      const name = doc?.state?.global?.name || node.name || node.id;
      return {
        id: node.id,
        label: name,
        value: node.id,
        title: name,
      };
    });
  }, [builderProfileNodesWithDriveId, builderProfileMap]);

  // Helper function to get builder profile data by PHID from all drives
  const getBuilderProfileByPhid = useCallback(
    (phid: string) => {
      const doc = builderProfileMap.get(phid);
      if (!doc) return null;

      return {
        name: doc.state.global?.name || doc.header.id,
        slug: doc.state.global?.slug || doc.header.id,
        icon: doc.state.global?.icon || null,
      };
    },
    [builderProfileMap],
  );

  const contributorData = useMemo<Contributor[]>(() => {
    return contributors.map((phid) => {
      const profile = getBuilderProfileByPhid(phid);
      return {
        phid: phid,
        name: profile?.name || "",
        slug: profile?.slug || "",
        icon: profile?.icon || null,
      };
    });
  }, [contributors, getBuilderProfileByPhid]);

  const columns = useMemo<Array<ColumnDef<Contributor>>>(
    () => [
      {
        field: "phid",
        title: "PHID",
        editable: true,
        align: "center" as ColumnAlignment,
        width: 200,
        onSave: (newValue, context) => {
          const currentId = context.row.phid || "";
          if (newValue !== currentId && newValue && currentId) {
            // First remove the old contributor
            dispatch(
              builderProfileActions.removeContributor({
                contributorPHID: currentId,
              }),
            );
            // Then add the new contributor with the new PHID
            dispatch(
              builderProfileActions.addContributor({
                contributorPHID: newValue as string,
              }),
            );
            return true;
          }
          return false;
        },
        renderCellEditor: (value, onChange, context) => (
          <PHIDInput
            value={(value as string) || ""}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            onBlur={(e) => {
              const newValue = e.target.value;
              const currentValue = (value as string) || "";

              // If a PHID is entered and it's different from current value
              if (newValue && newValue !== currentValue) {
                const existingContributor = contributors.find(
                  (contributor) => contributor === newValue,
                );

                if (!existingContributor) {
                  // If we're editing an existing row (has an ID), remove the old one first
                  if (context.row.phid && context.row.phid !== newValue) {
                    dispatch(
                      builderProfileActions.removeContributor({
                        contributorPHID: context.row.phid,
                      }),
                    );
                  }

                  // Add the new contributor
                  dispatch(
                    builderProfileActions.addContributor({
                      contributorPHID: newValue,
                    }),
                  );
                }
              }
            }}
            placeholder="Enter PHID"
            className="w-full"
            variant="withValueAndTitle"
            initialOptions={getBuilderProfiles()}
            fetchOptionsCallback={(userInput: string) => {
              const builderProfiles = getBuilderProfiles();

              // Filter profiles based on user input
              if (!userInput.trim()) {
                return Promise.resolve(builderProfiles);
              }

              const filteredProfiles = builderProfiles.filter(
                (profile) =>
                  profile.label
                    .toLowerCase()
                    .includes(userInput.toLowerCase()) ||
                  profile.id.toLowerCase().includes(userInput.toLowerCase()),
              );

              return Promise.resolve(filteredProfiles);
            }}
          />
        ),
        renderCell: (value) => {
          if (value === "" || !value) {
            return (
              <div className="font-light italic text-gray-500 text-center">
                + Double-click to add new contributor (enter or click outside to
                save)
              </div>
            );
          }
          return <div className="text-center font-mono text-sm">{value}</div>;
        },
      },
      {
        field: "name",
        title: "Name",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "slug",
        title: "Slug",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 200,
        renderCell: (value) => {
          return <div className="text-center">{value}</div>;
        },
      },
      {
        field: "icon",
        title: "Icon",
        editable: false,
        align: "center" as ColumnAlignment,
        width: 150,
        renderCell: (_value, context) => {
          if (!context.row.icon) {
            return null;
          }
          return (
            <div className="text-center">
              <img
                src={context.row.icon}
                alt="Contributor icon"
                className="w-10 h-10 rounded-sm mx-auto object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          );
        },
      },
    ],
    [contributors, getBuilderProfiles, dispatch],
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Contributors</h3>
      <p className="text-sm text-gray-600 mb-4">
        Add team members to your builder profile. Search for existing builder
        profiles by name or PHID.
      </p>
      <ObjectSetTable
        columns={columns}
        data={contributorData}
        allowRowSelection={true}
        onDelete={(data) => {
          if (data.length > 0) {
            data.forEach((d) => {
              dispatch(
                builderProfileActions.removeContributor({
                  contributorPHID: d.phid,
                }),
              );
            });
          }
        }}
        onAdd={(data) => {
          // Only add if we have a PHID
          const phid = (data as { id?: string }).id;
          if (phid) {
            dispatch(
              builderProfileActions.addContributor({ contributorPHID: phid }),
            );
          }
        }}
      />
    </div>
  );
}
