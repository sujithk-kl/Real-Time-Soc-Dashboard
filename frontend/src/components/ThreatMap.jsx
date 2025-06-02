import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function ThreatMap() {
  return (
    <div className="bg-white p-4 rounded shadow h-64">
      <h3 className="text-lg font-semibold mb-2">Threat Map</h3>
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} className="h-full w-full rounded">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[37.7749, -122.4194]}>
          <Popup>Suspicious IP: 192.168.1.10</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
