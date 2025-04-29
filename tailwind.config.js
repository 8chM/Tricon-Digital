/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': { max: '1919px' },
        xl: { max: '1535px' },
        lg: { max: '1279px' },
        md: { max: '1023px' },
        sm: { max: '767px' },
        xs: { max: '639px' },
        '2xs': { max: '413px' },
      },
      colors: {
        grey: {
          1: '#090a0c',
          5: '#101114',
          10: '#18191d',
          20: '#252629',
          40: '#505153',
          50: '#7c7c7c',
          80: '#c9cbcf',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: { color: '#fff' },
            h2: { color: '#fff' },
            h3: { color: '#fff' },
            h4: { color: '#fff' },
            h5: { color: '#fff' },
            h6: { color: '#fff' },
            strong: { color: '#fff' },
            code: { color: '#fff' },
            figcaption: { color: '#9ca3af' },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#374151',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}