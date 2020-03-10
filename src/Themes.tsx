import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, renderNothing, withHandlers, withState} from "recompose";
import styled from "styled-components";
import {Theme} from "./types/Theme";

export interface ThemeProps {
    channel: any;
    api: any;
    active: boolean;
}

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themes: List<Theme>;
    setThemes: (themes: List<Theme>) => void;
}

interface ThemeHandler {
    onSelectTheme: (theme: Theme) => void;
    onReceiveThemes: (theme: Theme[]) => void;
}

type BaseComponentProps = ThemeProps & ThemeState & ThemeHandler;

const BaseComponent: React.SFC<BaseComponentProps> = ({onSelectTheme, themes, theme}) => (
    <FlexRow>
        {themes.map((th, i) => (
            <Button
                id={`theme-selection-button-${th.name}`}
                selected={th === theme}
                key={i}
                onClick={() => onSelectTheme(th)}>
                {th.name}
            </Button>
        )).toArray()}
        <FillingDiv />
        <Border>|</Border>
    </FlexRow>
);

export const Themes = compose<BaseComponentProps, ThemeProps>(
    withState("theme", "setTheme", null),
    withState("themes", "setThemes", List()),
    withHandlers<ThemeProps & ThemeState, ThemeHandler>({
        onSelectTheme: ({channel, setTheme}) => (theme) => {
            setTheme(theme);
            channel.emit("selectTheme", theme.name);
        },
        onReceiveThemes: ({setTheme, setThemes, channel}) => (newThemes: Theme[]) => {
            const themes = List(newThemes);
            setThemes(List(themes));
            if (themes.count() > 0) {
                const theme = themes.first();
                setTheme(theme);
                channel.emit("selectTheme", theme.name);
            }
        },
    }),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
            const {channel, onReceiveThemes} = this.props;
            channel.on("setThemes", onReceiveThemes);
        },
        componentWillUnmount() {
            const {channel, onReceiveThemes} = this.props;
            channel.removeListener("setThemes", onReceiveThemes);
        },
    }),
    branch<BaseComponentProps>(
        ({active}) => !active,
        renderNothing,
    ),
)(BaseComponent);

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
`;

const FillingDiv = styled.div`
    flex: 1;
`;

// fix the selection not disappear at first time
const Border = styled.div`
    font-size: 0;
`;

interface ButtonProps {
    selected: boolean;
}

const Button = styled.div`
    border: 1px solid #BBB;
    border-radius: 6px;
    color: ${(props: ButtonProps) => props.selected ? "white" : "#BBB"};
    padding: 13px;
    margin-right: 15px;
    height: 55px;
    cursor: pointer;
    font-family: -apple-system, .SFNSText-Regular, San Francisco, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                Droid Sans, Helvetica Neue, Lucida Grande, Arial, sans-serif;
    line-height: 25px;
    font-weight: ${(props: ButtonProps) => props.selected ? "bold" : "normal"};
    background-color: ${(props: ButtonProps) => props.selected ? "#333" : "None"};
    white-space: nowrap;
`;
