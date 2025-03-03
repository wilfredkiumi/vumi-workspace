import { Gig } from '../models/Gig';

export const sampleGigs: Gig[] = [
  {
    id: "g1",
    title: "3D Character Modeling for Indie Game",
    description: "We're looking for a talented 3D artist to create 5 character models for our upcoming indie game. The characters should be low-poly and match our existing art style.\n\nThe game is a fantasy RPG with a stylized aesthetic, and we need character models for the following:\n- Main hero character (human)\n- Companion character (elf)\n- Merchant NPC\n- Two enemy types\n\nAll characters should be rigged for animation and include basic texture maps. We'll provide concept art and reference materials for each character.",
    category: "Game Development",
    subcategory: "3D Modeling",
    budget: {
      min: 1500,
      max: 3000,
      type: 'fixed'
    },
    duration: "2-4 weeks",
    skills: ["3D Modeling", "Character Design", "Blender", "Unity", "Low-Poly", "Texturing", "Rigging"],
    location: {
      type: 'remote'
    },
    postedBy: {
      id: "u1",
      name: "GameStudio XYZ",
      rating: 4.8,
      verified: true
    },
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    applicants: 12,
    status: 'open',
    featured: true
  },
  // Animation Gigs
  {
    id: "g9",
    title: "Character Animation for Indie RPG",
    description: "Looking for a skilled animator to create character animations for our upcoming indie RPG. The project includes walk cycles, combat animations, and emotive sequences.",
    category: "Animation",
    subcategory: "Character Animation",
    budget: { min: 2000, max: 4000, type: 'fixed' },
    duration: "4-6 weeks",
    skills: ["Character Animation", "Maya", "After Effects", "Spine 2D", "Unity Integration"],
    location: { type: 'remote' },
    postedBy: {
      id: "u9",
      name: "RPG Ventures",
      rating: 4.7,
      verified: true
    },
    postedDate: "2023-07-01",
    deadline: "2023-08-15",
    applicants: 8,
    status: 'open'
  },
  
  // Motion Graphics
  {
    id: "g10",
    title: "Brand Package Motion Graphics",
    description: "Need a motion designer to create a complete brand animation package including logo reveal, transitions, and social media assets.",
    category: "Motion Graphics",
    subcategory: "Brand Animation",
    budget: { min: 1500, max: 2500, type: 'fixed' },
    duration: "2-3 weeks",
    skills: ["After Effects", "Cinema 4D", "Motion Design", "Logo Animation"],
    location: { type: 'remote' },
    postedBy: {
      id: "u10",
      name: "Creative Agency Co",
      rating: 4.9,
      verified: true
    },
    postedDate: "2023-07-05",
    deadline: "2023-07-25",
    applicants: 15,
    status: 'open',
    featured: true
  },
  
  // VR/AR Development
  {
    id: "g11",
    title: "AR Product Visualization App",
    description: "Seeking an AR developer to create a product visualization app for furniture. Users should be able to place and customize furniture in their space.",
    category: "VR/AR Development",
    subcategory: "AR Development",
    budget: { min: 45, max: 75, type: 'hourly' },
    duration: "2-3 months",
    skills: ["Unity", "ARKit", "ARCore", "C#", "3D Modeling", "UI/UX"],
    location: { type: 'hybrid', city: "Boston", country: "USA" },
    postedBy: {
      id: "u11",
      name: "FutureVision Labs",
      rating: 4.8,
      verified: true
    },
    postedDate: "2023-07-02",
    deadline: "2023-08-30",
    applicants: 6,
    status: 'open'
  },
  
  // Sound Design
  {
    id: "g12",
    title: "Sound Effects Package for Mobile Game",
    description: "Create a comprehensive sound effects package for a casual mobile game, including UI sounds, achievement jingles, and ambient effects.",
    category: "Sound Design",
    subcategory: "Game Audio",
    budget: { min: 1000, max: 2000, type: 'fixed' },
    duration: "2-4 weeks",
    skills: ["Sound Design", "Pro Tools", "FMOD", "Game Audio", "Sound Synthesis"],
    location: { type: 'remote' },
    postedBy: {
      id: "u12",
      name: "Mobile Games Plus",
      rating: 4.6,
      verified: false
    },
    postedDate: "2023-07-08",
    deadline: "2023-08-08",
    applicants: 4,
    status: 'open'
  },
  
  // Visual Effects
  {
    id: "g13",
    title: "VFX for Sci-Fi Short Film",
    description: "Looking for a VFX artist to create high-quality effects for a 10-minute sci-fi film. Work includes laser effects, holographics, and environmental enhancements.",
    category: "Visual Effects",
    subcategory: "Film VFX",
    budget: { min: 3000, max: 5000, type: 'fixed' },
    duration: "1-2 months",
    skills: ["After Effects", "Nuke", "Fusion", "Particle Systems", "Compositing"],
    location: { type: 'remote' },
    postedBy: {
      id: "u13",
      name: "Independent Films Co",
      rating: 4.9,
      verified: true
    },
    postedDate: "2023-07-03",
    deadline: "2023-09-01",
    applicants: 11,
    status: 'open',
    featured: true
  },
  
  // UI/UX Design
  {
    id: "g14",
    title: "Game UI Redesign Project",
    description: "Redesign the user interface for an existing mobile RPG. Focus on improving usability while maintaining the fantasy aesthetic.",
    category: "UI/UX Design",
    subcategory: "Game UI",
    budget: { min: 2500, max: 4000, type: 'fixed' },
    duration: "3-4 weeks",
    skills: ["UI Design", "Game UI/UX", "Figma", "Unity", "Mobile Design"],
    location: { type: 'remote' },
    postedBy: {
      id: "u14",
      name: "GameCraft Studios",
      rating: 4.7,
      verified: true
    },
    postedDate: "2023-07-06",
    deadline: "2023-08-15",
    applicants: 9,
    status: 'open'
  },
  
  // 3D Modeling
  {
    id: "g15",
    title: "3D Vehicle Models for Racing Game",
    description: "Create 5 high-quality, optimized 3D vehicle models for a mobile racing game. Models should be game-ready with LODs and proper UV mapping.",
    category: "3D Modeling",
    subcategory: "Vehicle Modeling",
    budget: { min: 3500, max: 5000, type: 'fixed' },
    duration: "4-6 weeks",
    skills: ["3D Modeling", "Blender", "Maya", "Substance Painter", "UV Mapping", "LOD Creation"],
    location: { type: 'remote' },
    postedBy: {
      id: "u15",
      name: "Speed Games Inc",
      rating: 4.8,
      verified: true
    },
    postedDate: "2023-07-04",
    deadline: "2023-08-20",
    applicants: 7,
    status: 'open'
  }
];

// Categories for selection
export const gigCategories = [
  "Game Development",
  "Animation",
  "Video Production",
  "3D Modeling",
  "Concept Art",
  "UI/UX Design",
  "Sound Design",
  "VR/AR Development",
  "Motion Graphics",
  "Visual Effects"
];

// Common skills for selection
export const commonSkills = [
  "3D Modeling",
  "Character Design",
  "Animation",
  "Unity",
  "Unreal Engine",
  "Blender",
  "Maya",
  "ZBrush",
  "Adobe Creative Suite",
  "After Effects",
  "Premiere Pro",
  "Concept Art",
  "Storyboarding",
  "Rigging",
  "Texturing",
  "UI Design",
  "UX Design",
  "Sound Design",
  "Motion Capture",
  "C#",
  "C++",
  "Python",
  "JavaScript",
  "VR Development",
  "AR Development",
  "Mobile Development"
];
