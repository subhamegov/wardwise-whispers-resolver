import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NaivashaMap } from '@/components/map/NaivashaMap';
import { NewStoryPanel } from '@/components/story/NewStoryPanel';
import { StoryFeed } from '@/components/story/StoryFeed';
import { apiClient } from '@/lib/apiClient';
import { StorySubmission } from '@/types/story';

const Report = () => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [feedRefreshTrigger, setFeedRefreshTrigger] = useState(0);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  const handleStorySubmit = async (submission: StorySubmission) => {
    await apiClient.createStory(submission);
    setSelectedLocation(null);
    setFeedRefreshTrigger(prev => prev + 1);
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="mb-8" aria-labelledby="report-hero-title">
        <div className="bg-gradient-to-br from-secondary/20 via-primary/5 to-transparent rounded-2xl p-6 md:p-8">
          <h1 id="report-hero-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Share Your Story
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Report a problem, share an idea, or thank your community. 
            Point to the map and speak or type — we're listening.
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: Map and submission form */}
        <section aria-labelledby="report-section-title">
          <h2 id="report-section-title" className="sr-only">
            Report a new story
          </h2>
          
          {/* Map */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Where is this happening?
            </h3>
            <NaivashaMap
              selectedLocation={selectedLocation}
              onLocationSelect={handleLocationSelect}
              showHappenings={false}
            />
          </div>

          {/* Submission form */}
          <NewStoryPanel
            selectedLocation={selectedLocation}
            onSubmit={handleStorySubmit}
          />
        </section>

        {/* Right column: Story feed */}
        <section aria-labelledby="stories-section-title">
          <StoryFeed refreshTrigger={feedRefreshTrigger} />
        </section>
      </div>
    </AppLayout>
  );
};

export default Report;
