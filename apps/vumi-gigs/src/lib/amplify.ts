import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

// Configure Amplify
export const configureAmplify = () => {
  Amplify.configure(awsconfig);
};