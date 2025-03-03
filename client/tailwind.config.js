/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E3F6E5', // Soft misty green (for light backgrounds & frosted effects)
        secondary: '#A4C3A2', // Muted sage green (for cards & secondary elements)
        tertiary: '#4B6B43', // Rich deep forest green (for contrast & depth)
        accent: '#8F5E38' // Earthy warm brown (for highlights & buttons)
      }
    }
  },
  plugins: []
}
