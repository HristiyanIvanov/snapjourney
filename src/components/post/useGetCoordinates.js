import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loadGoogleMapsScript } from "../../services/apiGoogle";

async function fetchCoordinates(location) {
  const google = await loadGoogleMapsScript();
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        resolve({ latitude: lat(), longitude: lng() });
      } else {
        reject(new Error("Failed to fetch coordinates"));
      }
    });
  });
}

export function useFetchCoordinates(location) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coordinates", location],
    queryFn: () => fetchCoordinates(location),
    enabled: !!location,
  });

  if (isError) {
    toast.error(`Error fetching coordinates: ${error.message}`);
  }

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
