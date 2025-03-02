// This file contains GraphQL queries that will be used to fetch data from the backend
// These are placeholder queries that should be replaced with your actual GraphQL schema

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      name
      profileImage
      bio
      createdAt
      updatedAt
    }
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        name
        profileImage
        bio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getGig = /* GraphQL */ `
  query GetGig($id: ID!) {
    getGig(id: $id) {
      id
      title
      description
      category
      subcategory
      budget {
        min
        max
        type
      }
      duration
      skills
      location {
        type
        city
        country
      }
      postedBy {
        id
        name
        avatar
        rating
        verified
      }
      postedDate
      deadline
      applicants
      status
      featured
    }
  }
`;

export const listGigs = /* GraphQL */ `
  query ListGigs(
    $filter: ModelGigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGigs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        category
        subcategory
        budget {
          min
          max
          type
        }
        duration
        skills
        location {
          type
          city
          country
        }
        postedBy {
          id
          name
          avatar
          rating
          verified
        }
        postedDate
        deadline
        applicants
        status
        featured
      }
      nextToken
    }
  }
`;

export const getCreator = /* GraphQL */ `
  query GetCreator($id: ID!) {
    getCreator(id: $id) {
      id
      userId
      name
      username
      bio
      profileImage
      coverImage
      location {
        city
        country
      }
      categories
      skills
      experience {
        role
        company
        startDate
        endDate
        description
      }
      portfolio {
        title
        description
        thumbnailUrl
        projectUrl
      }
      socialLinks {
        platform
        url
        followers
      }
      metrics {
        rating
        responseRate
        completedProjects
        reviewCount
      }
      verified
      featured
      creatorType
      isAvailableForHire
      freelanceStatus
      fulltimeStatus
    }
  }
`;

export const listCreators = /* GraphQL */ `
  query ListCreators(
    $filter: ModelCreatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        name
        username
        bio
        profileImage
        coverImage
        location {
          city
          country
        }
        categories
        skills
        metrics {
          rating
          responseRate
          completedProjects
          reviewCount
        }
        verified
        featured
        creatorType
        isAvailableForHire
      }
      nextToken
    }
  }
`;

export const getApplication = /* GraphQL */ `
  query GetApplication($id: ID!) {
    getApplication(id: $id) {
      id
      gigId
      userId
      coverLetter
      rate
      attachments
      status
      createdAt
      updatedAt
    }
  }
`;

export const listApplications = /* GraphQL */ `
  query ListApplications(
    $filter: ModelApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gigId
        userId
        coverLetter
        rate
        attachments
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;