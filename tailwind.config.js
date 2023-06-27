/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         "primary": "#09446d",  
  //         "secondary": "#ffe8b5",
  //         "accent": "#ea9b12",
  //         "neutral": "#131820",
  //         "base-100": "#3a404b",
  //         "info": "#649af7",
  //         "success": "#72e9cf",
  //         "warning": "#f7b56e",
  //         "error": "#f0192b",
  //       },
  //     },
  //   ],
  // },
  plugins: [
    require("daisyui")
  ],
}
