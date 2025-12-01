import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, MessageSquare, Info, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Report', href: '/', icon: MapPin, description: 'Share what is happening' },
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
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-medium">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight">
                  Wardwise Whispers
                </h1>
                <p className="text-xs md:text-sm opacity-90">Naivasha</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                      'hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground',
                      isActive && 'bg-primary-foreground/20'
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
              className="md:hidden flex items-center justify-center w-tap h-tap rounded-lg hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground"
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
            className="md:hidden bg-primary border-t border-primary-foreground/20 animate-slide-up"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                      'hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground',
                      isActive && 'bg-primary-foreground/20'
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
      <footer className="bg-muted border-t border-border py-6">
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">
            Wardwise Whispers &mdash; For the people of Naivasha
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Report problems, share ideas, celebrate successes
          </p>
        </div>
      </footer>
    </div>
  );
}
