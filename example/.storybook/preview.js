import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import {ThemeProvider} from "styled-components";

const defaultTheme = {
  name: "DEFAULT",
  backgroundColor: "white",
  textColor: "dimgrey",
  borderRadius: "30px"
};

const darkTheme = {
  name: "DARK",
  backgroundColor: "black",
  textColor: "seashell",
  borderRadius: "100px"
};

export const getAllThemes = () => {
  return [defaultTheme, darkTheme];
};

addDecorator(withThemesProvider(getAllThemes(), ThemeProvider));
