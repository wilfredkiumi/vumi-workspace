import { Amplify } from '@aws-amplify/core';
import awsconfig from '../aws-exports';

// Configure Amplify
export const configureAmplify = () => {
  Amplify.configure(awsconfig);
};