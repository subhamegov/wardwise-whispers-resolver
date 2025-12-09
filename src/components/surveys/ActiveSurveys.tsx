import React, { useState, useCallback, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { SurveyCard } from './SurveyCard';
import { SurveyModal } from './SurveyModal';
import { mockSurveys, markSurveyCompleted, isSurveyCompleted } from '@/lib/surveyData';
import type { Survey } from '@/types/survey';

export const ActiveSurveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [completedSurveys, setCompletedSurveys] = useState<Set<string>>(new Set());
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load completed surveys from session storage on mount
  useEffect(() => {
    const completed = new Set<string>();
    surveys.forEach(s => {
      if (isSurveyCompleted(s.id)) {
        completed.add(s.id);
      }
    });
    setCompletedSurveys(completed);
  }, []);

  const handleParticipate = useCallback((survey: Survey) => {
    setSelectedSurvey(survey);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedSurvey(null);
  }, []);

  const handleSubmitSurvey = useCallback((surveyId: string, answers: Record<string, string>) => {
    // Mark as completed in session storage
    markSurveyCompleted(surveyId);
    setCompletedSurveys(prev => new Set([...prev, surveyId]));

    // Increment response count locally
    setSurveys(prev =>
      prev.map(s =>
        s.id === surveyId ? { ...s, responses: s.responses + 1 } : s
      )
    );

    // In production, this would call DIGIT survey-service API
    console.log('Survey submitted:', { surveyId, answers });
  }, []);

  return (
    <section className="mb-10" aria-labelledby="surveys-section-title">
      <div className="ncc-section-header">
        <h2 id="surveys-section-title" className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-info" aria-hidden="true" />
          Active Surveys
        </h2>
      </div>
      <p className="text-muted-foreground mb-6">
        Share your views on county priorities. Your feedback directly informs service improvements.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {surveys.map(survey => (
          <SurveyCard
            key={survey.id}
            survey={survey}
            isCompleted={completedSurveys.has(survey.id)}
            onParticipate={handleParticipate}
          />
        ))}
      </div>

      <SurveyModal
        survey={selectedSurvey}
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitSurvey}
      />
    </section>
  );
};
