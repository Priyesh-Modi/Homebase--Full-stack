import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import { LatLngExpression } from 'leaflet'; // Importing LatLngExpression type for center

// Define Item interface with additional properties like title, price, etc.
interface Item {
    id: string;
    latitude: number;
    longitude: number;
    images: string[];
    title: string;
    bedroom: number;
    price: number;
}

interface MapProps {
    items: Item[];
}

const Map: React.FC<MapProps> = ({ items }) => {
    // Define the center with LatLngExpression type for compatibility
    const center: LatLngExpression = items.length === 1
        ? [items[0].latitude, items[0].longitude]
        : [42.360081, -71.058884]; // Default center (Boston, MA)

    return (
        <MapContainer
            center={center}
            zoom={7}
            scrollWheelZoom={false}
            className="map"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {items.map((item) => (
                <Pin item={item} key={item.id} />
            ))}
        </MapContainer>
    );
}

export default Map;
