module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // npm install -D @tailwindcss/forms
    require('@tailwindcss/forms'),
  ],
};