import { useGeolocation } from "../hooks/useGeolocation";

export default function GeoTest() {
  const { 
        position, 
        error, 
        getCurrentLocation, 
        startWatching, 
        stopWatching 
    } = useGeolocation();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Geolocation Test</h1>

      {/* Buttons to trigger geolocation actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={getCurrentLocation}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          Get Current Location
        </button>

        <button
          onClick={startWatching}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Start Watching
        </button>

        <button onClick={stopWatching} className="bg-red-500 px-4 py-2 rounded">
          Stop Watching
        </button>
      </div>

      {/* Show errors if any */}
      {error && <p className="text-red-400 mb-4">Error: {error}</p>}

      {/* Show current position */}
      {position && (
        <div className="text-gray-300">
          <p>Latitude: {position.coords.latitude}</p>
          <p>Longitude: {position.coords.longitude}</p>
          <p>Accuracy: {position.coords.accuracy} meters</p>
        </div>
      )}
    </div>
  );
}
