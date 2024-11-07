import { useEffect, useRef, useState } from "react";
import Modal from "../../ui/Modal";
import { loadGoogleMapsScript } from "../../services/apiGoogle";

function MapModal({ latitude, longitude, isVisible, onClose, isLoading }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const loadMap = async () => {
      if (mapContainerRef.current && isVisible && !mapInstanceRef.current) {
        const google = await loadGoogleMapsScript();
        setGoogleLoaded(true);
        const { AdvancedMarkerElement } =
          await google.maps.importLibrary("marker");

        mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
          mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
        });

        new AdvancedMarkerElement({
          position: { lat: latitude, lng: longitude },
          map: mapInstanceRef.current,
          title: "Location",
        });
      }
    };

    if (isVisible) {
      loadMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [isVisible, latitude, longitude, googleLoaded]);

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Map"
      className="flex flex-col items-center"
    >
      {isLoading ? (
        <div className="loader" />
      ) : (
        <div className="h-[80vh] w-[80vw]">
          <div ref={mapContainerRef} className="h-full w-full"></div>
        </div>
      )}
    </Modal>
  );
}

export default MapModal;
