import React, { useState, useMemo, useEffect } from 'react';
import { 
  RefreshCw, 
  Clock, 
  AlertTriangle, 
  ArrowUpDown, 
  Eye,
  Image,
  Mic,
  RotateCcw
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ALL_COUNTY_ISSUES,
  CURRENT_RESOLVER,
  getMyAssignedIssues,
  getDepartmentIssues,
  getAwaitingResponseIssues,
  getReopenedIssues,
  getClosedByMeIssues,
  getIssueAge,
  getSlaCountdown,
  DEPARTMENT_COLORS,
  type ResolverIssue,
} from '@/lib/resolverIssuesData';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-destructive/15 text-destructive';
    case 'assigned': return 'bg-info/15 text-info';
    case 'in progress': return 'bg-warning/15 text-warning';
    case 'awaiting response': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'reopened': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    case 'closed': return 'bg-success/15 text-success';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return <Badge variant="destructive">{priority}</Badge>;
    case 'high': return <Badge className="bg-warning text-warning-foreground">{priority}</Badge>;
    case 'medium': return <Badge variant="secondary">{priority}</Badge>;
    case 'low': return <Badge variant="outline">{priority}</Badge>;
    default: return <Badge variant="outline">{priority}</Badge>;
  }
};

export default function ResolverTasks() {
  const [activeTab, setActiveTab] = useState('assigned-to-me');
  const [selectedIssue, setSelectedIssue] = useState<ResolverIssue | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  // Get issues for each tab
  const myAssignedIssues = useMemo(() => getMyAssignedIssues(), [lastRefresh]);
  const departmentIssues = useMemo(() => getDepartmentIssues(), [lastRefresh]);
  const awaitingResponseIssues = useMemo(() => getAwaitingResponseIssues(), [lastRefresh]);
  const reopenedIssues = useMemo(() => getReopenedIssues(), [lastRefresh]);
  const closedByMeIssues = useMemo(() => getClosedByMeIssues(), [lastRefresh]);

  const tabCounts = {
    'assigned-to-me': myAssignedIssues.length,
    'department': departmentIssues.length,
    'awaiting-response': awaitingResponseIssues.length,
    'reopened': reopenedIssues.length,
    'closed-by-me': closedByMeIssues.length,
  };

  const getCurrentTabIssues = () => {
    switch (activeTab) {
      case 'assigned-to-me': return myAssignedIssues;
      case 'department': return departmentIssues;
      case 'awaiting-response': return awaitingResponseIssues;
      case 'reopened': return reopenedIssues;
      case 'closed-by-me': return closedByMeIssues;
      default: return myAssignedIssues;
    }
  };

  return (
    <ResolverLayout>
      {/* Header */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Issues assigned to you for action
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="assigned-to-me" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Assigned to Me</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['assigned-to-me']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="department" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>My Department</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['department']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="awaiting-response" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Awaiting Response</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['awaiting-response']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reopened" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Reopened</span>
            <Badge variant={tabCounts['reopened'] > 0 ? 'destructive' : 'secondary'} className="mt-1">
              {tabCounts['reopened']}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="closed-by-me" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Closed by Me</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['closed-by-me']}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab}>
          <IssueTable 
            issues={getCurrentTabIssues()} 
            onViewIssue={setSelectedIssue}
            showAssignedTo={activeTab === 'department'}
          />
        </TabsContent>
      </Tabs>

      {/* Issue Detail Dialog */}
      <IssueDetailDialog 
        issue={selectedIssue} 
        onClose={() => setSelectedIssue(null)} 
      />
    </ResolverLayout>
  );
}

interface IssueTableProps {
  issues: ResolverIssue[];
  onViewIssue: (issue: ResolverIssue) => void;
  showAssignedTo?: boolean;
}

function IssueTable({ issues, onViewIssue, showAssignedTo }: IssueTableProps) {
  if (issues.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No issues in this category.</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Issue ID <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Age <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">SLA</th>
                {showAssignedTo && (
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Assigned To</th>
                )}
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => {
                const sla = getSlaCountdown(issue.slaHoursRemaining);
                return (
                  <tr
                    key={issue.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                      issue.isReopened ? 'bg-orange-50 dark:bg-orange-950/20' : ''
                    }`}
                    role="row"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                        {issue.hasImages && <Image className="w-3 h-3 text-muted-foreground" />}
                        {issue.hasVoiceNote && <Mic className="w-3 h-3 text-muted-foreground" />}
                        {issue.isReopened && <RotateCcw className="w-3 h-3 text-orange-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-foreground">{issue.category}</span>
                        <Badge className={DEPARTMENT_COLORS[issue.department] || 'bg-muted'} variant="secondary">
                          {issue.department}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      <div className="flex flex-col">
                        <span>{issue.ward}</span>
                        <span className="text-xs">{issue.zone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {getIssueAge(issue.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1 text-sm ${
                        sla.isOverdue ? 'text-destructive font-semibold' : 
                        sla.isUrgent ? 'text-warning font-medium' : 'text-muted-foreground'
                      }`}>
                        {(sla.isOverdue || sla.isUrgent) && <AlertTriangle className="w-3 h-3" />}
                        <Clock className="w-3 h-3" />
                        {sla.text}
                      </div>
                    </td>
                    {showAssignedTo && (
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {issue.assignedTo ? 'Officer Assigned' : 'Unassigned'}
                      </td>
                    )}
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => onViewIssue(issue)}
                      >
                        <Eye className="w-4 h-4" />
                        Open Issue
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface IssueDetailDialogProps {
  issue: ResolverIssue | null;
  onClose: () => void;
}

function IssueDetailDialog({ issue, onClose }: IssueDetailDialogProps) {
  if (!issue) return null;
  
  const sla = getSlaCountdown(issue.slaHoursRemaining);

  return (
    <Dialog open={!!issue} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="font-mono text-primary">{issue.id}</span>
            {issue.isReopened && (
              <Badge variant="destructive" className="gap-1">
                <RotateCcw className="w-3 h-3" />
                Reopened ({issue.reopenCount}x)
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Citizen's Report */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Citizen Report</h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="font-medium text-foreground">{issue.citizenTitle}</p>
              <p className="text-sm text-muted-foreground">{issue.description}</p>
              <div className="flex items-center gap-4 pt-2">
                {issue.hasImages && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Image className="w-4 h-4" />
                    View Photos
                  </Button>
                )}
                {issue.hasVoiceNote && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Mic className="w-4 h-4" />
                    Play Voice Note
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Location</h4>
              <p className="text-foreground">{issue.ward}, {issue.zone}</p>
              <p className="text-sm text-muted-foreground">{issue.subCounty}</p>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Department</h4>
              <Badge className={DEPARTMENT_COLORS[issue.department]} variant="secondary">
                {issue.department}
              </Badge>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Status</h4>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                {issue.status}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Priority</h4>
              {getPriorityBadge(issue.priority)}
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">SLA Deadline</h4>
              <div className={`flex items-center gap-1 ${
                sla.isOverdue ? 'text-destructive font-semibold' : 
                sla.isUrgent ? 'text-warning' : 'text-foreground'
              }`}>
                {(sla.isOverdue || sla.isUrgent) && <AlertTriangle className="w-4 h-4" />}
                {sla.text}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Submitted</h4>
              <p className="text-foreground">{issue.createdOn}</p>
              <p className="text-sm text-muted-foreground">{getIssueAge(issue.createdAt)} ago</p>
            </div>
          </div>

          {/* Citizen Info */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Citizen</h4>
            <p className="text-foreground">{issue.citizenName}</p>
            {issue.citizenPhone && (
              <p className="text-sm text-muted-foreground">{issue.citizenPhone}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <Button className="flex-1">Update Status</Button>
            <Button variant="outline" className="flex-1">Add Notes</Button>
            <Button variant="outline">Reassign</Button>
            <Button variant="outline">Escalate</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
