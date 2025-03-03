import { Studio } from '../../types';
import { Card } from '../../index';

interface StudioTeamProps {
  colorMode?: string;
  theme?: string;
  studio: Studio;
  onMemberClick?: (memberId: string) => void;
}

export function StudioTeam({ 
  
  
  studio,
  onMemberClick
, theme = "gigs", colorMode = "light" }: StudioTeamProps) {
  const handleMemberClick = (memberId: string) => {
    if (onMemberClick) {
      onMemberClick(memberId);
    }
  };

  return (
    <Card theme={theme} colorMode={colorMode}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studio.teamMembers.map((member) => (
          <div 
            key={member.id}
            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={() => handleMemberClick(member.id)}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              {member.profileImage ? (
                <img 
                  src={member.profileImage} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-lg font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {member.role}
              </p>
              {member.creatorId && (
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  View Creator Profile
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}