module.exports = {
  mode: 'jit',
  darkMode: 'media', // or 'media' or 'class'
  purge: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  variants: {
  },
}
