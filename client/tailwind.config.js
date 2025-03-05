/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B8F69', // Deep Forest Green (Dominant, not too dark)
        secondary: '#B7E4C7', // Soft Sage Green (Better for backgrounds)
        tertiary: '#2C2C2C', // Soft Charcoal (Dark but comfortable)
        accent: '#F5F5F5' // Soft White (Better for readability)
      }
    }
  },
  plugins: []
}
