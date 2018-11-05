import addons from "@storybook/addons";
import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, renderNothing, withState} from "recompose";
import {ThemeProvider} from "styled-components";
import {Theme} from "./types/Theme";

export interface ThemesProviderProps {
    themes: List<Theme>;
}

interface ThemesProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface ThemesProviderHandler {
}

type BaseComponentProps = ThemesProviderProps & ThemesProviderState & ThemesProviderHandler;

const BaseComponent: React.SFC<BaseComponentProps> = ({theme, children}) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

export const ThemesProvider = compose<BaseComponentProps, ThemesProviderProps>(
    withState("theme", "setTheme", null),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
            const {setTheme, themes} = this.props;
            const channel = addons.getChannel();
            channel.on("selectTheme", setTheme);
            channel.emit("setThemes", themes);
        },
        componentWillUnmount() {
            const {setTheme} = this.props;
            const channel = addons.getChannel();
            channel.removeListener("selectTheme", setTheme);
        },
    }),
    branch<BaseComponentProps>(
        (props) => !props.theme,
        renderNothing,
    ),
)(BaseComponent);
