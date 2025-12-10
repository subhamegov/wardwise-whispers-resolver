import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { User, AlertCircle, Clock, CheckCircle2, AlertTriangle, ArrowRight, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Story, ISSUE_CATEGORIES, STATUS_LABELS } from '@/types/story';
import { apiClient } from '@/lib/apiClient';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '../ServiceAnalytics';

interface SimilarComplaint {
  category: string;
  categoryLabel: string;
  icon: string;
  myCount: number;
  totalCount: number;
  topLocations: string[];
  avgResolutionDays: number;
}

export function MyComplaintsSummary() {
  const [myTickets, setMyTickets] = useState<Story[]>([]);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tickets, stories] = await Promise.all([
        apiClient.getMyTickets(),
        apiClient.getStories()
      ]);
      setMyTickets(tickets);
      setAllStories(stories);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate personal stats
  const myStats = useMemo(() => {
    const complaints = myTickets.filter(t => t.category === 'complaint');
    return {
      total: complaints.length,
      new: complaints.filter(t => t.status === 'new').length,
      inProgress: complaints.filter(t => t.status === 'in_progress' || t.status === 'assigned').length,
      resolved: complaints.filter(t => t.status === 'resolved').length,
      escalated: complaints.filter(t => t.status === 'escalated').length,
      overdue: complaints.filter(t => t.isOverdue || (t.sla && t.sla.remaining < 0)).length,
    };
  }, [myTickets]);

  // Calculate similar complaints based on user's categories
  const similarComplaints = useMemo((): SimilarComplaint[] => {
    const myCategories = new Set(myTickets.map(t => t.issueCategory).filter(Boolean));
    
    if (myCategories.size === 0) return [];

    return Array.from(myCategories).map(categoryCode => {
      const categoryInfo = ISSUE_CATEGORIES.find(c => c.code === categoryCode);
      const myCount = myTickets.filter(t => t.issueCategory === categoryCode).length;
      const allInCategory = allStories.filter(s => s.issueCategory === categoryCode);
      const totalCount = allInCategory.length;
      
      // Get top locations
      const locationCounts = allInCategory.reduce((acc, s) => {
        if (s.wardName) {
          acc[s.wardName] = (acc[s.wardName] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
      
      const topLocations = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name);

      // Mock avg resolution time (in real app, calculate from actual data)
      const avgResolutionDays = Math.floor(Math.random() * 5) + 2;

      return {
        category: categoryCode || 'other',
        categoryLabel: categoryInfo?.label || 'Other',
        icon: categoryInfo?.icon || '📋',
        myCount,
        totalCount,
        topLocations,
        avgResolutionDays,
      };
    }).filter(s => s.totalCount > 0);
  }, [myTickets, allStories]);

  if (isLoading) {
    return (
      <Card className="ncc-card">
        <CardContent className="p-6">
          <div className="h-32 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading your data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (myTickets.length === 0) {
    return (
      <Card className="ncc-card border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">No complaints yet</h3>
              <p className="text-sm text-muted-foreground">
                Report an issue to see your personal analytics and compare with similar complaints.
              </p>
            </div>
            <Link to="/report">
              <Button className="gap-2">
                Report Issue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* My Complaints Summary */}
      <Card className="ncc-card border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">My Complaints Summary</CardTitle>
              <InfoTooltip definition="Summary of your submitted complaints and their current status across all categories." />
            </div>
            <Link to="/tickets">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <StatCard 
              label="Total" 
              value={myStats.total} 
              icon={<AlertCircle className="w-4 h-4" />}
              className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
            <StatCard 
              label="New" 
              value={myStats.new} 
              icon={<Clock className="w-4 h-4" />}
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            />
            <StatCard 
              label="In Progress" 
              value={myStats.inProgress} 
              icon={<TrendingUp className="w-4 h-4" />}
              className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
            />
            <StatCard 
              label="Resolved" 
              value={myStats.resolved} 
              icon={<CheckCircle2 className="w-4 h-4" />}
              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            />
            <StatCard 
              label="Escalated" 
              value={myStats.escalated} 
              icon={<AlertTriangle className="w-4 h-4" />}
              className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
            />
            <StatCard 
              label="Overdue" 
              value={myStats.overdue} 
              icon={<Clock className="w-4 h-4" />}
              className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
            />
          </div>
        </CardContent>
      </Card>

      {/* Similar Complaints Section */}
      {similarComplaints.length > 0 && (
        <Card className="ncc-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg">Similar Complaints from Others</CardTitle>
              <InfoTooltip definition="Complaints from other citizens in the same categories as yours. See how many others are facing similar issues." />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarComplaints.map((similar) => (
                <div 
                  key={similar.category}
                  className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{similar.icon}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{similar.categoryLabel}</h4>
                        <p className="text-xs text-muted-foreground">
                          You: {similar.myCount} • Others: {similar.totalCount - similar.myCount}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {similar.totalCount} total
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Avg. Resolution:</span>
                      <span className="font-medium text-foreground">{similar.avgResolutionDays} days</span>
                    </div>
                    
                    {similar.topLocations.length > 0 && (
                      <div>
                        <span className="text-xs text-muted-foreground">Hot spots:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {similar.topLocations.map((loc) => (
                            <Badge key={loc} variant="outline" className="text-xs">
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  className 
}: { 
  label: string; 
  value: number; 
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl p-3 text-center', className)}>
      <div className="flex items-center justify-center gap-1 mb-1">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}
