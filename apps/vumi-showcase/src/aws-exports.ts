// AWS Amplify configuration for the Vumi Platform
const awsmobile = {
  "aws_project_region": import.meta.env.VITE_AWS_REGION || "us-east-1",
  "aws_cognito_identity_pool_id": import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
  "aws_cognito_region": import.meta.env.VITE_COGNITO_REGION || "us-east-1",
  "aws_user_pools_id": import.meta.env.VITE_USER_POOL_ID,
  "aws_user_pools_web_client_id": import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
  "oauth": {},
  "aws_appsync_graphqlEndpoint": import.meta.env.VITE_APPSYNC_URL || "https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/",
  "aws_appsync_region": import.meta.env.VITE_AWS_REGION || "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "API": {
    "endpoints": [
      {
        "name": "WorkspaceAPI",
        "endpoint": import.meta.env.VITE_API_ENDPOINT || "https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/",
        "region": import.meta.env.VITE_AWS_REGION || "us-east-1"
      }
    ]
  }
};

export default awsmobile;