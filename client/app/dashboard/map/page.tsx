"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for the red pin
const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Crime data interface
interface CrimeData {
  lat: number;
  lng: number;
  type: string;
  location: string;
  time: string;
  intensity: number;
}

function RecenterButton() {
  const map = useMap();

  const handleRecenter = () => {
    if (map) {
      map.setView([28.6139, 77.209], 13);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <button
        onClick={handleRecenter}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
      >
        Recenter
      </button>
    </div>
  );
}

export default function CrimeMap() {
  const [crimes, setCrimes] = useState<CrimeData[]>([
    {
      lat: 28.6448,
      lng: 77.2152,
      type: "Mugging",
      location: "Paharganj",
      time: "12:20 AM",
      intensity: 7,
    },
    {
      lat: 28.6129,
      lng: 77.2295,
      type: "Robbery",
      location: "Karol Bagh",
      time: "11:45 PM",
      intensity: 8,
    },
    {
      lat: 28.609,
      lng: 77.2219,
      type: "Assault",
      location: "New Delhi",
      time: "10:30 PM",
      intensity: 6,
    },
    {
      lat: 28.5917,
      lng: 77.1534,
      type: "Theft",
      location: "Janakpuri",
      time: "9:15 PM",
      intensity: 5,
    },
    {
      lat: 28.6315,
      lng: 77.2167,
      type: "Pickpocketing",
      location: "Connaught Place",
      time: "8:00 PM",
      intensity: 4,
    },
  ]);

  const mapCenter: [number, number] = [28.6139, 77.209]; // New Delhi coordinates

  // Helper function to get color based on intensity
  const getCircleColor = (intensity: number) => {
    return `rgba(255, 0, 0, ${intensity / 20})`;
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterButton />

        {crimes.map((crime, index) => (
          <div key={index}>
            <Circle
              center={[crime.lat, crime.lng]}
              radius={500}
              pathOptions={{
                fillColor: getCircleColor(crime.intensity),
                fillOpacity: 0.6,
                color: "red",
                weight: 1,
              }}
            />
            <Marker position={[crime.lat, crime.lng]} icon={pinIcon}>
              <Popup className="crime-popup">
                <div className="p-2">
                  <div className="flex items-center mb-2">
                    <span className="text-red-600 text-lg font-bold">
                      ⚠️ {crime.type}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-pink-500">📍 Location:</span>{" "}
                    {crime.location}
                  </div>
                  <div className="mb-1">
                    <span className="text-amber-500">⏰ Time:</span>{" "}
                    {crime.time}
                  </div>
                  <div>
                    <span className="text-orange-500">🔥 Intensity:</span>{" "}
                    {crime.intensity}/10
                  </div>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
