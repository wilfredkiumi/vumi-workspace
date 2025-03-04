// @ts-nocheck
import { ProfileMode } from 'ui';
import { Creator, CreatorType, FreelanceStatus, ProfilePlan } from '../models/Creator';

export const sampleCreators: Creator[] = [
  {
    id: "c1",
    workspaceId: "ws-123",
    name: "Alex Johnson",
    username: "alexjohnson",
    tagline: "Senior Game Developer & Technical Artist",
    bio: "Award-winning game developer with 8+ years of experience in AAA and indie games. Specializing in Unity and Unreal Engine development with a strong focus on technical art and optimization.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    socialLinks: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson",
      artstation: "https://artstation.com/alexjohnson"
    },
    creatorType: CreatorType.INDIVIDUAL,
    freelanceStatus: FreelanceStatus.AVAILABLE,
    location: {
      city: "San Francisco",
      country: "USA",
      remote: true,
      timezone: "America/Los_Angeles"
    },
    categories: ["Game Development", "Technical Art", "Programming"],
    primaryCategory: "Game Development",
    skills: ["Unity", "Unreal Engine", "C#", "C++", "HLSL/GLSL", "Technical Art"],
    specializations: ["Game Optimization", "Graphics Programming", "Tool Development"],
    rateRange: {
      min: 75,
      max: 150,
      currency: "USD",
      rateType: "hourly"
    },
    experience: [
      {
        role: "Senior Game Developer",
        company: "Epic Games",
        startDate: "2019",
        endDate: "2023",
        description: "Led development on multiple successful game projects."
      }
    ],
    portfolio: [
      {
        title: "Space Explorer VR",
        description: "Virtual reality space exploration game with over 1M downloads",
        thumbnailUrl: "https://example.com/space-explorer.jpg",
        projectUrl: "https://example.com/space-explorer",
        category: "Game Development",
        tags: ["VR", "Unity", "C#"],
        id: '',
        mediaType: 'image',
        featured: false,
        createdAt: ''
      }
    ],
    metrics: {
      rating: 4.9,
      responseRate: 98,
      completedProjects: 47,
      reviewCount: 38,
      totalEarnings: 150000,
      responseTime: 0,
      onTimeDelivery: 0,
      memberSince: '',
      lastActive: ''
    },
    awards: [
      {
        title: "Best Indie Game 2022",
        date: "2022",
        issuer: "GDC"
      }
    ],
    certifications: [
      {
        name: "Unity Certified Professional",
        issuer: "Unity",
        date: "2021",
        credentialUrl: "https://unity.com/certification/123"
      }
    ],
    availability: {
      nextAvailable: "2023-08-01",
      timezone: "America/Los_Angeles",
      workingHours: "9:00 AM - 6:00 PM PST",
      status: FreelanceStatus.AVAILABLE
    },
    profilePlan: ProfilePlan.PREMIUM,
    verified: true,
    featured: true,
    createdAt: "2021-01-15T08:00:00Z",
    updatedAt: "2023-07-20T15:30:00Z",
    languages: []
  },
  {
    id: "c2",
    workspaceId: "ws-124",
    name: "Sarah Chen",
    username: "sarahchen.art",
    tagline: "Gaming Art & Design Content Creator | 450K+ Community",
    bio: "Former AAA Character Artist turned content creator. Sharing game art tutorials, industry insights, and behind-the-scenes content. Helping aspiring artists break into the gaming industry.",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    coverImage: "https://images.unsplash.com/photo-1616499615673-d6e68ea6e066",
    socialLinks: {
      youtube: "https://youtube.com/sarahchen.art",
      twitter: "https://twitter.com/sarahchen_art",
      instagram: "https://instagram.com/sarahchen.art",
      artstation: "https://artstation.com/sarahchen",
      tiktok: "https://tiktok.com/@sarahchen.art"
    },
    creatorType: CreatorType.INFLUENCER,
    freelanceStatus: FreelanceStatus.AVAILABLE,
    location: {
      city: "Vancouver",
      country: "Canada",
      remote: true,
      timezone: "America/Vancouver"
    },
    categories: ["Digital Art", "Game Art", "Content Creation"],
    primaryCategory: "Digital Art",
    skills: [
      "Character Design",
      "3D Modeling",
      "Digital Art",
      "Art Education",
      "Content Creation"
    ],
    socialStats: {
      youtube: {
        subscribers: 450000,
        views: 25000000
      },
      instagram: {
        followers: 280000,
        engagement: 5.2
      },
      tiktok: {
        followers: 320000,
        likes: 5000000,
        engagement: 7.8
      }
    },
    metrics: {
      rating: 4.9,
      responseRate: 95,
      completedProjects: 85,
      reviewCount: 76,
      responseTime: 6,
      onTimeDelivery: 98,
      memberSince: "2021-03-15",
      lastActive: "2023-07-25"
    },
    portfolio: [
      {
        id: "p1",
        title: "Character Art Masterclass Series",
        description: "Complete guide to creating game characters",
        thumbnailUrl: "https://example.com/thumbnails/masterclass.jpg",
        projectUrl: "https://youtube.com/playlist?list=xxxx",
        category: "Education",
        tags: ["tutorial", "character design", "digital art"],
        mediaType: 'video',
        featured: true,
        createdAt: "2023-05-15"
      }
    ],
    previousBrands: [
      {
        name: "Wacom",
        campaignType: "Product Review & Tutorial Series",
        date: "2023-06",
        link: "https://youtube.com/playlist?list=abcd"
      },
      {
        name: "Adobe",
        campaignType: "Software Tutorial Partnership",
        date: "2023-04",
        link: "https://youtube.com/watch?v=efgh"
      }
    ],
    verified: true,
    featured: true,
    profilePlan: ProfilePlan.PREMIUM,
    languages: [
      {
        language: "English",
        proficiency: "native"
      },
      {
        language: "Mandarin",
        proficiency: "fluent"
      }
    ],
    createdAt: "2021-03-15T08:00:00Z",
    updatedAt: "2023-07-25T15:30:00Z"
  },
  {
    id: "c5",
    workspaceId: "ws-127",
    name: "Maya Gaming",
    username: "mayagaming",
    tagline: "Gaming Content Creator & Livestreamer",
    bio: "Professional gaming content creator with 500K+ YouTube subscribers. Specializing in gaming tutorials, reviews, and entertaining gameplay content. Known for indie game deep dives and developer collaborations.",
    profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    socialLinks: {
      youtube: "https://youtube.com/mayagaming",
      twitter: "https://twitter.com/mayagaming",
      instagram: "https://instagram.com/mayagaming",
      twitch: "https://twitch.tv/mayagaming"
    },
    creatorType: CreatorType.INFLUENCER,
    freelanceStatus: FreelanceStatus.AVAILABLE,
    location: {
      city: "London",
      country: "UK",
      remote: true,
      timezone: "Europe/London"
    },
    categories: ["Gaming", "Content Creation", "Live Streaming"],
    primaryCategory: "Gaming",
    skills: ["Game Commentary", "Video Editing", "Live Streaming", "Community Management"],
    specializations: ["Indie Games", "Gaming Tutorials", "Game Reviews"],
    rateRange: {
      min: 1000,
      max: 5000,
      currency: "USD",
      rateType: "project"
    },
    socialStats: {
      youtube: {
        subscribers: 520000,
        views: 15000000
      },
      twitch: {
        followers: 150000,
        subscribers: 3500,
        averageViewers: 2000
      },
      instagram: {
        followers: 125000,
        engagement: 4.8
      }
    },
    contentTypes: [
      "Let's Plays",
      "Game Reviews",
      "Developer Interviews",
      "Gaming Tutorials",
      "Live Streams"
    ],
    audienceDemographics: {
      ageRanges: ["18-24", "25-34"],
      topCountries: ["United States", "UK", "Canada", "Germany", "Australia"],
      genderSplit: {
        male: 65,
        female: 30,
        other: 5
      }
    },
    sponsorshipRates: {
      youtube: {
        dedicated: 3000,
        integrated: 1500,
        shorts: 800
      },
      instagram: {
        post: 500,
        story: 300,
        reel: 800
      }
    },
    previousBrands: [
      {
        name: "GamePublisher X",
        campaignType: "Game Launch Campaign",
        date: "2023-05",
        link: "https://youtube.com/watch?v=xxx"
      },
      {
        name: "Gaming Gear Pro",
        campaignType: "Product Review",
        date: "2023-03",
        link: "https://youtube.com/watch?v=yyy"
      }
    ],
    metrics: {
      rating: 4.9,
      responseRate: 98,
      completedProjects: 85,
      reviewCount: 42,
      responseTime: 4,
      onTimeDelivery: 97,
      memberSince: "2021-01-15",
      lastActive: "2023-07-25"
    },
    verified: true,
    featured: true,
    profilePlan: "PREMIUM",
    languages: [
      {
        language: "English",
        proficiency: "native"
      },
      {
        language: "Spanish",
        proficiency: "conversational"
      }
    ],
    createdAt: "2021-01-15T08:00:00Z",
    updatedAt: "2023-07-25T15:30:00Z"
  },
  {
    id: "c6",
    workspaceId: "ws-128",
    name: "Sophia Liu",
    username: "techsophia",
    tagline: "Tech & Gaming Content Creator | 1M+ Community",
    bio: "Tech enthusiast and gaming content creator with a focus on indie games and emerging technologies. Known for in-depth reviews, developer interviews, and engaging community-driven content. Former game developer turned full-time content creator.",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20",
    socialLinks: {
      youtube: "https://youtube.com/techsophia",
      twitter: "https://twitter.com/techsophia",
      instagram: "https://instagram.com/techsophia",
      tiktok: "https://tiktok.com/@techsophia",
      twitch: "https://twitch.tv/techsophia",
      linkedin: "https://linkedin.com/in/sophialiu"
    },
    creatorType: CreatorType.INFLUENCER,
    freelanceStatus: FreelanceStatus.AVAILABLE,
    location: {
      city: "Toronto",
      country: "Canada",
      remote: true,
      timezone: "America/Toronto"
    },
    categories: ["Gaming", "Tech Reviews", "Educational Content"],
    primaryCategory: "Gaming",
    skills: [
      "Content Creation",
      "Video Production",
      "Live Streaming",
      "Community Management",
      "Game Analysis",
      "Technical Reviews"
    ],
    specializations: [
      "Indie Game Coverage",
      "Tech Product Reviews",
      "Developer Interviews",
      "Educational Gaming Content"
    ],
    rateRange: {
      min: 2000,
      max: 10000,
      currency: "USD",
      rateType: "project"
    },
    socialStats: {
      youtube: {
        subscribers: 1200000,
        views: 50000000
      },
      tiktok: {
        followers: 850000,
        likes: 12000000,
        engagement: 8.5
      },
      twitch: {
        followers: 200000,
        subscribers: 5000,
        averageViewers: 3500
      },
      instagram: {
        followers: 300000,
        engagement: 5.2
      }
    },
    contentTypes: [
      "Game Reviews",
      "Tech Reviews",
      "Developer Interviews",
      "Tutorial Content",
      "Live Streams",
      "Short-form Content",
      "Educational Series"
    ],
    audienceDemographics: {
      ageRanges: ["18-24", "25-34", "35-44"],
      topCountries: ["United States", "Canada", "UK", "Australia", "Germany", "Japan"],
      genderSplit: {
        male: 68,
        female: 29,
        other: 3
      }
    },
    sponsorshipRates: {
      youtube: {
        dedicated: 8000,
        integrated: 4000,
        shorts: 2000
      },
      tiktok: {
        post: 2000,
        series: 5000
      },
      instagram: {
        post: 1500,
        story: 800,
        reel: 2000
      },
      twitch: {
        streamSponsorship: 3000,
        chatCommand: 500
      }
    },
    previousBrands: [
      {
        name: "NVIDIA",
        campaignType: "Product Launch",
        date: "2023-06",
        link: "https://youtube.com/watch?v=xxxxx"
      },
      {
        name: "Steam",
        campaignType: "Indie Game Festival Coverage",
        date: "2023-04",
        link: "https://youtube.com/watch?v=yyyyy"
      },
      {
        name: "Razer",
        campaignType: "Product Review Series",
        date: "2023-03",
        link: "https://youtube.com/playlist?list=zzzzz"
      }
    ],
    metrics: {
      rating: 4.95,
      responseRate: 97,
      completedProjects: 156,
      reviewCount: 89,
      responseTime: 3,
      onTimeDelivery: 99,
      memberSince: "2020-03-15",
      lastActive: "2023-07-26"
    },
    portfolio: [
      {
        id: "p1",
        title: "Indie Game Review Series",
        description: "Weekly series featuring unique indie games and developer interviews",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        projectUrl: "https://youtube.com/playlist?list=xxxxx",
        category: "Gaming",
        tags: ["indie games", "reviews", "interviews"],
        mediaType: 'video',
        featured: true,
        createdAt: "2023-01-15"
      },
      {
        id: "p2",
        title: "Tech Review Collection 2023",
        description: "In-depth reviews of the latest gaming hardware and peripherals",
        thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        projectUrl: "https://youtube.com/playlist?list=yyyyy",
        category: "Tech Reviews",
        tags: ["tech", "hardware", "reviews"],
        mediaType: 'video',
        featured: true,
        createdAt: "2023-06-20"
      }
    ],
    verified: true,
    featured: true,
    profilePlan: ProfilePlan.PREMIUM,
    languages: [
      {
        language: "English",
        proficiency: "native"
      },
      {
        language: "Mandarin",
        proficiency: "fluent"
      }
    ],
    createdAt: "2020-03-15T08:00:00Z",
    updatedAt: "2023-07-26T15:30:00Z"
  }
];

// Update categories to match the design
export const creatorCategories = [
  {
    id: "game-dev",
    name: "Game Development",
    subcategories: [
      "Programming",
      "Technical Art",
      "Game Design",
      "Level Design"
    ]
  },
  {
    id: "gaming",
    name: "Gaming",
    subcategories: [
      "Let's Play",
      "Game Reviews",
      "Streaming",
      "Tutorials",
      "Esports"
    ]
  },
  {
    id: "content-creation",
    name: "Content Creation",
    subcategories: [
      "Video Production",
      "Live Streaming",
      "Community Management",
      "Social Media"
    ]
  }
];

// Update skills with categories
export const creatorSkills = {
  programming: [
    "Unity",
    "Unreal Engine",
    "C#",
    "C++",
    "Python",
    "JavaScript"
  ],
  art: [
    "3D Modeling",
    "Character Design",
    "Environment Art",
    "Concept Art"
  ],
  contentCreation: [
    "Live Streaming",
    "Video Editing",
    "Community Management",
    "Social Media Management",
    "Content Strategy",
    "Audience Growth",
    "Brand Collaborations"
  ],
  gaming: [
    "Game Commentary",
    "Speedrunning",
    "Game Reviews",
    "Tutorial Creation",
    "Esports Casting",
    "Community Events"
  ]
};

export interface Creator {
  mode?: ProfileMode;
  isAvailableForHire?: boolean;
}
