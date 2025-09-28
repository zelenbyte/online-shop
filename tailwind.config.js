/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, spacing, etc. here
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here if needed
  ],
};
