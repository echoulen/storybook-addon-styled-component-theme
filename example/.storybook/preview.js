import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-jss-component-theme";
import {ThemeProvider} from "react-jss";
import {defaultTheme, darkTheme} from "../src/Demo";



export const getAllThemes = () => {
  return [defaultTheme, darkTheme];
};

addDecorator(withThemesProvider(getAllThemes(), ThemeProvider));
