import {List} from "immutable";
import * as React from "react";
import {ThemeProviderComponent} from "styled-components";
import {ThemesProvider} from "./ThemesProvider";
import {Theme} from "./types/Theme";

export const withThemesProvider = (themes: Theme[], CustomThemeProvider?: ThemeProviderComponent<any>) => (story): JSX.Element => {
    return <ThemesProvider themes={List(themes)} CustomThemeProvider={CustomThemeProvider}>{story()}</ThemesProvider>;
};
