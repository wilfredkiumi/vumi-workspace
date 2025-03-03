import React from 'react';
import { StudiosListingPage as StudiosListing } from 'ui';

interface StudiosListingPageProps {
  onStudioSelect?: (studioId: string) => void;
}

function StudiosListingPage({ onStudioSelect }: StudiosListingPageProps) {
  return <StudiosListing onStudioSelect={onStudioSelect} />;
}

export default StudiosListingPage;