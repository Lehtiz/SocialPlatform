module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    serif: 'Roboto',
    extend: {},
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#1877f2'
      },
      red: {
        primary: '#FF0000',
        offline: '#FF0000'
      },
      green: {
        button: '#008000',
        online: '#00FF00'
      },
      gray: {
        border: '#808080',
        light: '#808080'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
