import addons from "@storybook/addons";
import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, renderNothing, withHandlers, withState} from "recompose";
import {Theme} from "./types/Theme";

export interface ThemesProviderProps {
    themes: List<Theme>;
    ThemeProvider: any;
}

interface ThemesProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface ThemesProviderHandler {
    onSelectTheme: (name: string) => void;
}

type BaseComponentProps = ThemesProviderProps & ThemesProviderState & ThemesProviderHandler;

// @ts-ignore
const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({theme, ThemeProvider, children}) => {
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
};

export const ThemesProvider: React.FunctionComponent<ThemesProviderProps> = compose<BaseComponentProps, ThemesProviderProps>(
    withState("theme", "setTheme", null),
    withHandlers<ThemesProviderProps & ThemesProviderState, ThemesProviderHandler>({
        onSelectTheme: ({setTheme, themes}) => (name) => {
            const theme = themes.find((th: Theme) => th.name === name);
            setTheme(theme);
        },
    }),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
            const {onSelectTheme, themes} = this.props;
            const channel = addons.getChannel();
            channel.on("selectTheme", onSelectTheme);
            channel.emit("setThemes", themes);
        },
        componentWillUnmount() {
            const {onSelectTheme} = this.props;
            const channel = addons.getChannel();
            channel.removeListener("selectTheme", onSelectTheme);
        },
    }),
    branch<BaseComponentProps>(
        (props) => !props.theme,
        renderNothing,
    ),
)(BaseComponent) as any;
