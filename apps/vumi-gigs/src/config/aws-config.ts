// AWS Configuration for the Vumi Platform
export const AWS_CONFIG = {
  // API Endpoints
  API_ENDPOINT: 'https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/',
  
  // DynamoDB Table Names
  TABLES: {
    WORKSPACE_USERS: 'VumiStackVumiWorkspaceStackF4E9AA7D-WorkspaceUsers7A136FDD-NZ5JDIP25AVZ',
    WORKSPACE_CREATORS: 'VumiStackVumiWorkspaceStackF4E9AA7D-WorkspaceCreators4F52D6D5-HMW0SMVREE3W',
    SHOWCASE_EVENTS: 'VumiStackVumiWorkspaceStackF4E9AA7D-ShowcaseEventsFD6A7450-1KK0XXO6M59HE',
    EVENT_TICKETS: 'VumiStackVumiWorkspaceStackF4E9AA7D-EventTicketsAEB08A8B-1EKURO32J3GQR'
  },
  
  // AWS Region
  REGION: 'us-east-1'
};