import {List} from "immutable";
import * as React from "react";
import {ThemeProvider as DefaultThemesProvider} from "react-jss";
import {ThemesProvider} from "./ThemesProvider";
import {Theme} from "./types/Theme";

export const withThemesProvider = (themes: Theme[], ThemeProvider: any = DefaultThemesProvider) =>
    (story: any): JSX.Element => {
        return <ThemesProvider themes={List(themes)} ThemeProvider={ThemeProvider}>{story()}</ThemesProvider>;
    };
