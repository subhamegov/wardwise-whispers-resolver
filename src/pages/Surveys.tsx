import { AppLayout } from '@/components/layout/AppLayout';
import { ActiveSurveys } from '@/components/surveys/ActiveSurveys';
import { PolicyFeedbackSection } from '@/components/policy/PolicyFeedbackSection';
import { Separator } from '@/components/ui/separator';

const Surveys = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Active Surveys */}
        <section>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-2">
              Active Surveys
            </h1>
            <p className="text-muted-foreground text-lg">
              Help shape county priorities by participating in ongoing surveys. Your feedback directly influences infrastructure planning and service delivery.
            </p>
          </header>
          <ActiveSurveys />
        </section>

        <Separator className="my-8" />

        {/* Policy Feedback */}
        <PolicyFeedbackSection />
      </div>
    </AppLayout>
  );
};

export default Surveys;
