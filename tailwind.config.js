module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      MaiLog: ['MaiLog', 'MaiLog NF', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}
