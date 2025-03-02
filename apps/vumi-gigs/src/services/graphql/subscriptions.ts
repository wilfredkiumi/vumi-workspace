// This file contains GraphQL subscriptions that will be used to receive real-time updates
// These are placeholder subscriptions that should be replaced with your actual GraphQL schema

export const onCreateGig = /* GraphQL */ `
  subscription OnCreateGig {
    onCreateGig {
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

export const onUpdateGig = /* GraphQL */ `
  subscription OnUpdateGig {
    onUpdateGig {
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

export const onDeleteGig = /* GraphQL */ `
  subscription OnDeleteGig {
    onDeleteGig {
      id
    }
  }
`;

export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication($gigId: ID) {
    onCreateApplication(gigId: $gigId) {
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

export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication($id: ID) {
    onUpdateApplication(id: $id) {
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