/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dark', "light","dracula"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    
  },
}

