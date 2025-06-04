import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function ThreatMap() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-[400px]">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Threat Map</h3>

      {/* Medium square map container (1:1 aspect ratio) */}
      <div className="relative w-full pb-[100%] rounded-lg overflow-hidden"> {/* 1:1 ratio */}
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={false}
          className="absolute top-0 left-0 w-full h-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.7749, -122.4194]}>
            <Popup>Suspicious IP: 192.168.1.10</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}
