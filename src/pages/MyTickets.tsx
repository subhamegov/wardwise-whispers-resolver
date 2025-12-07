import React, { useState, useEffect } from 'react';
import { Search, Filter, Ticket } from 'lucide-react';
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
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-2xl p-6 md:p-8">
          <h1 id="tickets-hero-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            My Tickets
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track the status of your reports and communicate with county staff.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or ticket ID..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilterStatus('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              filterStatus === 'all'
                ? 'bg-primary text-primary-foreground'
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
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
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
            <div key={i} className="h-40 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No tickets found</h2>
          <p className="text-muted-foreground">
            {searchQuery || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'You haven\'t submitted any reports yet.'}
          </p>
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
