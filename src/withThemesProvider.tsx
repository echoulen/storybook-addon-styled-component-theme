import {List} from "immutable";
import * as React from "react";
import {ThemeProviderComponent, ThemeProvider as DefaultThemesProvider} from "styled-components";
import {ThemesProvider} from "./ThemesProvider";
import {Theme} from "./types/Theme";

export const withThemesProvider = (themes: Theme[], ThemeProvider: ThemeProviderComponent<any> = DefaultThemesProvider) =>
    (story): JSX.Element => {
        return <ThemesProvider themes={List(themes)} ThemeProvider={ThemeProvider}>{story()}</ThemesProvider>;
    };
