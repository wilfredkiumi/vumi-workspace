import { Studio } from '../types';

export const sampleStudio: Studio = {
  id: "s1",
  name: "Dreamscape Studios",
  description: "Full-service production studio specializing in animation, VFX, and game development. Our team of experienced artists and developers creates stunning visual content for clients worldwide.",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  coverImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  location: {
    city: "Los Angeles",
    country: "USA"
  },
  industry: ["Animation", "VFX", "Game Development"],
  services: [
    "3D Animation",
    "Character Design",
    "VFX Production",
    "Game Asset Creation",
    "Motion Capture"
  ],
  equipment: [
    "RED Cinema Cameras",
    "Motion Capture Studio",
    "VR Development Kit",
    "Professional Audio Suite"
  ],
  facilities: [
    "5000 sq ft Studio Space",
    "Green Screen Room",
    "Recording Studio",
    "Edit Suites"
  ],
  teamMembers: [
    {
      id: "tm1",
      name: "Sarah Chen",
      role: "Creative Director",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Award-winning creative director with 15 years of experience in animation and VFX.",
      creatorId: "c1"
    },
    {
      id: "tm2",
      name: "Michael Rodriguez",
      role: "Technical Director",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Expert in pipeline development and technical optimization for animation and VFX projects.",
      creatorId: "c2"
    },
    {
      id: "tm3",
      name: "Emily Wong",
      role: "Lead Animator",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      bio: "Specializes in character animation and motion design with a focus on storytelling through movement.",
      creatorId: "c3"
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Mystic Realms",
      description: "Animated feature film with stunning visual effects and character animation.",
      thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      category: "Animation",
      completionDate: "2023-06-15"
    },
    {
      id: "p2",
      title: "Future City VFX",
      description: "Visual effects for a sci-fi series showcasing futuristic cityscapes.",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "VFX",
      completionDate: "2023-08-20"
    },
    {
      id: "p3",
      title: "Adventure Quest Assets",
      description: "Game asset creation including characters, environments, and props.",
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "Game Development",
      completionDate: "2023-09-10"
    }
  ],
  showcases: [
    {
      id: "sh1",
      title: "Animation Expo 2023",
      description: "Showcasing our latest animation and VFX work.",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      date: "2023-09-20"
    }
  ],
  contacts: {
    email: "contact@dreamscapestudios.com",
    phone: "+1 (323) 555-0123",
    website: "https://dreamscapestudios.com",
    socialMedia: [
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/dreamscape-studios"
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/dreamscapestudios"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/dreamscapestudios"
      }
    ]
  },
  metrics: {
    rating: 4.8,
    completedProjects: 150,
    reviews: 75
  },
  verified: true,
  featured: true,
  plan: 'pro',
  createdAt: "2020-01-15T00:00:00Z",
  updatedAt: "2023-09-01T00:00:00Z"
};

export const sampleStudios: Studio[] = [
  sampleStudio,
  // Add more sample studios here as needed
];