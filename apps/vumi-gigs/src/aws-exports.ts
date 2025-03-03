// AWS Amplify configuration for the Vumi Platform
// Replace these values with your actual AWS Amplify configuration
const awsconfig = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "YOUR_IDENTITY_POOL_ID",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "YOUR_USER_POOL_ID",
  "aws_user_pools_web_client_id": "YOUR_USER_POOL_WEB_CLIENT_ID",
  "oauth": {},
  "aws_appsync_graphqlEndpoint": "YOUR_GRAPHQL_ENDPOINT",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS"
};

export default awsconfig;