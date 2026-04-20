// -------------------------------------------------------------
// Hook: useReverseGeocode (clean version)
// Purpose: Convert lat/lng → short human-readable address.
// Returns only: street, city, postcode
// -------------------------------------------------------------

import { useEffect, useState } from "react";

export function useReverseGeocode(lat?: number, lng?: number) {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    // No coords → clear address
    if (lat == null || lng == null) {
      setAddress("");
      return;
    }

    const cacheKey = `geocode_${lat.toFixed(5)}_${lng.toFixed(5)}`;

    // Check cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setAddress(cached);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        );

        const data = await res.json();

        // Nominatim returns structured address fields
        const a = data.address || {};

        // Extract only what we want
        const street =
          a.road ||
          a.residential ||
          a.neighbourhood ||
          a.suburb ||
          a.hamlet ||
          "";
        const city = a.city || a.town || a.village || a.county || "";
        const postcode = a.postcode || "";

        // Build clean short address
        const short = [street, city, postcode].filter(Boolean).join(", ");

        setAddress(short);

        // Cache it
        localStorage.setItem(cacheKey, short);
      } catch {
        setAddress("");
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return address;
}
