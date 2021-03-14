import addons from "@storybook/addons";
import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, mapProps, renderNothing, withHandlers, withState} from "recompose";
import {ThemeProvider, ThemeProviderComponent} from "styled-components";
import {Theme} from "./types/Theme";

export interface ThemesProviderProps {
    themes: List<Theme>;
    CustomThemeProvider?: ThemeProviderComponent<any>;
}

interface ThemesProviderMapProps {
    Provider: ThemeProviderComponent<{theme: Theme}>;
}

interface ThemesProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface ThemesProviderHandler {
    onSelectTheme: (name: string) => void;
}

type BaseComponentProps = ThemesProviderProps & ThemesProviderMapProps & ThemesProviderState & ThemesProviderHandler;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({theme, Provider, children}) => (
  <Provider theme={theme} children={children as any}/>
);

export const ThemesProvider: React.FunctionComponent<ThemesProviderProps> = compose<BaseComponentProps, ThemesProviderProps>(
    mapProps<ThemesProviderProps & ThemesProviderMapProps, ThemesProviderProps>((props) => {
        const {CustomThemeProvider} = props;
        const Provider = CustomThemeProvider ? CustomThemeProvider : ThemeProvider;
        return {...props, Provider};
    }),
    withState("theme", "setTheme", null),
    withHandlers<ThemesProviderProps & ThemesProviderMapProps & ThemesProviderState, ThemesProviderHandler>({
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
