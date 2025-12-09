import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, ArrowRight, Ticket, MapPin, Clock, Shield, Users, Settings2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NairobiMap } from '@/components/map/NairobiMap';
import { HappeningsFeed } from '@/components/happenings/HappeningsFeed';
import { ActiveSurveys } from '@/components/surveys/ActiveSurveys';
import { findWardByCoords } from '@/lib/happeningsApi';
import { UserPreferencesModal, loadUserPreferences, UserPreferences } from '@/components/preferences/UserPreferencesModal';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationDescription, setLocationDescription] = useState('');
  const [selectedWard, setSelectedWard] = useState<{ code: string; name: string } | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(loadUserPreferences);
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
      {/* Hero Section - Nairobi Style */}
      <section className="mb-10" aria-labelledby="hero-title">
        <div className="ncc-hero ncc-hero-pattern p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-secondary font-semibold mb-2 uppercase tracking-wide text-sm">
              Welcome to
            </p>
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Nairobi City County
              <span className="block text-secondary">Citizen Portal</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Report issues, track progress, and discover what's happening in your ward. 
              Your voice matters in building a better Nairobi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/report"
                className="ncc-btn-secondary"
              >
                <PenSquare className="w-5 h-5" />
                Report an Issue
              </Link>
              <Link
                to="/my-tickets"
                className="ncc-btn-outline border-white text-white hover:bg-white hover:text-primary"
              >
                <Ticket className="w-5 h-5" />
                Track My Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences Banner */}
      <section className="mb-6">
        <div className="ncc-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings2 className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">
                {userPreferences.subscribedWards.length > 0 || userPreferences.preferredTopics.length > 0
                  ? `Following ${userPreferences.subscribedWards.length} area(s), ${userPreferences.preferredTopics.length} topic(s)`
                  : 'Customize your feed'}
              </p>
              <p className="text-sm text-muted-foreground">
                Select your wards and topics of interest
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreferencesOpen(true)}
            className="gap-2"
          >
            <Settings2 className="w-4 h-4" />
            Preferences
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: MapPin, label: 'Active Reports', value: '1,234', color: 'text-primary' },
          { icon: Clock, label: 'Avg Response', value: '24h', color: 'text-secondary' },
          { icon: Shield, label: 'Resolved', value: '89%', color: 'text-success' },
          { icon: Users, label: 'Citizens Engaged', value: '15K+', color: 'text-accent' },
        ].map((stat, i) => (
          <div key={i} className="ncc-card p-4 md:p-6 text-center">
            <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="mb-10">
        <div className="ncc-section-header">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/report"
            className="ncc-action-tile-primary min-h-[140px]"
          >
            <PenSquare className="w-10 h-10 mb-3" />
            <span className="font-bold text-lg">Report Issue</span>
            <span className="text-sm opacity-80 mt-1">Potholes, garbage, leaks</span>
          </Link>
          <Link
            to="/my-tickets"
            className="ncc-action-tile-secondary min-h-[140px]"
          >
            <Ticket className="w-10 h-10 mb-3" />
            <span className="font-bold text-lg">My Tickets</span>
            <span className="text-sm opacity-80 mt-1">Track your reports</span>
          </Link>
          <Link
            to="/about"
            className="ncc-action-tile-accent min-h-[140px] col-span-2 md:col-span-1"
          >
            <Users className="w-10 h-10 mb-3" />
            <span className="font-bold text-lg">About NCC</span>
            <span className="text-sm opacity-80 mt-1">Learn more about us</span>
          </Link>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-10" aria-labelledby="map-section-title">
        <div className="ncc-section-header">
          <h2 id="map-section-title" className="text-2xl font-bold text-foreground">
            Select Your Location
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Mark a spot on the map to see what's happening nearby or to report an issue in your area.
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
          lat={selectedLocation?.lat ?? -1.2921}
          lng={selectedLocation?.lng ?? 36.8219}
          radiusKm={10}
        />
      </section>

      {/* Active Surveys - Citizen Voice */}
      <ActiveSurveys />

      {/* CTA Section */}
      <section 
        className="ncc-hero p-8 md:p-10"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <PenSquare className="w-7 h-7 text-secondary-foreground" aria-hidden="true" />
            </div>
            <div>
              <h2 id="cta-title" className="text-2xl md:text-3xl font-bold mb-2">
                See Something? Say Something.
              </h2>
              <p className="text-white/90 max-w-lg">
                Potholes, garbage, broken streetlights, water leaks — report any issue and 
                help Nairobi County respond faster to your community's needs.
              </p>
            </div>
          </div>
          
          <Link
            to="/report"
            className="ncc-btn-secondary whitespace-nowrap"
          >
            <span>Report Now</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

        {selectedLocation && selectedWard && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-white/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              You've selected <strong className="text-secondary">{selectedWard.name} Ward</strong>. 
              Your report will be linked to this location.
            </p>
          </div>
        )}
      </section>

      {/* Preferences Modal */}
      <UserPreferencesModal
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        onSave={setUserPreferences}
      />
    </AppLayout>
  );
};

export default Index;
