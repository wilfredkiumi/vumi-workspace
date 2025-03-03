// AWS Imports
// AWS imports
import { API } from '@aws-amplify/api';
// For type checking only

// For type checking only

// Mock DynamoDB for type checking
const DynamoDB = {
  query: () => {},
  put: () => {},
  update: () => {},
  delete: () => {}
};
import { AWS_CONFIG } from '../../config/aws-config';


const TableName = AWS_CONFIG.TABLES.WORKSPACE_CREATORS;

export const creatorService = {
  async createCreator(creator: Partial<any>) {
    const params = {
      TableName,
      Item: {
        ...creator,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    await DynamoDB.put(params as any);
    return params.Item;
  },

  async getCreatorById(id: string) {
    const params = {
      TableName,
      Key: { id }
    };

    const result = await DynamoDB.get(params as any);
    return result.Item;
  },

  async getCreatorByUserId(userId: string) {
    const params = {
      TableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    const result = await DynamoDB.query(params as any);
    return result.Items?.[0];
  },

  async listCreators(filters?: Record<string, any>) {
    const params: any = {
      TableName
    };

    if (filters) {
      // Add filter expressions based on the provided filters
      const filterExpressions: string[] = [];
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

    const result = await DynamoDB.scan(params as any);
    return result.Items || [];
  },

  async updateCreator(id: string, updates: Partial<any>) {
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

    const result = await DynamoDB.update(params as any);
    return result.Attributes;
  }
};