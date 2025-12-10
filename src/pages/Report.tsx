import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, FileText, Mic } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ReportStepper } from '@/components/report/ReportStepper';
import { CategoryPicker } from '@/components/report/CategoryPicker';
import { PhotoUpload } from '@/components/report/PhotoUpload';
import { StarRating } from '@/components/report/StarRating';
import { VoiceRecorder } from '@/components/voice/VoiceRecorder';
import { LocationStep, LocationData } from '@/components/report/LocationStep';
import { apiClient } from '@/lib/apiClient';
import { StorySubmission, IssueCategory } from '@/types/story';
import { cn } from '@/lib/utils';

const STEPS = [
  { number: 1, label: 'Location' },
  { number: 2, label: 'Category' },
  { number: 3, label: 'Photos' },
  { number: 4, label: 'Details' },
  { number: 5, label: 'Rating' },
  { number: 6, label: 'Submit' },
];

const Report = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  // Form state
  const [locationData, setLocationData] = useState<LocationData>({
    coordinates: null,
    admin: { subCounty: '', ward: '', wardCode: '', zone: '' },
    description: ''
  });
  const [issueCategory, setIssueCategory] = useState<IssueCategory | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [recording, setRecording] = useState<{ blob: Blob; duration: number } | null>(null);
  const [serviceRating, setServiceRating] = useState(0);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 1: 
        // Either map pin OR (sub-county + ward) must be provided
        return locationData.coordinates !== null || 
               (locationData.admin.subCounty && locationData.admin.wardCode) ||
               locationData.description.trim().length > 0;
      case 2: return issueCategory !== null;
      case 3: return true; // Photos optional
      case 4: return title.trim().length > 0 && (description.trim().length > 0 || recording !== null);
      case 5: return true; // Rating optional
      case 6: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const submission: StorySubmission = {
        category: 'complaint',
        issueCategory: issueCategory!,
        title: title.trim(),
        description: inputMode === 'text' ? description.trim() : undefined,
        audioBlob: inputMode === 'voice' ? recording?.blob : undefined,
        audioDuration: inputMode === 'voice' ? recording?.duration : undefined,
        photos: photos.length > 0 ? photos : undefined,
        lat: locationData.coordinates?.lat,
        lng: locationData.coordinates?.lng,
        locationDescription: locationData.description.trim() || undefined,
        wardCode: locationData.admin.wardCode || undefined,
        reporterName: reporterName.trim() || undefined,
        reporterPhone: reporterPhone.trim() || undefined,
        serviceRating: serviceRating > 0 ? serviceRating : undefined,
      };

      const result = await apiClient.createStory(submission);
      setTicketId(result.ticketId);
    } catch (err) {
      console.error('Error submitting:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (ticketId) {
    return (
      <AppLayout>
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Report Submitted!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Your ticket ID is:
          </p>
          <p className="text-2xl font-mono font-bold text-primary bg-primary/10 px-6 py-3 rounded-lg inline-block mb-8">
            {ticketId}
          </p>
          <p className="text-muted-foreground mb-8">
            Save this ID to track your report. We'll work on resolving your issue as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/tickets')}
              className="btn-primary"
            >
              View My Tickets
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Report an Issue
        </h1>
        <p className="text-muted-foreground">
          Help improve Nairobi by reporting problems in your area.
        </p>
      </div>

      {/* Stepper */}
      <ReportStepper steps={STEPS} currentStep={currentStep} className="mb-8" />

      {/* Step Content */}
      <div className="bg-card rounded-2xl border border-border p-5 md:p-6 mb-6">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <LocationStep 
            location={locationData}
            onLocationChange={setLocationData}
          />
        )}

        {/* Step 2: Category */}
        {currentStep === 2 && (
          <CategoryPicker
            selected={issueCategory}
            onSelect={setIssueCategory}
          />
        )}

        {/* Step 3: Photos */}
        {currentStep === 3 && (
          <PhotoUpload
            photos={photos}
            onPhotosChange={setPhotos}
            maxPhotos={3}
          />
        )}

        {/* Step 4: Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-foreground mb-2">
                Short title <span className="text-destructive">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Large pothole on Kenyatta Avenue"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={100}
              />
            </div>

            <fieldset>
              <legend className="text-lg font-semibold text-foreground mb-3">
                Describe the issue
              </legend>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setInputMode('text')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all border-2',
                    inputMode === 'text'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  )}
                >
                  <FileText className="w-5 h-5" />
                  <span>Type it</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('voice')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all border-2',
                    inputMode === 'voice'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  )}
                >
                  <Mic className="w-5 h-5" />
                  <span>Record it</span>
                </button>
              </div>

              {inputMode === 'text' ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  maxLength={1000}
                />
              ) : (
                <VoiceRecorder
                  onRecordingComplete={(blob, duration) => setRecording({ blob, duration })}
                  onRecordingClear={() => setRecording(null)}
                  existingRecording={recording}
                />
              )}
            </fieldset>
          </div>
        )}

        {/* Step 5: Rating */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <StarRating
              rating={serviceRating}
              onRatingChange={setServiceRating}
              label="How would you rate the current service in this area? (Optional)"
            />

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your contact info (optional)
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your details if you'd like updates on this issue.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-medium text-foreground mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={reporterPhone}
                    onChange={(e) => setReporterPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Submit */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Review your report
            </h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground font-medium text-right max-w-[60%]">
                  {locationData.coordinates 
                    ? `${locationData.coordinates.lat.toFixed(4)}, ${locationData.coordinates.lng.toFixed(4)}`
                    : locationData.admin.ward 
                      ? `${locationData.admin.ward}, ${locationData.admin.subCounty}`
                      : locationData.description || 'Not specified'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Category</span>
                <span className="text-foreground font-medium capitalize">{issueCategory}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Photos</span>
                <span className="text-foreground font-medium">{photos.length} attached</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Title</span>
                <span className="text-foreground font-medium">{title}</span>
              </div>
              <div className="py-2 border-b border-border">
                <span className="text-muted-foreground block mb-1">Description</span>
                <span className="text-foreground">
                  {inputMode === 'text' ? description : '🎤 Voice recording attached'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
            currentStep === 1
              ? 'opacity-0 pointer-events-none'
              : 'bg-muted text-foreground hover:bg-muted/80'
          )}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-primary flex items-center gap-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Submitting...</span>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Submit Report</span>
              </>
            )}
          </button>
        )}
      </div>
    </AppLayout>
  );
};

export default Report;
