/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // breakpoints
      screens: {
        'small-phone': '320px',  
        'medium-phone': '375px',  
        'large-phone': '425px',  
        'tablet': '768px',  
        'small-screen': '1024px',
        'default-screen': '1280px',
        'large-screen': '1440px',
        '4k-screen': '2560px',
      },
    },
  },
  plugins: [],
}