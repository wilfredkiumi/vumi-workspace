// AWS Configuration for the Vumi Platform
export const AWS_CONFIG = {
  // API Endpoints
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || 'https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/',
  
  // DynamoDB Table Names
  TABLES: {
    WORKSPACE_USERS: import.meta.env.VITE_WORKSPACE_USERS_TABLE || 'VumiStackVumiWorkspaceStackF4E9AA7D-WorkspaceUsers7A136FDD-NZ5JDIP25AVZ',
    WORKSPACE_CREATORS: import.meta.env.VITE_WORKSPACE_CREATORS_TABLE || 'VumiStackVumiWorkspaceStackF4E9AA7D-WorkspaceCreators4F52D6D5-HMW0SMVREE3W',
    SHOWCASE_EVENTS: import.meta.env.VITE_SHOWCASE_EVENTS_TABLE || 'VumiStackVumiWorkspaceStackF4E9AA7D-ShowcaseEventsFD6A7450-1KK0XXO6M59HE',
    EVENT_TICKETS: import.meta.env.VITE_EVENT_TICKETS_TABLE || 'VumiStackVumiWorkspaceStackF4E9AA7D-EventTicketsAEB08A8B-1EKURO32J3GQR'
  },
  
  // AWS Region
  REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1'
};