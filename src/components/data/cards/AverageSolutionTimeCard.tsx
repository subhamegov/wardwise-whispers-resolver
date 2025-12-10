import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { InfoTooltip } from '../ServiceAnalytics';
import { getAverageSolutionTime, KPI_DEFINITIONS } from '@/lib/serviceAnalyticsData';

export function AverageSolutionTimeCard() {
  const avgDays = getAverageSolutionTime();

  return (
    <Card className="ncc-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Average Solution Time</CardTitle>
          <InfoTooltip definition={KPI_DEFINITIONS.averageSolutionTime} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-[260px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground mb-2">
              {avgDays}
            </p>
            <p className="text-xl text-muted-foreground">days</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center w-full max-w-xs">
            <div>
              <p className="text-sm text-muted-foreground">Min</p>
              <p className="text-lg font-semibold">0.5 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Median</p>
              <p className="text-lg font-semibold">3.1 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max</p>
              <p className="text-lg font-semibold">21 days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
