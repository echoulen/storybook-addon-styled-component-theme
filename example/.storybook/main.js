module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/stories/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "storybook-addon-jss-component-theme/dist/preset"
  ]
};
