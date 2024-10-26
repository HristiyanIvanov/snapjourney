import PlacesAutocomplete from "react-places-autocomplete";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
function LocationModal({
  isLocationModalOpen,
  closeLocationModal,
  setAddress,
  address,
  setCoordinates,
  google,
}) {
  const handleSelect = async (value) => {
    setAddress(value);

    if (!google) return;

    try {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: value }, (results, status) => {
        if (status === "OK" && results[0]) {
          const latLng = results[0].geometry.location;
          setCoordinates({
            lat: latLng.lat(),
            lng: latLng.lng(),
          });
        } else {
          toast.error("Geocode failed: " + status);
        }
      });
    } catch (error) {
      toast.error("Error during geocoding", error);
    }
  };
  return (
    <Modal
      isVisible={isLocationModalOpen}
      onClose={closeLocationModal}
      title="Select Location"
    >
      <div className="pt-6 md:w-96">
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
                    "w-full p-3 border border-gray-300 rounded-lg outline-teal-400",
                })}
              />
              <div className="mt-2 rounded-lg shadow-md">
                {loading && <div className="p-2">Loading...</div>}
                {suggestions.map((suggestion) => {
                  const { placeId } = suggestion;
                  const { key, ...suggestionProps } =
                    getSuggestionItemProps(suggestion);
                  const className = suggestion.active
                    ? "p-2 bg-teal-100 cursor-pointer"
                    : "p-2 bg-white cursor-pointer";

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

        <div className="mt-4 flex justify-end">
          <Button onClick={closeLocationModal}>Confirm Location</Button>
        </div>
      </div>
    </Modal>
  );
}

export default LocationModal;
