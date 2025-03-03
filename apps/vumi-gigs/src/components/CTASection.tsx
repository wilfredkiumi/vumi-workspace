import { Button, THEMES } from 'ui';

interface CTASectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
  onFindGigs: () => void;
  onPostGig: () => void;
}

export function CTASection({ theme, onFindGigs, onPostGig }: CTASectionProps) {
  return (
    <section className="relative py-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Freelance work" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Start Your Freelance Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of freelancers and businesses already using VumiGigs to connect, collaborate, and create.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            className="text-lg py-3 px-6"
            onClick={onFindGigs}
          >
            Find Gigs
          </Button>
          <Button 
            theme={theme} 
            variant="primary" 
            colorMode={colorMode}
            className="text-lg py-3 px-6"
            onClick={onPostGig}
          >
            Post a Gig
          </Button>
        </div>
      </div>
    </section>
  );
}