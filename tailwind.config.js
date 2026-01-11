const { default: daisyui } = require("daisyui");
const { default: themes } = require("daisyui/theme/object");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
