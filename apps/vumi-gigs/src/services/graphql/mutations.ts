// This file contains GraphQL mutations that will be used to modify data in the backend
// These are placeholder mutations that should be replaced with your actual GraphQL schema

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createGig = /* GraphQL */ `
  mutation CreateGig(
    $input: CreateGigInput!
    $condition: ModelGigConditionInput
  ) {
    createGig(input: $input, condition: $condition) {
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

export const updateGig = /* GraphQL */ `
  mutation UpdateGig(
    $input: UpdateGigInput!
    $condition: ModelGigConditionInput
  ) {
    updateGig(input: $input, condition: $condition) {
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

export const deleteGig = /* GraphQL */ `
  mutation DeleteGig(
    $input: DeleteGigInput!
    $condition: ModelGigConditionInput
  ) {
    deleteGig(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createCreator = /* GraphQL */ `
  mutation CreateCreator(
    $input: CreateCreatorInput!
    $condition: ModelCreatorConditionInput
  ) {
    createCreator(input: $input, condition: $condition) {
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

export const updateCreator = /* GraphQL */ `
  mutation UpdateCreator(
    $input: UpdateCreatorInput!
    $condition: ModelCreatorConditionInput
  ) {
    updateCreator(input: $input, condition: $condition) {
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

export const createApplication = /* GraphQL */ `
  mutation CreateApplication(
    $input: CreateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    createApplication(input: $input, condition: $condition) {
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

export const updateApplication = /* GraphQL */ `
  mutation UpdateApplication(
    $input: UpdateApplicationInput!
    $condition: ModelApplicationConditionInput
  ) {
    updateApplication(input: $input, condition: $condition) {
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