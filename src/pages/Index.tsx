import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, ArrowRight, Ticket } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NairobiMap } from '@/components/map/NairobiMap';
import { HappeningsFeed } from '@/components/happenings/HappeningsFeed';
import { findWardByCoords } from '@/lib/happeningsApi';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDescription, setLocationDescription] = useState('');
  const [selectedWard, setSelectedWard] = useState<{ code: string; name: string } | null>(null);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    const ward = findWardByCoords(location.lat, location.lng);
    setSelectedWard(ward);
  }, []);

  const handleLocationDescriptionChange = useCallback((description: string) => {
    setLocationDescription(description);
  }, []);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="mb-8" aria-labelledby="hero-title">
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-2xl p-6 md:p-8">
          <h1 id="hero-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Your Voice, Your County
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Report issues, track progress, and discover what's happening in Nairobi. 
            Tap the map, speak or type — help build a better city.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4 mb-8">
        <Link
          to="/report"
          className="bg-primary text-primary-foreground rounded-xl p-4 flex flex-col items-center justify-center text-center hover:brightness-105 transition-all min-h-[100px]"
        >
          <PenSquare className="w-8 h-8 mb-2" />
          <span className="font-semibold">Report Issue</span>
        </Link>
        <Link
          to="/tickets"
          className="bg-secondary text-secondary-foreground rounded-xl p-4 flex flex-col items-center justify-center text-center hover:brightness-105 transition-all min-h-[100px]"
        >
          <Ticket className="w-8 h-8 mb-2" />
          <span className="font-semibold">My Tickets</span>
        </Link>
      </section>

      {/* Map Section */}
      <section className="mb-10" aria-labelledby="map-section-title">
        <h2 id="map-section-title" className="text-2xl font-bold text-foreground mb-4">
          Select a Location
        </h2>
        <p className="text-muted-foreground mb-4">
          Mark a spot on the map to see what's happening nearby or to report an issue.
        </p>
        
        <NairobiMap
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          onLocationDescriptionChange={handleLocationDescriptionChange}
          showHappenings={true}
        />
      </section>

      {/* What's Happening Feed */}
      <section className="mb-10" aria-labelledby="happenings-section-title">
        <HappeningsFeed
          wardCode={selectedWard?.code}
          lat={selectedLocation?.lat}
          lng={selectedLocation?.lng}
          radiusKm={5}
        />
      </section>

      {/* CTA Section */}
      <section 
        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-primary-foreground"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              <PenSquare className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="cta-title" className="text-2xl font-bold mb-2">
                See Something? Say Something.
              </h2>
              <p className="opacity-90 max-w-lg">
                Potholes, garbage, broken lights, water leaks — report any issue and 
                help Nairobi County respond faster.
              </p>
            </div>
          </div>
          
          <Link
            to="/report"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:brightness-105 transition-all"
          >
            <span>Report Now</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

        {selectedLocation && selectedWard && (
          <div className="mt-6 pt-6 border-t border-primary-foreground/20">
            <p className="text-sm opacity-80">
              📍 You've selected <strong>{selectedWard.name} Ward</strong>. 
              Your report will be linked to this location.
            </p>
          </div>
        )}
      </section>
    </AppLayout>
  );
};

export default Index;
