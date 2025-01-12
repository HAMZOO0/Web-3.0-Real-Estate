/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        realstate_pic:
          "url('https://unsplash.com/photos/YFtWbyck9So/download?force=true&w=1920')",
      },
    },
  },
  plugins: [],
};
