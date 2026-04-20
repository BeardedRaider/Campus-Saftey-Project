// -------------------------------------------------------------
// Component: MapPreview
// Purpose: Display a static map image for a given lat/lng.
// Provider: OpenStreetMap -------------------------------------------------------------

interface MapPreviewProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MapPreview({ lat, lng, zoom = 15 }: MapPreviewProps) {
  // OSM static tile URL (256px tiles)
  const tileX = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom));
  const tileY = Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom),
  );

  const tileUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;

  return (
    <img
      src={tileUrl}
      alt="Map preview"
      className="w-full h-40 object-cover rounded-md border border-gray-700 mb-3"
    />
  );
}
