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


const TableName = AWS_CONFIG.TABLES.WORKSPACE_USERS;

export const userService = {
  async createUser(user: Partial<any>) {
    const params = {
      TableName,
      Item: {
        id: user.id,
        authId: user.authId,
        username: user.username,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        bio: user.bio,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    await DynamoDB.put(params as any);
    return params.Item;
  },

  async getUserById(id: string) {
    const params = {
      TableName,
      Key: { id }
    };

    const result = await DynamoDB.get(params as any);
    return result.Item;
  },

  async getUserByAuthId(authId: string) {
    const params = {
      TableName,
      IndexName: 'authId-index',
      KeyConditionExpression: 'authId = :authId',
      ExpressionAttributeValues: {
        ':authId': authId
      }
    };

    const result = await DynamoDB.query(params as any);
    return result.Items?.[0];
  },

  async updateUser(id: string, updates: Partial<any>) {
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