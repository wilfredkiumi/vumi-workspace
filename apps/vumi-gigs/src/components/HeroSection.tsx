// @ts-nocheck
import { Button, THEMES } from 'ui';

interface HeroSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
  onFindGigs: () => void;
  onPostGig: () => void;
}

export function HeroSection({ theme, onFindGigs, onPostGig }: HeroSectionProps) {
  return (
    <section className="relative pt-24 pb-16 min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${THEMES.gigs.background} opacity-90 dark:opacity-95`}></div>
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          alt="Freelancers collaborating" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find the Perfect Freelance Gig or Talent
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 mx-auto">
          Connect with top freelancers and clients worldwide. VumiGigs makes it easy to find work or hire exceptional talent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            theme={theme} 
            variant="secondary" 
            colorMode={colorMode}
            className="text-lg py-3 px-8"
            onClick={onFindGigs}
          >
            Find Gigs
          </Button>
          <Button 
            theme={theme} 
            variant="primary" 
            colorMode={colorMode}
            className="text-lg py-3 px-8"
            onClick={onPostGig}
          >
            Post a Gig
          </Button>
        </div>
      </div>
    </section>
  );
}