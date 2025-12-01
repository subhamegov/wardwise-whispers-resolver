import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Volume2, Building2 } from 'lucide-react';
import { Happening, HAPPENING_TYPE_LABELS, HAPPENING_TYPE_ICONS } from '@/types/happenings';
import { speakText, stopSpeaking } from '@/lib/apiClient';
import { cn } from '@/lib/utils';

interface HappeningCardProps {
  happening: Happening;
  className?: string;
}

export function HappeningCard({ happening, className }: HappeningCardProps) {
  const [isReading, setIsReading] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleReadAloud = async () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
      return;
    }

    const textToRead = `${happening.title}. ${happening.summary}. From ${happening.source}.`;
    setIsReading(true);
    await speakText(textToRead);
    setIsReading(false);
  };

  const getTypeColor = () => {
    switch (happening.type) {
      case 'INFRASTRUCTURE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'EVENT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'NOTICE': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SERVICE': return 'bg-green-100 text-green-800 border-green-200';
      case 'EMERGENCY': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMMUNITY': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <article 
      className={cn(
        'bg-card rounded-xl border border-border p-4 shadow-soft hover:shadow-medium transition-shadow',
        className
      )}
      aria-labelledby={`happening-title-${happening.id}`}
    >
      {/* Type badge and date */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span 
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
            getTypeColor()
          )}
        >
          <span aria-hidden="true">{HAPPENING_TYPE_ICONS[happening.type]}</span>
          {HAPPENING_TYPE_LABELS[happening.type]}
        </span>
        
        <time 
          dateTime={happening.date}
          className="flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          {formatDate(happening.date)}
          {happening.endDate && ` - ${formatDate(happening.endDate)}`}
        </time>
      </div>

      {/* Title */}
      <h3 
        id={`happening-title-${happening.id}`}
        className="font-bold text-foreground mb-2"
      >
        {happening.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {happening.summary}
      </p>

      {/* Source and ward */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
          {happening.source}
        </span>
        {happening.wardName && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            {happening.wardName} Ward
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border">
        {/* Read aloud button */}
        <button
          type="button"
          onClick={handleReadAloud}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            isReading
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-muted text-foreground hover:bg-muted/80'
          )}
          aria-label={isReading ? 'Stop reading' : 'Read this update aloud'}
          aria-pressed={isReading}
        >
          <Volume2 className="w-4 h-4" aria-hidden="true" />
          {isReading ? 'Stop' : 'Read aloud'}
        </button>

        {/* External link */}
        {happening.link && (
          <a
            href={happening.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            More details
          </a>
        )}
      </div>
    </article>
  );
}
