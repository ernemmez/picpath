const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pp-pale-gray": "#DDDDDD",
        "pp-main-green": "#265A5C",
        "pp-secondary-green": "#09766F",
        "pp-danger": "#FF5A5E",
        "pp-warning": "#E1AA52",
        "pp-text": "#52575D",
        "pp-title": "#41444B",
        "pp-skypale-green": "#F1F1F1",
        "pp-link": "#00929B",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      borderRadius: {
        lg: "3px",
      },
    },
  },
  plugins: [],
});
