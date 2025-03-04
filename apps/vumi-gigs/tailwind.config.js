/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    // Fix the patterns that might match too many files
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // Use src instead of everything
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#A13163',
        secondary: '#4B269F',
        accent: '#FB3D25',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};