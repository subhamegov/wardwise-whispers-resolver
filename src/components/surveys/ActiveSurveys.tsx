import React, { useState, useCallback } from 'react';
import { SurveyCard } from './SurveyCard';
import { SurveyModal } from './SurveyModal';
import { mockSurveys, markSurveyCompleted, saveUserChoice } from '@/lib/surveyData';
import type { Survey } from '@/types/survey';

export const ActiveSurveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleParticipate = useCallback((survey: Survey) => {
    setSelectedSurvey(survey);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedSurvey(null);
  }, []);

  const handleSubmitSurvey = useCallback((surveyId: string, answers: Record<string, string>) => {
    // Save user choices
    Object.entries(answers).forEach(([questionId, choice]) => {
      saveUserChoice(surveyId, questionId, choice);
    });
    
    // Mark as completed
    markSurveyCompleted(surveyId);

    // Increment response count locally
    setSurveys(prev =>
      prev.map(s =>
        s.id === surveyId ? { ...s, responses: s.responses + 1 } : s
      )
    );

    console.log('Survey submitted:', { surveyId, answers });
  }, []);

  return (
    <section className="mb-10" aria-labelledby="surveys-section-title">
      <h2 
        id="surveys-section-title" 
        className="text-2xl font-bold text-foreground mb-6"
      >
        Active Surveys
      </h2>

      <div className="space-y-4">
        {surveys.map(survey => (
          <SurveyCard
            key={survey.id}
            survey={survey}
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
