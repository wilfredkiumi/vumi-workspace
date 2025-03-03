// AWS Amplify configuration for the Vumi Platform
// This file will be replaced by the actual configuration from your Amplify backend

const awsmobile = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "YOUR_IDENTITY_POOL_ID",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "YOUR_USER_POOL_ID",
  "aws_user_pools_web_client_id": "YOUR_USER_POOL_WEB_CLIENT_ID",
  "oauth": {},
  "aws_appsync_graphqlEndpoint": "https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  "API": {
    "endpoints": [
      {
        "name": "WorkspaceAPI",
        "endpoint": "https://uqccevgode.execute-api.us-east-1.amazonaws.com/prod/",
        "region": "us-east-1"
      }
    ]
  }
};

export default awsmobile;