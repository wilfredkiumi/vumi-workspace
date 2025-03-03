import React from 'react';
import { useApp } from '../context/AppContext';

function HomePage() {
  const { dispatch } = useApp();

  const handleFindGigs = () => {
    dispatch({ type: 'SET_VIEW', payload: 'gigs' });
  };

  const handlePostGig = () => {
    dispatch({ type: 'SET_VIEW', payload: 'post-gig' });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to VumiGigs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Connect with top creative talent and find exciting opportunities in gaming, animation, and digital media.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleFindGigs}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Find Gigs
          </button>
          <button 
            onClick={handlePostGig}
            className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Post a Gig
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;