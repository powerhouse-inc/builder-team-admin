import { setName } from "document-model";
import type { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";
import { useSelectedServiceSubscriptionsDocument } from "../../../document-models/service-subscriptions/hooks.js";

/** Displays the name of the selected ServiceSubscriptions document and allows editing it */
export function EditServiceSubscriptionsName() {
  const [serviceSubscriptionsDocument, dispatch] =
    useSelectedServiceSubscriptionsDocument();
  const [isEditing, setIsEditing] = useState(false);

  if (!serviceSubscriptionsDocument) return null;

  const serviceSubscriptionsDocumentName =
    serviceSubscriptionsDocument.header.name;

  const onClickEditServiceSubscriptionsName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(true);
  };

  const onClickCancelEditServiceSubscriptionsName: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsEditing(false);
  };

  const onSubmitSetName: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name = nameInput.value;
    if (!name) return;

    dispatch(setName(name));
    setIsEditing(false);
  };

  if (isEditing)
    return (
      <form
        className="flex gap-2 items-center justify-between"
        onSubmit={onSubmitSetName}
      >
        <input
          className="text-lg font-semibold text-gray-900 p-1"
          type="text"
          name="name"
          defaultValue={serviceSubscriptionsDocumentName}
          autoFocus
        />
        <div className="flex gap-2">
          <button type="submit" className="text-sm text-gray-600">
            Save
          </button>
          <button
            className="text-sm text-red-800"
            onClick={onClickCancelEditServiceSubscriptionsName}
          >
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">
        {serviceSubscriptionsDocumentName}
      </h2>
      <button
        className="text-sm text-gray-600"
        onClick={onClickEditServiceSubscriptionsName}
      >
        Edit Name
      </button>
    </div>
  );
}
