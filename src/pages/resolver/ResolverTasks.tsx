import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, ChevronDown, ArrowUpDown, Eye } from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';

// Mock data for all issues
const ALL_ISSUES = [
  { id: 'NCC-2025-0487', category: 'Pothole on Waiyaki Way', subCounty: 'Westlands', department: 'Works', status: 'Open', priority: 'High', createdOn: '2025-12-11', citizenName: 'John Kamau' },
  { id: 'NCC-2025-0486', category: 'Burst Sewer Line', subCounty: 'Umoja', department: 'Water & Sewerage', status: 'Assigned', priority: 'Critical', createdOn: '2025-12-11', citizenName: 'Mary Wanjiku' },
  { id: 'NCC-2025-0485', category: 'Noise Pollution', subCounty: 'Kilimani', department: 'Environment', status: 'Closed', priority: 'Medium', createdOn: '2025-12-11', citizenName: 'Peter Omondi' },
  { id: 'NCC-2025-0484', category: 'Power Outage', subCounty: 'Parklands', department: 'Mobility & ICT', status: 'In Progress', priority: 'High', createdOn: '2025-12-11', citizenName: 'Grace Njeri' },
  { id: 'NCC-2025-0483', category: 'Garbage Collection', subCounty: 'Langata', department: 'Environment', status: 'Open', priority: 'Medium', createdOn: '2025-12-10', citizenName: 'James Mwangi' },
  { id: 'NCC-2025-0482', category: 'Street Light Fault', subCounty: 'Dagoretti', department: 'Works', status: 'Assigned', priority: 'Low', createdOn: '2025-12-10', citizenName: 'Alice Achieng' },
  { id: 'NCC-2025-0481', category: 'Water Leak', subCounty: 'Embakasi', department: 'Water & Sewerage', status: 'In Progress', priority: 'High', createdOn: '2025-12-10', citizenName: 'David Kiprop' },
  { id: 'NCC-2025-0480', category: 'Illegal Dumping', subCounty: 'Kasarani', department: 'Environment', status: 'Open', priority: 'Medium', createdOn: '2025-12-09', citizenName: 'Sarah Mutua' },
  { id: 'NCC-2025-0479', category: 'Road Sign Missing', subCounty: 'Starehe', department: 'Works', status: 'Closed', priority: 'Low', createdOn: '2025-12-09', citizenName: 'Michael Otieno' },
  { id: 'NCC-2025-0478', category: 'Blocked Drain', subCounty: 'Roysambu', department: 'Water & Sewerage', status: 'Assigned', priority: 'High', createdOn: '2025-12-08', citizenName: 'Nancy Chebet' },
];

const DEPARTMENTS = ['All', 'Works', 'Water & Sewerage', 'Environment', 'Mobility & ICT', 'Health', 'Planning'];
const SUB_COUNTIES = ['All', 'Westlands', 'Umoja', 'Kilimani', 'Parklands', 'Langata', 'Dagoretti', 'Embakasi', 'Kasarani', 'Starehe', 'Roysambu'];
const STATUSES = ['All', 'Open', 'Assigned', 'In Progress', 'Closed'];
const PRIORITIES = ['All', 'Critical', 'High', 'Medium', 'Low'];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-destructive/15 text-destructive';
    case 'assigned': return 'bg-info/15 text-info';
    case 'in progress': return 'bg-warning/15 text-warning';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [subCountyFilter, setSubCountyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<typeof ALL_ISSUES[0] | null>(null);

  const filteredIssues = useMemo(() => {
    return ALL_ISSUES.filter((issue) => {
      const matchesSearch =
        searchQuery === '' ||
        issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.citizenName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = departmentFilter === 'All' || issue.department === departmentFilter;
      const matchesSubCounty = subCountyFilter === 'All' || issue.subCounty === subCountyFilter;
      const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || issue.priority === priorityFilter;

      return matchesSearch && matchesDepartment && matchesSubCounty && matchesStatus && matchesPriority;
    });
  }, [searchQuery, departmentFilter, subCountyFilter, statusFilter, priorityFilter]);

  return (
    <ResolverLayout>
      {/* Header */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">All Issues</h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage all reported issues across Nairobi County.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="mb-6">
        <Card>
          <CardContent className="p-4">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search for an issue by keyword, ID, or citizen name..."
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

              <Select value={subCountyFilter} onValueChange={setSubCountyFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sub-County" />
                </SelectTrigger>
                <SelectContent>
                  {SUB_COUNTIES.map((sc) => (
                    <SelectItem key={sc} value={sc}>{sc === 'All' ? 'All Sub-Counties' : sc}</SelectItem>
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

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>{priority === 'All' ? 'All Priorities' : priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
                <ChevronDown className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Issues Table */}
      <section>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        Ticket ID <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Sub-County</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Department</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        Created On <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground max-w-[200px] truncate">{issue.category}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{issue.subCounty}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{issue.department}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{getPriorityBadge(issue.priority)}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{issue.createdOn}</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <Eye className="w-4 h-4" />
                          View
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
                Showing {filteredIssues.length} of {ALL_ISSUES.length} issues. Use the search bar to find a specific ticket.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Issue Detail Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono text-primary">{selectedIssue?.id}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                <p className="text-foreground">{selectedIssue.category}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Sub-County</h4>
                  <p className="text-foreground">{selectedIssue.subCounty}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Department</h4>
                  <p className="text-foreground">{selectedIssue.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                  {getPriorityBadge(selectedIssue.priority)}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Citizen</h4>
                <p className="text-foreground">{selectedIssue.citizenName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Created On</h4>
                <p className="text-foreground">{selectedIssue.createdOn}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button className="flex-1">Update Status</Button>
                <Button variant="outline" className="flex-1">Add Notes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ResolverLayout>
  );
}
