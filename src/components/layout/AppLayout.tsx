import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageSquare, Info, Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home, description: 'Discover what is happening' },
  { name: 'Report', href: '/report', icon: MapPin, description: 'Share your story' },
  { name: 'Stories', href: '/stories', icon: MessageSquare, description: 'See community stories' },
  { name: 'About', href: '/about', icon: Info, description: 'Learn about this app' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-accent text-accent-foreground shadow-medium border-b-4 border-secondary">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo / Title - Official Government Style */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center border-2 border-primary-foreground/20">
                <MapPin className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight text-accent-foreground">
                  Wardwise Whispers
                </h1>
                <p className="text-xs md:text-sm text-accent-foreground/80">Naivasha County</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors',
                      'hover:bg-accent-foreground/10 focus-visible:ring-2 focus-visible:ring-accent-foreground',
                      isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )
                  }
                  aria-label={item.description}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-tap h-tap rounded-md hover:bg-accent-foreground/10 focus-visible:ring-2 focus-visible:ring-accent-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden bg-accent border-t border-accent-foreground/20 animate-slide-up"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors',
                      'hover:bg-accent-foreground/10 focus-visible:ring-2 focus-visible:ring-accent-foreground',
                      isActive && 'bg-primary text-primary-foreground'
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item.description}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <span className="block">{item.name}</span>
                    <span className="text-sm opacity-80">{item.description}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="container py-6 md:py-8" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground border-t-4 border-primary py-8">
        <div className="container">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <p className="font-semibold text-lg">
                Wardwise Whispers
              </p>
            </div>
            <p className="text-sm opacity-90">
              Official Citizen Engagement Platform — Naivasha County
            </p>
            <p className="text-xs opacity-75 max-w-2xl mx-auto">
              Report problems, share ideas, celebrate successes. Your voice matters in building our community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
