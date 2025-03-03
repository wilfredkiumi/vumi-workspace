import { DynamoDB } from '@aws-amplify/api';
import { AWS_CONFIG } from '../../config/aws-config';

const TableName = AWS_CONFIG.TABLES.EVENT_TICKETS;

export const ticketService = {
  async createTicket(ticket: Partial<EventTicket>) {
    const params = {
      TableName,
      Item: {
        ...ticket,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };

    await DynamoDB.put(params);
    return params.Item;
  },

  async getTicketById(id: string) {
    const params = {
      TableName,
      Key: { id }
    };

    const result = await DynamoDB.get(params);
    return result.Item;
  },

  async listTicketsByEvent(eventId: string) {
    const params = {
      TableName,
      IndexName: 'eventId-index',
      KeyConditionExpression: 'eventId = :eventId',
      ExpressionAttributeValues: {
        ':eventId': eventId
      }
    };

    const result = await DynamoDB.query(params);
    return result.Items || [];
  },

  async listTicketsByUser(userId: string) {
    const params = {
      TableName,
      IndexName: 'userId-index',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    const result = await DynamoDB.query(params);
    return result.Items || [];
  },

  async updateTicket(id: string, updates: Partial<EventTicket>) {
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