import { useState, useEffect } from 'react';
import { Creator, ProfileMode } from 'ui';

// Sample creators data - needs to be fully defined here to be accessible
const sampleCreators: Creator[] = [
  {
    id: "1",
    workspaceId: "ws-123",
    name: "Alex Johnson",
    username: "alexjohnson",
    bio: "Lifestyle and tech influencer with a passion for creating engaging content that resonates with young professionals.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "San Francisco",
      country: "USA"
    },
    categories: ["Technology", "Lifestyle"],
    skills: ["Content Creation", "Video Editing", "Photography", "Social Media Marketing"],
    experience: [
      {
        role: "Tech Influencer",
        company: "Self-employed",
        startDate: "Jan 2020",
        description: "Created tech review content across multiple platforms."
      }
    ],
    portfolio: [
      {
        title: "Smartphone Review Series",
        description: "In-depth video reviews of the latest smartphone releases.",
        thumbnailUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "youtube",
        url: "https://youtube.com/alexjohnson",
        followers: 350000
      }
    ],
    metrics: {
      rating: 4.9,
      responseRate: 98,
      completedProjects: 47,
      reviewCount: 38
    },
    verified: true,
    featured: true,
    creatorType: "influencer",
    audienceSize: 650000,
    platforms: ["YouTube", "Instagram", "TikTok"],
    contentTypes: ["Video", "Photo"],
    mode: ProfileMode.PRO,
    isAvailableForHire: true,
    freelanceStatus: true,
    createdAt: "2020-01-15T00:00:00Z" // Adding createdAt field
  },
  {
    id: "2",
    workspaceId: "ws-456",
    name: "Vision Studios",
    username: "visionstudios",
    bio: "Professional video production crew specializing in commercial, documentary, and corporate video content.",
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "Los Angeles",
      country: "USA"
    },
    categories: ["Video Production", "Cinematography"],
    skills: ["Video Production", "Cinematography", "Lighting", "Sound Design"],
    experience: [
      {
        role: "Production Team",
        company: "Major Streaming Service",
        startDate: "Mar 2021",
        description: "Produced documentary-style content for streaming platform."
      }
    ],
    portfolio: [
      {
        title: "Eco-Friendly Brand Campaign",
        description: "Series of commercials highlighting sustainable practices.",
        thumbnailUrl: "https://images.unsplash.com/photo-1626050954744-92bf034ce476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/visionstudios",
        followers: 45000
      }
    ],
    metrics: {
      rating: 4.8,
      responseRate: 95,
      completedProjects: 63,
      reviewCount: 52
    },
    verified: true,
    featured: true,
    creatorType: "crew",
    teamSize: 6,
    equipmentOwned: ["RED Cinema Camera", "Sony FS7"],
    specializations: ["Commercial Production", "Documentary"],
    mode: ProfileMode.PREMIUM,
    isAvailableForHire: true,
    createdAt: "2021-03-10T00:00:00Z" // Adding createdAt field
  },
  {
    id: "3",
    workspaceId: "ws-789",
    name: "Sarah Williams",
    username: "sarahwilliams",
    bio: "Professional photographer specializing in portrait and commercial photography with a unique artistic style.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80",
    location: {
      city: "Chicago",
      country: "USA"
    },
    categories: ["Photography", "Portrait"],
    skills: ["Photography", "Lighting", "Photoshop", "Lightroom"],
    experience: [
      {
        role: "Freelance Photographer",
        company: "Self-employed",
        startDate: "Jan 2018",
        description: "Specialized in portrait and commercial photography for various clients."
      }
    ],
    portfolio: [
      {
        title: "Urban Portrait Series",
        description: "A collection of urban portraits showcasing diverse individuals in city environments.",
        thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        projectUrl: "https://example.com/project1"
      }
    ],
    socialLinks: [
      {
        platform: "instagram",
        url: "https://instagram.com/sarahwilliams",
        followers: 75000
      }
    ],
    metrics: {
      rating: 4.7,
      responseRate: 90,
      completedProjects: 38,
      reviewCount: 32
    },
    verified: true,
    featured: false,
    creatorType: "influencer",
    audienceSize: 90000,
    platforms: ["Instagram", "Behance"],
    contentTypes: ["Photo"],
    mode: ProfileMode.BASIC_WITH_ADS,
    isAvailableForHire: true,
    freelanceStatus: true,
    createdAt: "2018-01-20T00:00:00Z" // Adding createdAt field
  }
];

export function useCreator(creatorId: string | undefined) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!creatorId) {
      setLoading(false);
      return;
    }

    // Simulate API call with timeout
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundCreator = sampleCreators.find(c => c.id === creatorId) || null;
      setCreator(foundCreator);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [creatorId]);

  return { creator, loading };
}

export function usePayment() {
  const initiatePayment = async (paymentDetails: {
    amount: number;
    currency: string;
    description: string;
    metadata: {
      creatorId: string;
      planId: string;
    };
  }) => {
    // Simulate payment processing
    console.log('Processing payment:', paymentDetails);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a success response
    return { success: true, paymentId: 'pay_' + Math.random().toString(36).substr(2, 9) };
  };

  return { initiatePayment };
}
