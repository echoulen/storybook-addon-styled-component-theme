import {List} from "immutable";
import * as React from "react";
import {ThemesProvider} from "./ThemesProvider";
import {Theme} from "./types/Theme";

export const withThemesProvider = (themes: Theme[], CustomThemeProvider) => (story): JSX.Element => {
    return <ThemesProvider themes={List(themes)} CustomThemeProvider={CustomThemeProvider}>{story()}</ThemesProvider>;
};
