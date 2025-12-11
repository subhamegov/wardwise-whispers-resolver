import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown, 
  ArrowUpDown, 
  Eye,
  Image,
  Mic,
  RefreshCw,
  Clock,
  AlertTriangle,
  RotateCcw,
  User
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ALL_COUNTY_ISSUES,
  getTop100LatestIssues,
  getIssueAge,
  getSlaCountdown,
  DEPARTMENT_COLORS,
  type ResolverIssue,
} from '@/lib/resolverIssuesData';

const DEPARTMENTS = ['All', 'Environment', 'Water & Sewerage', 'Works', 'Public Health', 'Mobility & ICT'];
const WARDS = ['All', 'Parklands', 'Kilimani', 'Umoja I', 'Kayole North', 'Karen', 'Ngara', 'Pipeline', 'Kawangware', 'Nairobi Central', 'Zimmerman', 'Roysambu', 'Ruaraka', 'Highridge', 'Mugumo-ini'];
const STATUSES = ['All', 'Open', 'Assigned', 'In Progress', 'Awaiting Response', 'Reopened', 'Closed'];
const CATEGORIES = ['All', 'Garbage Collection', 'Illegal Dumping', 'Street Cleaning', 'Pollution', 'Noise Pollution', 'Pothole', 'Water Leak', 'Sewer Blockage', 'Street Light', 'Traffic Light', 'Food Safety', 'Blocked Drain', 'Road Damage', 'Pest Control'];

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

export default function ResolverSearchIssues() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<ResolverIssue | null>(null);

  // Get top 100 latest issues
  const top100Issues = useMemo(() => getTop100LatestIssues(), []);

  // Filter issues
  const filteredIssues = useMemo(() => {
    return top100Issues.filter((issue) => {
      const matchesSearch =
        searchQuery === '' ||
        issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.citizenTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.ward.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = departmentFilter === 'All' || issue.department === departmentFilter;
      const matchesWard = wardFilter === 'All' || issue.ward === wardFilter;
      const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || issue.category === categoryFilter;

      return matchesSearch && matchesDepartment && matchesWard && matchesStatus && matchesCategory;
    });
  }, [top100Issues, searchQuery, departmentFilter, wardFilter, statusFilter, categoryFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('All');
    setWardFilter('All');
    setStatusFilter('All');
    setCategoryFilter('All');
  };

  const hasActiveFilters = searchQuery || departmentFilter !== 'All' || wardFilter !== 'All' || statusFilter !== 'All' || categoryFilter !== 'All';

  return (
    <ResolverLayout>
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Search Issues</h1>
        <p className="text-muted-foreground mt-1">
          Browse the latest reported issues or search across all records.
        </p>
      </section>

      {/* Top 100 Latest Issues Section */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Top 100 Latest Issues
          </h2>
          <span className="text-sm text-muted-foreground">
            Showing {filteredIssues.length} of {top100Issues.length} issues
          </span>
        </div>

        {/* Issues Table */}
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
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Citizen Title</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Department</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ward & Zone</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Age</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Assigned To</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                        !issue.assignedTo ? 'bg-yellow-50/50 dark:bg-yellow-950/10' : ''
                      }`}
                      role="row"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                          {issue.hasImages && <Image className="w-3 h-3 text-muted-foreground" />}
                          {issue.hasVoiceNote && <Mic className="w-3 h-3 text-muted-foreground" />}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground max-w-[200px] truncate">
                        {issue.citizenTitle}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {issue.category}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={DEPARTMENT_COLORS[issue.department] || 'bg-muted'} variant="secondary">
                          {issue.department}
                        </Badge>
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
                        {issue.assignedTo ? (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{issue.assignedDepartment}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="text-warning border-warning">
                            Unassigned
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <Eye className="w-4 h-4" />
                          View Issue
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30">
              <p className="text-sm text-muted-foreground text-center">
                Showing {filteredIssues.length} of 100 most recent issues. Use the search panel below to find specific tickets.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Search Panel */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Search & Filter</h2>
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by issue ID, category, citizen name, phone, ward, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={wardFilter} onValueChange={setWardFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Ward" />
                </SelectTrigger>
                <SelectContent>
                  {WARDS.map((ward) => (
                    <SelectItem key={ward} value={ward}>{ward === 'All' ? 'All Wards' : ward}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>{status === 'All' ? 'All Statuses' : status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
                <ChevronDown className="w-3 h-3" />
              </Button>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Issue Detail Dialog */}
      <IssueDetailDialog 
        issue={selectedIssue} 
        onClose={() => setSelectedIssue(null)} 
      />
    </ResolverLayout>
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
              <h4 className="text-xs font-medium text-muted-foreground uppercase">Assigned To</h4>
              {issue.assignedTo ? (
                <p className="text-foreground">{issue.assignedDepartment} Team</p>
              ) : (
                <Badge variant="outline" className="text-warning border-warning">
                  Unassigned
                </Badge>
              )}
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
          </div>

          {/* Citizen Info */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Citizen</h4>
            <p className="text-foreground">{issue.citizenName}</p>
            {issue.citizenPhone && (
              <p className="text-sm text-muted-foreground">{issue.citizenPhone}</p>
            )}
          </div>

          {/* Issue Timeline placeholder */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Issue History</h4>
            <div className="text-sm text-muted-foreground bg-muted/30 rounded p-3">
              Timeline of status changes and internal notes would appear here.
            </div>
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
