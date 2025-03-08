/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#338B38', // Forest Green (Stronger natural feel)
        secondary: '#A5D6A7', // Fresh Leaf Green (Lighter, good for backgrounds)
        accent: '#F5F5F5' // Soft Off-White (Better readability)
      }
    }
  },
  plugins: []
}
