/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/main-body/*.{html,ts}",
    "./src/app/login-page/*.{html,ts}",
    "./src/app/user-page/*.{html,ts}",
    "./src/app/navbar/*.{html,ts}",
    "./src/app/recipe-detail-page/*.{html,ts}",
    "./src/app/recipe-maker/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

