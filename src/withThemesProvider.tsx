import {List} from "immutable";
import * as React from "react";
import {makeDecorator} from '@storybook/addons';
import {ThemesProvider} from "./ThemesProvider";
import {Theme} from "./types/Theme";

export const withThemesProvider = (themes: Theme[]) => (story): JSX.Element => {
    return <ThemesProvider themes={List(themes)}>{story()}</ThemesProvider>;
};
