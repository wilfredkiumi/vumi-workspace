import { DynamoDB } from '@aws-amplify/api';
import { AWS_CONFIG } from '../../config/aws-config';

const TableName = AWS_CONFIG.TABLES.SHOWCASE_EVENTS;

export const showcaseService = {
  async createShowcase(showcase: Partial<Showcase>) {
    const params = {
      TableName,
      Item: {
        ...showcase,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    await DynamoDB.put(params);
    return params.Item;
  },

  async getShowcaseById(id: string) {
    const params = {
      TableName,
      Key: { id }
    };

    const result = await DynamoDB.get(params);
    return result.Item;
  },

  async listShowcases(filters?: Record<string, any>) {
    const params: any = {
      TableName
    };

    if (filters) {
      const filterExpressions = [];
      const expressionAttributeValues: Record<string, any> = {};
      const expressionAttributeNames: Record<string, string> = {};

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          filterExpressions.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      });

      if (filterExpressions.length > 0) {
        params.FilterExpression = filterExpressions.join(' AND ');
        params.ExpressionAttributeNames = expressionAttributeNames;
        params.ExpressionAttributeValues = expressionAttributeValues;
      }
    }

    const result = await DynamoDB.scan(params);
    return result.Items || [];
  },

  async updateShowcase(id: string, updates: Partial<Showcase>) {
    const updateExpression = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        updateExpression.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAttributeValues[`:${key}`] = value;
      }
    });

    expressionAttributeValues[':updatedAt'] = new Date().toISOString();
    updateExpression.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';

    const params = {
      TableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await DynamoDB.update(params);
    return result.Attributes;
  }
};