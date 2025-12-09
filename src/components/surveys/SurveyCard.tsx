import React from 'react';
import { Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Survey } from '@/types/survey';

interface SurveyCardProps {
  survey: Survey;
  isCompleted: boolean;
  onParticipate: (survey: Survey) => void;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({
  survey,
  isCompleted,
  onParticipate
}) => {
  return (
    <article
      className="ncc-card p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      aria-labelledby={`survey-title-${survey.id}`}
    >
      <div className="flex-1 min-w-0">
        <h3
          id={`survey-title-${survey.id}`}
          className="font-bold text-foreground text-lg mb-1 truncate"
        >
          {survey.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-1">
          {survey.description}
        </p>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-4 h-4 text-info" aria-hidden="true" />
            <span>{survey.responses.toLocaleString()} responses</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-warning" aria-hidden="true" />
            <span>{survey.daysLeft} days left</span>
          </span>
        </div>
      </div>

      <div className="flex-shrink-0">
        {isCompleted ? (
          <div 
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-success/10 text-success font-medium"
            aria-label="Survey completed"
          >
            <CheckCircle className="w-5 h-5" aria-hidden="true" />
            <span>Completed</span>
          </div>
        ) : (
          <Button
            onClick={() => onParticipate(survey)}
            className="ncc-btn-primary"
            aria-label={`Participate in ${survey.title}`}
          >
            Participate
          </Button>
        )}
      </div>
    </article>
  );
};
