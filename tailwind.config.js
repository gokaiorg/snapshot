module.exports = {
  purge: {
    enabled: true,
    preserveHtmlElements: false,
    mode: 'layers',
    content: ['./index.html', './src/**/*.{vue,js,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        'Calibre, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji'
      ]
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
