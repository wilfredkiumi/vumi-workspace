import { StudioProfilePage as StudioProfile } from 'ui';

interface StudioProfilePageProps {
  studioId: string;
  onBack?: () => void;
}

function StudioProfilePage({ studioId, onBack }: StudioProfilePageProps) {
  return <StudioProfile studioId={studioId} onBack={onBack} />;
}

export default StudioProfilePage;