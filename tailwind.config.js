module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: 'Roboto'
    },
    extend: {},
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#1877f2',
        login: '#1775ee'
      },
      red: {
        primary: '#FF0000',
        offline: '#FF0000'
      },
      green: {
        button: '#008000',
        online: '#00FF00',
        register: '#42b72a'
      },
      gray: {
        border: '#808080',
        light: '#808080',
        bg: '#f0f2f5'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
