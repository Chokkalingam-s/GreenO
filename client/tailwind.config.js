/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3E8E42', // Forest Green (Stronger natural feel)
        secondary: '#D6FFD7', // Fresh Leaf Green (Lighter, good for backgrounds)
        accent: '#F5F5F5' // Soft Off-White (Better readability)
      }
    }
  },
  plugins: []
}
