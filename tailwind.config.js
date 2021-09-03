module.exports = {
  mode:'jit',
  purge: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.css',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens:{
        'print':{'raw':'print'}
      }
    },
    fontFamily: {sans:"'Noto Sans JP'"}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
