import {addDecorator, configure} from '@storybook/react';
import * as React from "react";
import {withThemesProvider} from "../dist/src/index";

const defaultTheme = {
  name: "DEFAULT",
  backgroundColor: 'azure',
  textColor: "dimgrey",
  borderRadius: "30px",
};

const darkTheme = {
  name: "DARK",
  backgroundColor: "black",
  textColor: "seashell",
  borderRadius: "100px",
};

export const getAllThemes = () => {
  return [defaultTheme, darkTheme];
};

addDecorator(withThemesProvider(getAllThemes()));

// automatically import all files ending in *.stories.js
const req = require.context('../', true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
