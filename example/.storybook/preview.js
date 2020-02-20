import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

const defaultTheme = {
  name: "DEFAULT",
  backgroundColor: "azure",
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

addDecorator(withThemesProvider(getAllThemes()));
