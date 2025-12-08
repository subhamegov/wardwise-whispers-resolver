import React, { useState, useEffect } from 'react';
import { Search, Ticket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketDetails } from '@/components/tickets/TicketDetails';
import { Story, STATUS_LABELS, TicketStatus } from '@/types/story';
import { apiClient } from '@/lib/apiClient';
import { cn } from '@/lib/utils';

const MyTickets = () => {
  const [tickets, setTickets] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Story | null>(null);
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getMyTickets();
      setTickets(data);
    } catch (err) {
      console.error('Error loading tickets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketUpdate = (updated: Story) => {
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSelectedTicket(updated);
  };

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = !searchQuery || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AppLayout>
      {/* Hero */}
      <section className="mb-8" aria-labelledby="tickets-hero-title">
        <div className="ncc-hero ncc-hero-pattern p-8 md:p-10">
          <div className="max-w-2xl">
            <h1 id="tickets-hero-title" className="text-3xl md:text-4xl font-bold mb-3">
              My Tickets
            </h1>
            <p className="text-lg text-white/90">
              Track the status of your reports and communicate with county staff.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or ticket ID..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all',
              filterStatus === 'all'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            All
          </button>
          {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all',
                filterStatus === status
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {STATUS_LABELS[status].label}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="ncc-card text-center py-16 px-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No tickets found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'You haven\'t submitted any reports yet. Start by reporting an issue in your area.'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Link to="/report" className="ncc-btn-primary">
              Report an Issue
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onViewDetails={setSelectedTicket}
            />
          ))}
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleTicketUpdate}
        />
      )}
    </AppLayout>
  );
};

export default MyTickets;
