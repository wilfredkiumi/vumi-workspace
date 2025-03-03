import { Studio } from '../models';
import { setCounter } from '../utils/idGenerator';

// Sample studios data
export const sampleStudios: Studio[] = [
  {
    id: "STU-20230915-001",
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
        bio: "Award-winning creative director with 15 years of experience in animation and VFX."
      },
      {
        id: "tm2",
        name: "Michael Rodriguez",
        role: "Technical Director",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Expert in pipeline development and technical optimization for animation and VFX projects."
      },
      {
        id: "tm3",
        name: "Emily Wong",
        role: "Lead Animator",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Specializes in character animation and motion design with a focus on storytelling through movement."
      }
    ],
    projects: [
      {
        id: "PRJ-20230615-001",
        title: "Mystic Realms",
        description: "Animated feature film with stunning visual effects and character animation.",
        thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        category: "Animation",
        completionDate: "2023-06-15"
      },
      {
        id: "PRJ-20230820-001",
        title: "Future City VFX",
        description: "Visual effects for a sci-fi series showcasing futuristic cityscapes.",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        category: "VFX",
        completionDate: "2023-08-20"
      },
      {
        id: "PRJ-20230910-001",
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
    createdAt: "2020-01-15T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z"
  },
  {
    id: "STU-20230915-002",
    name: "Pixel Perfect Productions",
    description: "Boutique studio focused on high-quality game art and animations with a team of talented artists. We take pride in our attention to detail and creating assets that enhance gameplay and user experience.",
    logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    location: {
      city: "Austin",
      country: "USA"
    },
    industry: ["Game Development", "Animation", "Digital Art"],
    services: [
      "2D Animation",
      "Concept Art",
      "Game Asset Creation",
      "UI Design",
      "Character Design"
    ],
    equipment: [
      "Professional Workstations",
      "Digital Drawing Tablets",
      "3D Scanners"
    ],
    facilities: [
      "Collaborative Studio Space",
      "Private Meeting Rooms"
    ],
    teamMembers: [
      {
        id: "tm4",
        name: "Mark Johnson",
        role: "Art Director",
        profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Experienced art director with a passion for creating unique visual styles for games."
      },
      {
        id: "tm5",
        name: "Jessica Lee",
        role: "Lead Artist",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Specializes in character design and concept art with a unique art style."
      },
      {
        id: "tm6",
        name: "David Miller",
        role: "UI/UX Designer",
        profileImage: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Creates intuitive and visually appealing interfaces for games and applications."
      }
    ],
    projects: [
      {
        id: "PRJ-20230510-001",
        title: "Fantasy Quest",
        description: "Character design and animation for award-winning mobile RPG.",
        thumbnail: "https://images.unsplash.com/photo-1642532318931-5e537ed1354a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        category: "Game Art",
        completionDate: "2023-05-10"
      },
      {
        id: "PRJ-20230722-001",
        title: "Space Odyssey UI",
        description: "Complete user interface design for sci-fi strategy game.",
        thumbnail: "https://images.unsplash.com/photo-1616031037011-83934b103f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        category: "UI Design",
        completionDate: "2023-07-22"
      }
    ],
    showcases: [
      {
        id: "sh2",
        title: "Game Developers Conference 2023",
        description: "Showcasing our latest game art and animations.",
        thumbnail: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        date: "2023-03-15"
      }
    ],
    contacts: {
      email: "info@pixelperfect.com",
      phone: "+1 (512) 555-0178",
      website: "https://pixelperfect.com",
      socialMedia: [
        {
          platform: "Instagram",
          url: "https://instagram.com/pixelperfect"
        },
        {
          platform: "ArtStation",
          url: "https://artstation.com/pixelperfect"
        }
      ]
    },
    metrics: {
      rating: 4.7,
      completedProjects: 85,
      reviews: 42
    },
    verified: true,
    featured: false,
    createdAt: "2021-03-10T00:00:00Z",
    updatedAt: "2023-08-15T00:00:00Z"
  },
  {
    id: "STU-20230915-003",
    name: "SoundWave Audio",
    description: "Specialized audio production studio creating immersive soundscapes for games, films, and interactive media. Our team of sound designers and composers craft audio experiences that elevate your projects to the next level.",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    coverImage: "https://images.unsplash.com/photo-1520692852656-1e618e8a9eff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    location: {
      city: "Nashville",
      country: "USA"
    },
    industry: ["Audio Production", "Game Development", "Film"],
    services: [
      "Sound Design",
      "Music Composition",
      "Voice Acting",
      "Audio Implementation",
      "Foley Recording"
    ],
    equipment: [
      "Professional Recording Studio",
      "Sound Isolation Booths",
      "High-end Microphones",
      "Digital Audio Workstations"
    ],
    facilities: [
      "Recording Studios",
      "Mixing Rooms",
      "Foley Stage"
    ],
    teamMembers: [
      {
        id: "tm7",
        name: "Lisa Chen",
        role: "Audio Director",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Award-winning sound designer with experience in AAA game and film productions."
      },
      {
        id: "tm8",
        name: "James Brown",
        role: "Music Composer",
        profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Classically trained composer with a passion for creating emotional soundtracks."
      },
      {
        id: "tm9",
        name: "Maria Garcia",
        role: "Voice Talent Director",
        profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Experienced voice director who has worked with hundreds of voice talents across multiple projects."
      },
      {
        id: "tm10",
        name: "Daniel Kim",
        role: "Audio Engineer",
        profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        bio: "Technical audio expert specializing in spatial audio and immersive sound experiences."
      }
    ],
    projects: [
      {
        id: "PRJ-20230722-002",
        title: "Echoes of Eternity",
        description: "Comprehensive audio design and implementation for a narrative adventure game.",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        category: "Game Audio",
        completionDate: "2023-07-22"
      },
      {
        id: "PRJ-20230515-001",
        title: "The Last Journey",
        description: "Original soundtrack and sound design for indie documentary film.",
        thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        category: "Film Audio",
        completionDate: "2023-05-15"
      },
      {
        id: "PRJ-20230210-001",
        title: "Voices of Nature",
        description: "Interactive audio experience for museum exhibition on wildlife conservation.",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        category: "Interactive Audio",
        completionDate: "2023-02-10"
      }
    ],
    showcases: [
      {
        id: "sh3",
        title: "Audio Engineering Society Conference",
        description: "Presenting our innovative audio techniques and technologies.",
        thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        date: "2023-10-05"
      },
      {
        id: "sh4",
        title: "Game Audio Connect 2023",
        description: "Networking event for game audio professionals featuring our latest work.",
        thumbnail: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        date: "2023-08-18"
      }
    ],
    contacts: {
      email: "contact@soundwave.com",
      phone: "+1 (615) 555-0191",
      website: "https://soundwave-audio.com",
      socialMedia: [
        {
          platform: "SoundCloud",
          url: "https://soundcloud.com/soundwave-audio"
        },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/company/soundwave-audio"
        },
        {
          platform: "Twitter",
          url: "https://twitter.com/soundwaveaudio"
        }
      ]
    },
    metrics: {
      rating: 4.9,
      completedProjects: 110,
      reviews: 58
    },
    verified: true,
    featured: true,
    createdAt: "2019-08-05T00:00:00Z",
    updatedAt: "2023-09-10T00:00:00Z"
  }
];

// Initialize the counters based on our sample data
// In a real app, this would be based on querying the database
setCounter('studio', 3);  // We have 3 studios
setCounter('project', 8); // We have 8 projects across all studios

// Helper function to find a studio by ID
export function getStudioById(id: string): Studio | undefined {
  return sampleStudios.find(studio => studio.id === id);
}

export interface Studio {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  location: {
    city: string;
    country: string;
  };
  industry: string[];
  services: string[];
  equipment: string[];
  facilities: string[];
  teamMembers: {
    id: string;
    name: string;
    role: string;
    profileImage: string;
    bio: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    completionDate: string;
  }[];
  showcases: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    date: string;
  }[];
  contacts: {
    email: string;
    phone: string;
    website: string;
    socialMedia: {
      platform: string;
      url: string;
    }[];
  };
  metrics: {
    rating: number;
    completedProjects: number;
    reviews: number;
  };
  verified: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
