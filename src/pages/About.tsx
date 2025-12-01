import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MapPin, Mic, Users, MessageSquare, Phone, Mail } from 'lucide-react';

const About = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Hero */}
        <section aria-labelledby="about-title">
          <h1 id="about-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Wardwise Whispers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Wardwise Whispers is a simple way for everyone in Naivasha to share what is happening 
            in their neighborhood. Whether you see a problem, have an idea, or want to thank someone — 
            your voice matters.
          </p>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-2xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="story-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                1. Mark the Location
              </h3>
              <p className="text-muted-foreground">
                Tap on the map to show where something is happening. 
                You can also describe the location in words if the map is hard to use.
              </p>
            </div>

            <div className="story-card">
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-secondary-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                2. Tell Your Story
              </h3>
              <p className="text-muted-foreground">
                Type or record a voice message. Say what is happening, why it matters, 
                and any details that might help.
              </p>
            </div>

            <div className="story-card">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-success" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                3. Share with Everyone
              </h3>
              <p className="text-muted-foreground">
                Your story joins others from across Naivasha. 
                The community can see what is happening and work together on solutions.
              </p>
            </div>

            <div className="story-card">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                4. Get Updates
              </h3>
              <p className="text-muted-foreground">
                If you share your contact info, we can let you know when there is progress 
                on your report.
              </p>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section aria-labelledby="accessibility">
          <h2 id="accessibility" className="text-2xl font-bold text-foreground mb-4">
            Made for Everyone
          </h2>
          <div className="story-card bg-primary/5">
            <p className="text-foreground leading-relaxed mb-4">
              This app is designed to be easy to use for everyone, including:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                People who prefer to speak rather than type
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Elders and those who find small text hard to read
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                People using screen readers or other assistive technology
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Anyone with a basic smartphone
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact">
          <h2 id="contact" className="text-2xl font-bold text-foreground mb-4">
            Need Help?
          </h2>
          <div className="story-card">
            <p className="text-muted-foreground mb-4">
              If you have questions or need help using this app, you can reach us:
            </p>
            <div className="space-y-3">
              <a 
                href="tel:+254700000000" 
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span>+254 700 000 000</span>
              </a>
              <a 
                href="mailto:help@wardwise.ke" 
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>help@wardwise.ke</span>
              </a>
            </div>
          </div>
        </section>

        {/* Language note */}
        <section className="bg-muted rounded-xl p-6">
          <p className="text-muted-foreground text-center">
            <strong className="text-foreground">Coming soon:</strong> Kiswahili translation 
            and more local languages.
          </p>
        </section>
      </div>
    </AppLayout>
  );
};

export default About;
