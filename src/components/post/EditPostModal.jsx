import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import { GoCheck } from "react-icons/go";
import PlacesAutocomplete from "react-places-autocomplete";
import useLoadGoogleMaps from "../../services/apiGoogle";
import Button from "../../ui/Button";

function EditPostModal({ isVisible, onClose, post, onSave }) {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { data: google } = useLoadGoogleMaps();

  useEffect(() => {
    if (post) {
      setDescription(post.description);
      setAddress(post.location);
    }
  }, [post]);

  const handleSelect = async (value) => {
    setAddress(value);
    if (!google) return;
  };

  const handleSave = async () => {
    setIsSaving(true);
    const updatedData = {};

    if (description !== post.description) {
      updatedData.description = description;
    }
    if (address !== post.location) {
      updatedData.location = address;
    }

    if (Object.keys(updatedData).length > 0) {
      onSave(post.id, updatedData);
    }

    setIsSaving(false);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Edit Post">
      <div className="flex w-[80vw] flex-col gap-4 sm:w-[40vw]">
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="block pb-2 text-sm text-gray-600 dark:text-gray-300"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Enter location",
                    className:
                      "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
                  })}
                />
                <div className="mt-2 rounded-lg shadow-md">
                  {loading && <div className="loader" />}
                  {suggestions.map((suggestion) => {
                    const { placeId } = suggestion;
                    const { key, ...suggestionProps } =
                      getSuggestionItemProps(suggestion);
                    const className = suggestion.active
                      ? "p-2 bg-teal-100 cursor-pointer dark:bg-teal-600 dark:text-gray-300 "
                      : "p-2 bg-white cursor-pointer dark:bg-gray-700 dark:text-gray-300 ";

                    return (
                      <div
                        key={placeId || key}
                        {...suggestionProps}
                        className={className}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <div className="flex justify-end gap-4">
            <Button color="teal" onClick={handleSave} disabled={isSaving}>
              <div className="flex flex-row items-center gap-2">
                <GoCheck />
                {isSaving ? "Saving..." : "Save"}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditPostModal;
