import { useQuery } from "@tanstack/react-query";

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (typeof window.google === "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.onload = () => resolve(window.google);
      script.onerror = () =>
        reject(new Error("Google Maps script failed to load"));
      document.body.appendChild(script);
    } else {
      resolve(window.google);
    }
  });
}

export default function useLoadGoogleMaps() {
  return useQuery({
    queryKey: ["googleMaps"],
    queryFn: loadGoogleMapsScript,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
}
