import React, { useState } from 'react';
import { FileText, HardHat, MessageSquare, Mic, MicOff, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type ComplaintIntent = 'service' | 'project' | 'feedback';

export interface LinkedProject {
  id: string;
  title: string;
  category: string;
  status: 'Planned' | 'Ongoing' | 'Completed';
  agency: string;
}

interface ComplaintIntentStepProps {
  intent: ComplaintIntent | null;
  onIntentChange: (intent: ComplaintIntent) => void;
  linkedProject: LinkedProject | null;
  onLinkedProjectChange: (project: LinkedProject | null) => void;
  wardCode?: string;
}

// Mock projects for demonstration
const MOCK_PROJECTS: LinkedProject[] = [
  {
    id: 'PRJ-001',
    title: 'Transformer Upgrade – Kilimani Ward',
    category: 'Power',
    status: 'Ongoing',
    agency: 'Kenya Power'
  },
  {
    id: 'PRJ-002',
    title: 'Drainage Rehabilitation – Westlands',
    category: 'Water & Sanitation',
    status: 'Completed',
    agency: 'Nairobi County Works Dept.'
  },
  {
    id: 'PRJ-003',
    title: 'Road Resurfacing – Ngong Road',
    category: 'Roads & Infrastructure',
    status: 'Ongoing',
    agency: 'KURA'
  },
  {
    id: 'PRJ-004',
    title: 'Street Lighting Installation – CBD',
    category: 'Power',
    status: 'Planned',
    agency: 'Nairobi County Lighting Dept.'
  }
];

const INTENT_OPTIONS = [
  {
    id: 'service' as ComplaintIntent,
    icon: '🧾',
    title: 'Complain about a Service',
    description: 'Report an issue with water, waste, street lighting, traffic, or other county services.',
    examples: 'e.g., "Garbage not collected for a week", "Streetlight not working"'
  },
  {
    id: 'project' as ComplaintIntent,
    icon: '🚧',
    title: 'Complain about a Project',
    description: 'Share feedback or problems related to an ongoing or completed county project.',
    examples: 'e.g., "Construction blocking my driveway", "Project delayed for months"'
  },
  {
    id: 'feedback' as ComplaintIntent,
    icon: '💬',
    title: 'Provide General Feedback',
    description: 'Share a suggestion, appreciation, or general comment to help improve services.',
    examples: 'e.g., "Great job on the new park!", "Suggestion for better waste bins"'
  }
];

export const ComplaintIntentStep: React.FC<ComplaintIntentStepProps> = ({
  intent,
  onIntentChange,
  linkedProject,
  onLinkedProjectChange,
  wardCode
}) => {
  const [showProjects, setShowProjects] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-KE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceTranscript(transcript);

      // Auto-detect intent from voice
      if (transcript.includes('project') || transcript.includes('construction') || transcript.includes('building')) {
        onIntentChange('project');
        setShowProjects(true);
      } else if (transcript.includes('feedback') || transcript.includes('suggestion') || transcript.includes('appreciation') || transcript.includes('thank')) {
        onIntentChange('feedback');
      } else {
        // Default to service complaint
        onIntentChange('service');
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'bg-muted text-muted-foreground';
      case 'Ongoing': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          What would you like to share today?
        </h2>
        <p className="text-muted-foreground">
          Help us route your feedback to the right team.
        </p>
      </div>

      {/* Voice Input Option */}
      <div className="flex justify-center">
        <button
          onClick={handleVoiceInput}
          disabled={isListening}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all border-2',
            isListening
              ? 'border-primary bg-primary/10 text-primary animate-pulse'
              : 'border-border bg-card text-foreground hover:border-primary/50'
          )}
          aria-label="Record your voice to tell us what you want to do"
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Listening...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Tell us what you want to do</span>
            </>
          )}
        </button>
      </div>

      {/* Voice Transcript */}
      {voiceTranscript && (
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-sm text-muted-foreground">You said:</p>
          <p className="text-foreground font-medium">"{voiceTranscript}"</p>
        </div>
      )}

      {/* Intent Options */}
      <div className="grid gap-4">
        {INTENT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              onIntentChange(option.id);
              if (option.id === 'project') {
                setShowProjects(true);
              } else {
                setShowProjects(false);
                onLinkedProjectChange(null);
              }
            }}
            className={cn(
              'w-full text-left p-5 rounded-xl border-2 transition-all',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              intent === option.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/40'
            )}
            role="button"
            aria-pressed={intent === option.id}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-lg">
                    {option.title}
                  </h3>
                  {intent === option.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-muted-foreground mt-1">
                  {option.description}
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2 italic">
                  {option.examples}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Project Selection (when "Project" intent is selected) */}
      {intent === 'project' && (
        <div className="border-t border-border pt-6 space-y-4">
          {/* Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <p className="font-medium text-foreground">Show nearby projects</p>
              <p className="text-sm text-muted-foreground">
                View ongoing projects near your location
              </p>
            </div>
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="text-primary"
              aria-label={showProjects ? 'Hide projects' : 'Show projects'}
              aria-pressed={showProjects}
            >
              {showProjects ? (
                <ToggleRight className="w-10 h-10" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Project List */}
          {showProjects && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Select a project to link your complaint:
              </p>

              {MOCK_PROJECTS.length > 0 ? (
                <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {MOCK_PROJECTS.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => onLinkedProjectChange(
                        linkedProject?.id === project.id ? null : project
                      )}
                      className={cn(
                        'w-full text-left p-4 rounded-lg border-2 transition-all',
                        'focus:outline-none focus:ring-2 focus:ring-primary',
                        linkedProject?.id === project.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/40'
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium text-foreground">
                              {project.title}
                            </h4>
                            <Badge className={cn('text-xs', getStatusColor(project.status))}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span>{project.category}</span>
                            <span>•</span>
                            <span>{project.agency}</span>
                          </div>
                        </div>
                        {linkedProject?.id === project.id && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/30 rounded-xl">
                  <HardHat className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No active projects found near your selected area.
                  </p>
                  <button
                    onClick={() => {
                      onLinkedProjectChange(null);
                    }}
                    className="text-primary font-medium mt-3 hover:underline"
                  >
                    Continue without linking a project
                  </button>
                </div>
              )}

              {/* Skip option */}
              {MOCK_PROJECTS.length > 0 && (
                <button
                  onClick={() => onLinkedProjectChange(null)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  Continue without selecting a project
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Feedback Intent Additional Info */}
      {intent === 'feedback' && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-foreground">
            <strong>Great!</strong> On the next screen, you'll be able to share your suggestion, 
            appreciation, or general comment. Your feedback helps us improve services for everyone.
          </p>
        </div>
      )}
    </div>
  );
};
