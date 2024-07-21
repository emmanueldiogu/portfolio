/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      lineHeight: {
        'full': '100%',
      },
      fontSize: {
        'clamp-h1': 'clamp(2.027rem, 1.311rem + 3.583vw, 5.61rem)',
        'clamp-h2': 'clamp(1.802rem, 1.32rem + 2.407vw, 4.209rem)',
        'clamp-h3': 'clamp(1.602rem, 1.291rem + 1.556vw, 3.158rem)',
        'clamp-h4': 'clamp(1.424rem, 1.235rem + 0.945vw, 2.369rem)',
        'clamp-h5': 'clamp(1.266rem, 1.163rem + 0.511vw, 1.777rem)',
        'clamp-h6': 'clamp(1.125rem, 1.083rem + 0.208vw, 1.333rem)',
      },
      screens: {
        'xxl': '1367px'
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}
