/* @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/theme';

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui(), // For NextUI integration
    require('daisyui'), // Correct way to add daisyUI plugin
    require('flowbite/plugin') // Correct way to add Flowbite plugin
  ],
};
