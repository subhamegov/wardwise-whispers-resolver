import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface NaivashaMapProps {
  selectedLocation: { lat: number; lng: number } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  className?: string;
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (location: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Component to center map
function MapCenterButton({ center }: { center: [number, number] }) {
  const map = useMap();
  
  const handleCenter = () => {
    map.setView(center, 13, { animate: true });
  };

  return (
    <button
      type="button"
      onClick={handleCenter}
      className="absolute top-20 right-3 z-[1000] bg-card text-foreground p-2 rounded-lg shadow-md hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Center map on Naivasha"
    >
      <Navigation className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

export function NaivashaMap({ selectedLocation, onLocationSelect, className }: NaivashaMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  
  // Naivasha center coordinates
  const naivashaCenter: [number, number] = [-0.7167, 36.4359];

  useEffect(() => {
    // Small delay to ensure map renders properly
    const timer = setTimeout(() => setIsMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      {/* Accessible description */}
      <div className="sr-only" id="map-description">
        Interactive map of Naivasha. Click or tap anywhere on the map to select where the issue or story is happening. 
        You can also describe your location in the text field below if you prefer.
      </div>
      
      <div 
        className="map-container relative"
        role="application"
        aria-label="Map of Naivasha for selecting location"
        aria-describedby="map-description"
      >
        <MapContainer
          center={naivashaCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', minHeight: '300px', width: '100%' }}
          ref={mapRef}
          whenReady={() => setIsMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapClickHandler onLocationSelect={onLocationSelect} />
          <MapCenterButton center={naivashaCenter} />
          
          {selectedLocation && (
            <Marker 
              position={[selectedLocation.lat, selectedLocation.lng]} 
              icon={customIcon}
            />
          )}
        </MapContainer>
        
        {/* Loading state */}
        {!isMapReady && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary animate-pulse-soft mx-auto mb-2" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Location display */}
      {selectedLocation && (
        <div 
          className="mt-3 p-3 bg-success/10 border border-success/30 rounded-lg"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 text-success">
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Location selected</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
          </p>
        </div>
      )}

      {/* Instructions */}
      <p className="mt-3 text-sm text-muted-foreground">
        <strong>Tap on the map</strong> to mark where this is happening.
      </p>
    </div>
  );
}
