# Vumi Gigs Platform

A platform for finding and posting freelance opportunities, built with React, TypeScript, and AWS Amplify.

## Project Structure

This is a monorepo containing two applications:

- **vumi-gigs**: A platform for finding and posting freelance opportunities.
- **vumi-showcase**: A platform for discovering and showcasing creative portfolios.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- AWS Account with Amplify CLI configured

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To run the Vumi Gigs application:

```bash
npm run dev:gigs
```

To run the Vumi Showcase application:

```bash
npm run dev:showcase
```

### TikTok Icon Fix

There's a known issue with the TikTok icon component where it contains JSX syntax in a .js file, causing import errors. To fix this:

```bash
# Run the automated fix script
npm run fix-tiktok-icon
```

This script:
- Replaces JSX syntax with React.createElement in TikTokIcon.js
- Creates appropriate JSX (.jsx) and TypeScript (.tsx) versions of the icon
- Updates imports in relevant files

If you encounter import errors with the TikTok icon after pulling changes, run this script.

### Building for Production

To build the Vumi Gigs application:

```bash
npm run build:gigs
```

To build the Vumi Showcase application:

```bash
npm run build:showcase
```

## AWS Amplify Setup

This project uses AWS Amplify Gen 2 for backend services. The backend services are provisioned via a workspace CDK.

### Connecting to Existing Backend

1. Update the `aws-exports.ts` file in `apps/vumi-gigs/src/` with your AWS Amplify configuration.
2. The application will automatically connect to the backend services when it starts.

### Deploying to AWS Amplify

The project includes configuration files for AWS Amplify deployment:

- `amplify.yml` - Root configuration file for the monorepo
- `apps/vumi-gigs/amplify.yml` - Configuration file for the Vumi Gigs application

To deploy the application:

1. Connect your repository to AWS Amplify
2. Configure the build settings to use the appropriate amplify.yml file
3. Deploy the application

## Backend Services

The application connects to the following backend services:

- **Authentication**: AWS Cognito for user authentication
- **API**: AWS AppSync GraphQL API for data access
- **Storage**: Amazon S3 for file storage

## Features

- User authentication and profile management
- Gig posting and discovery
- Creator profiles and portfolios
- Real-time updates with GraphQL subscriptions
- Secure payment processing

## License

This project is licensed under the MIT License - see the LICENSE file for details.