// @ts-nocheck
import { RestApiOptions } from '@aws-amplify/api-rest';

export interface PostOperation extends RestApiOptions {
  variables?: Record<string, unknown>;
}
