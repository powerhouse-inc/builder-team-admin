/**
 * GraphQL client utility for fetching remote builder profiles from Switchboard.
 * This is used as a fallback when local drives don't have the builder profile documents.
 */

function getGraphQLUrl(): string {
  if (typeof window === "undefined") {
    return "http://localhost:4001/graphql";
  }

  const baseURI = window.document.baseURI;

  if (baseURI.includes("localhost")) {
    return "http://localhost:4001/graphql";
  }

  // Determine the appropriate Switchboard URL based on environment
  if (baseURI.includes("-dev.")) {
    return "https://switchboard-dev.powerhouse.xyz/graphql";
  }

  if (baseURI.includes("-staging.")) {
    return "https://switchboard-staging.powerhouse.xyz/graphql";
  }

  // Production environment
  return "https://switchboard.powerhouse.xyz/graphql";
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { silent?: boolean },
): Promise<T | null> {
  try {
    const response = await fetch(getGraphQLUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      if (!options?.silent) {
        console.warn(
          "[graphql-client] Request failed:",
          response.status,
          response.statusText,
        );
      }
      return null;
    }

    const result = (await response.json()) as GraphQLResponse<T>;

    // Return data even if there are errors - partial data might still be useful
    // Only treat as full failure if there's no data at all
    if (result.errors?.length && !result.data) {
      if (!options?.silent) {
        console.warn("[graphql-client] GraphQL errors:", result.errors);
      }
      return null;
    }

    return result.data ?? null;
  } catch (error) {
    // Silently fail - this is a fallback mechanism
    if (!options?.silent) {
      console.warn("[graphql-client] Request error:", error);
    }
    return null;
  }
}

// Query to get all available drives
const GET_DRIVES_QUERY = `
  query GetDrives {
    drives
  }
`;

// Query to get drive ID by slug
const GET_DRIVE_ID_BY_SLUG_QUERY = `
  query GetDriveIdBySlug($slug: String!) {
    driveIdBySlug(slug: $slug)
  }
`;

// Query to get builder profile documents from a drive
const GET_BUILDER_PROFILES_QUERY = `
  query GetBuilderProfiles($driveId: String!) {
    BuilderProfile {
      getDocuments(driveId: $driveId) {
        id
        state {
          name
          slug
          icon
        }
      }
    }
  }
`;

// Query to get a single builder profile by ID
const GET_BUILDER_PROFILE_QUERY = `
  query GetBuilderProfile($docId: PHID!, $driveId: PHID) {
    BuilderProfile {
      getDocument(docId: $docId, driveId: $driveId) {
        id
        state {
          name
          slug
          icon
        }
      }
    }
  }
`;

interface DrivesResponse {
  drives: string[];
}

interface DriveIdBySlugResponse {
  driveIdBySlug: string;
}

export interface RemoteBuilderProfile {
  id: string;
  state: {
    name: string | null;
    slug: string | null;
    icon: string | null;
  };
}

interface BuilderProfilesResponse {
  BuilderProfile: {
    getDocuments: RemoteBuilderProfile[];
  };
}

interface SingleBuilderProfileResponse {
  BuilderProfile: {
    getDocument: RemoteBuilderProfile | null;
  };
}

/**
 * Fetches all available remote drives
 */
export async function fetchRemoteDrives(): Promise<string[]> {
  const data = await graphqlRequest<DrivesResponse>(GET_DRIVES_QUERY);
  return data?.drives ?? [];
}

/**
 * Fetches drive ID by slug
 */
export async function fetchDriveIdBySlug(slug: string): Promise<string | null> {
  const data = await graphqlRequest<DriveIdBySlugResponse>(
    GET_DRIVE_ID_BY_SLUG_QUERY,
    { slug },
  );
  return data?.driveIdBySlug ?? null;
}

/**
 * Fetches all builder profiles from a specific drive
 */
export async function fetchBuilderProfilesFromDrive(
  driveId: string,
  options?: { silent?: boolean },
): Promise<RemoteBuilderProfile[]> {
  const data = await graphqlRequest<BuilderProfilesResponse>(
    GET_BUILDER_PROFILES_QUERY,
    { driveId },
    options,
  );
  return data?.BuilderProfile?.getDocuments ?? [];
}

/**
 * Fetches a single builder profile by document ID
 */
export async function fetchBuilderProfileById(
  docId: string,
  driveId?: string,
): Promise<RemoteBuilderProfile | null> {
  const data = await graphqlRequest<SingleBuilderProfileResponse>(
    GET_BUILDER_PROFILE_QUERY,
    { docId, driveId },
  );
  return data?.BuilderProfile?.getDocument ?? null;
}

/**
 * Fetches all builder profiles from all available remote drives.
 * This aggregates profiles from multiple drives into a single list.
 */
export async function fetchAllRemoteBuilderProfiles(): Promise<
  RemoteBuilderProfile[]
> {
  try {
    const drives = await fetchRemoteDrives();
    if (!drives.length) {
      return [];
    }

    // Fetch profiles from all drives in parallel (silent to avoid console spam)
    const profilePromises = drives.map((driveSlug) =>
      fetchBuilderProfilesFromDrive(driveSlug, { silent: true }).catch(
        () => [],
      ),
    );

    const profileArrays = await Promise.all(profilePromises);

    // Flatten and dedupe by ID
    const profileMap = new Map<string, RemoteBuilderProfile>();
    for (const profiles of profileArrays) {
      for (const profile of profiles) {
        if (!profileMap.has(profile.id)) {
          profileMap.set(profile.id, profile);
        }
      }
    }

    return Array.from(profileMap.values());
  } catch {
    return [];
  }
}

/**
 * Fetches multiple builder profiles by their IDs.
 * Tries to find them across all available remote drives.
 */
export async function fetchRemoteBuilderProfilesByIds(
  phids: string[],
): Promise<Map<string, RemoteBuilderProfile>> {
  if (!phids.length) {
    return new Map();
  }

  try {
    // First, get all profiles from all drives
    const allProfiles = await fetchAllRemoteBuilderProfiles();

    // Filter to only the ones we need
    const result = new Map<string, RemoteBuilderProfile>();
    for (const profile of allProfiles) {
      if (phids.includes(profile.id)) {
        result.set(profile.id, profile);
      }
    }

    // For any missing profiles, try direct fetch
    const missingPhids = phids.filter((phid) => !result.has(phid));
    if (missingPhids.length > 0) {
      const directFetches = missingPhids.map(async (phid) => {
        const profile = await fetchBuilderProfileById(phid);
        if (profile) {
          result.set(phid, profile);
        }
      });
      await Promise.all(directFetches);
    }

    return result;
  } catch {
    return new Map();
  }
}
