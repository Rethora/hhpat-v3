/** @type {import('tailwindcss').Config} */

import { colors, screens } from "./src/utils/theme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors,
    screens,
  },
  plugins: [],
};
