export const CHART_COLORS = [
  '#A13163', // primary
  '#4B269F', // secondary
  '#FB3D25', // accent-red
  '#F99926', // accent-orange
  '#FFD700', // accent-yellow
  '#FFA500'  // accent-orange2
];

export const THEMES = {
  gigs: {
    primary: '#A13163',
    secondary: '#4B269F',
    accent: '#FB3D25',
    background: 'from-[#A13163] to-[#4B269F]',
    buttonPrimary: 'bg-[#A13163] hover:bg-[#8a2953] text-white',
    buttonSecondary: 'bg-[#4B269F] hover:bg-[#3f1f85] text-white',
    icon: 'text-[#A13163]'
  },
  showcase: {
    primary: '#4B269F',
    secondary: '#A13163',
    accent: '#F99926',
    background: 'from-[#4B269F] to-[#A13163]',
    buttonPrimary: 'bg-[#4B269F] hover:bg-[#3f1f85] text-white',
    buttonSecondary: 'bg-[#A13163] hover:bg-[#8a2953] text-white',
    icon: 'text-[#4B269F]'
  }
};

// This type definition is moved to index.tsx to ensure it's properly exported
// export type ThemeType = keyof typeof THEMES;