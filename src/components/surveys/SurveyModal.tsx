import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Survey } from '@/types/survey';

interface SurveyModalProps {
  survey: Survey | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (surveyId: string, answers: Record<string, string>) => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({
  survey,
  open,
  onClose,
  onSubmit
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef<HTMLButtonElement>(null);

  // Reset state when modal opens with a new survey
  useEffect(() => {
    if (open && survey) {
      setAnswers({});
      setIsSubmitted(false);
    }
  }, [open, survey?.id]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open && !isSubmitted) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [open, isSubmitted]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!survey) return;
    onSubmit(survey.id, answers);
    setIsSubmitted(true);
  };

  const allQuestionsAnswered = survey?.questions.every(q => answers[q.id]);

  if (!survey) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent 
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        aria-describedby="survey-modal-description"
      >
        {isSubmitted ? (
          // Thank you screen
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-success" aria-hidden="true" />
            </div>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl">Thank You!</DialogTitle>
              <DialogDescription id="survey-modal-description" className="text-base mt-2">
                Your response has been recorded. Your voice helps shape better services for Nairobi.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={onClose}
              className="ncc-btn-primary mt-4"
              autoFocus
            >
              Close
            </Button>
          </div>
        ) : (
          // Survey form
          <>
            <DialogHeader>
              <DialogTitle className="text-xl pr-8">{survey.title}</DialogTitle>
              <DialogDescription id="survey-modal-description" className="text-base mt-1">
                {survey.description}
              </DialogDescription>
            </DialogHeader>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
              className="mt-6 space-y-6"
            >
              {survey.questions.map((question, qIndex) => (
                <fieldset key={question.id} className="space-y-3">
                  <legend className="font-semibold text-foreground text-base">
                    {qIndex + 1}. {question.text}
                  </legend>
                  <RadioGroup
                    value={answers[question.id] || ''}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="space-y-2"
                  >
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`${question.id}-${oIndex}`}
                          ref={qIndex === 0 && oIndex === 0 ? firstInputRef : undefined}
                        />
                        <Label
                          htmlFor={`${question.id}-${oIndex}`}
                          className="flex-1 cursor-pointer text-foreground"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </fieldset>
              ))}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!allQuestionsAnswered}
                  className="flex-1 ncc-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Response
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
