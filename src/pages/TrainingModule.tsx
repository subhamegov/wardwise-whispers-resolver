import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Search,
  ArrowLeft,
  Volume2,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Download,
  FileText,
  Video,
  HelpCircle,
} from 'lucide-react';
import {
  mockTrainingModules,
  getModuleProgress,
  markFaqViewed,
  markVideoWatched,
  markDownloadClicked,
  markModuleCompleted,
  type TrainingModule,
  type ModuleProgress,
  type ModuleStatus,
} from '@/lib/trainingData';
import { toast } from '@/hooks/use-toast';

const statusLabels: Record<ModuleStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Completed',
};

export default function TrainingModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState<ModuleProgress>({
    status: 'not_started',
    faqsViewed: [],
    videosWatched: [],
    downloadsClicked: [],
  });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const module = mockTrainingModules.find((m) => m.id === moduleId);

  useEffect(() => {
    if (moduleId) {
      setProgress(getModuleProgress(moduleId));
    }
  }, [moduleId]);

  // Group FAQs by category
  const faqsByCategory = useMemo(() => {
    if (!module) return {};
    const grouped: Record<string, typeof module.faqs> = {};
    module.faqs.forEach((faq) => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [module]);

  // Filter FAQs by search
  const filteredFaqsByCategory = useMemo(() => {
    if (!searchQuery) return faqsByCategory;
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, TrainingModule['faqs']> = {};

    Object.entries(faqsByCategory).forEach(([category, faqs]) => {
      const matchingFaqs = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
      if (matchingFaqs.length > 0) {
        filtered[category] = matchingFaqs;
      }
    });

    return filtered;
  }, [faqsByCategory, searchQuery]);

  // Filter videos by search
  const filteredVideos = useMemo(() => {
    if (!module) return [];
    if (!searchQuery) return module.videos;
    const query = searchQuery.toLowerCase();
    return module.videos.filter((video) => video.title.toLowerCase().includes(query));
  }, [module, searchQuery]);

  // Filter downloads by search
  const filteredDownloads = useMemo(() => {
    if (!module) return [];
    if (!searchQuery) return module.downloads;
    const query = searchQuery.toLowerCase();
    return module.downloads.filter((dl) => dl.name.toLowerCase().includes(query));
  }, [module, searchQuery]);

  if (!module) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <HelpCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Module Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The training module you're looking for doesn't exist.
          </p>
          <Link to="/training">
            <Button>Back to Training Centre</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const handleFaqExpand = (faqId: string) => {
    if (moduleId) {
      const updated = markFaqViewed(moduleId, faqId);
      setProgress(updated);
    }
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    if (moduleId) {
      const updated = markVideoWatched(moduleId, videoId);
      setProgress(updated);
    }
  };

  const handleDownloadClick = (downloadId: string) => {
    if (moduleId) {
      const updated = markDownloadClicked(moduleId, downloadId);
      setProgress(updated);
    }
    toast({
      title: 'Download started',
      description: 'Your file will download shortly.',
    });
  };

  const handleMarkComplete = () => {
    if (moduleId) {
      const updated = markModuleCompleted(moduleId);
      setProgress(updated);
      toast({
        title: 'Module completed!',
        description: 'Great job completing this training module.',
      });
    }
  };

  // Calculate progress
  const totalItems = module.faqs.length + module.videos.length + module.downloads.length;
  const completedItems =
    progress.faqsViewed.length + progress.videosWatched.length + progress.downloadsClicked.length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back link */}
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Training Centre
        </Link>

        {/* Header */}
        <header className="ncc-card p-6 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                {module.title}
              </h1>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-2" disabled>
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {module.audience.map((aud) => (
              <Badge key={aud} variant="secondary">
                <Users className="w-3 h-3 mr-1" />
                {aud}
              </Badge>
            ))}
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {module.durationMinutes} mins
            </span>
            <Badge
              variant={progress.status === 'completed' ? 'default' : 'outline'}
              className={
                progress.status === 'completed'
                  ? 'bg-success text-success-foreground'
                  : progress.status === 'in_progress'
                  ? 'border-secondary text-secondary-foreground'
                  : ''
              }
            >
              {statusLabels[progress.status]}
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progressPercent}% ({completedItems}/{totalItems} items)</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        {/* Search within module */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search this training..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search within module"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="faqs" className="space-y-4">
          <TabsList className="w-full justify-start" aria-label="Module content tabs">
            <TabsTrigger value="faqs" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQs ({module.faqs.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="w-4 h-4" />
              Videos ({module.videos.length})
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <FileText className="w-4 h-4" />
              Downloads ({module.downloads.length})
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            {Object.keys(filteredFaqsByCategory).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No FAQs match your search.
              </p>
            ) : (
              Object.entries(filteredFaqsByCategory).map(([category, faqs]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                  <Accordion type="multiple" className="space-y-2">
                    {faqs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="ncc-card px-4 border-0"
                      >
                        <AccordionTrigger
                          className="hover:no-underline py-4"
                          onClick={() => handleFaqExpand(faq.id)}
                        >
                          <div className="flex items-center gap-2 text-left">
                            {progress.faqsViewed.includes(faq.id) && (
                              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                            )}
                            <span>{faq.question}</span>
                            {faq.isNew && (
                              <Badge variant="default" className="bg-primary text-xs">
                                New
                              </Badge>
                            )}
                            {faq.isUpdated && (
                              <Badge variant="secondary" className="text-xs">
                                Updated
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            {filteredVideos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No videos match your search.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoClick(video.id)}
                    className="ncc-card p-4 text-left hover:shadow-md transition-shadow group"
                  >
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                      <Play className="w-12 h-12 text-primary relative z-10" />
                      {progress.videosWatched.includes(video.id) && (
                        <div className="absolute top-2 right-2 z-10">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground mb-1">{video.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {video.duration}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads">
            {filteredDownloads.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No downloads match your search.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredDownloads.map((dl) => (
                  <div
                    key={dl.id}
                    className="ncc-card p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          {dl.name}
                          {progress.downloadsClicked.includes(dl.id) && (
                            <CheckCircle2 className="w-4 h-4 text-success" />
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {dl.type} • {dl.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleDownloadClick(dl.id)}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Mark as completed */}
        {progress.status !== 'completed' && (
          <div className="ncc-card p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Finished reviewing this module? Mark it as completed.
            </p>
            <Button onClick={handleMarkComplete} className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Mark as Completed
            </Button>
          </div>
        )}

        {progress.status === 'completed' && (
          <div className="ncc-card p-6 text-center bg-success/10 border-success">
            <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="font-medium text-success">
              You've completed this training module!
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {module.videos.find((v) => v.id === selectedVideo)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Play className="w-16 h-16 mx-auto mb-2" />
              <p>Video player placeholder</p>
              <p className="text-sm">
                Duration: {module.videos.find((v) => v.id === selectedVideo)?.duration}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
