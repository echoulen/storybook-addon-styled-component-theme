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
    <div>
        <ButtonContainer>
            {themes.map((th, i) => (
                <Button
                    id={`theme-selection-button-${th.name}`}
                    selected={th === theme}
                    themeColor={th.addonOptions?.themeColor}
                    key={i}
                    onClick={() => onSelectTheme(th)}
                >
                    {th.name}
                </Button>
            )).toArray()}
        </ButtonContainer>
    </div>
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

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0 0 8px;
`;

interface ButtonProps {
    selected: boolean;
    themeColor?: string;
}

const Button = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    border: none;
    margin: 0 0;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0;
    padding-right: 8px;
    padding-left: ${props => props.themeColor ? 0 : "8px"};
    width: auto;
    overflow: visible;
    height: 32px;
    border-radius: 4px;
    border: 1px solid ${props => props.selected ? "#bbb" : "#ddd"};
    color: ${props => props.selected ? "#111" : "#444"};
    background-color: ${props => props.selected ? "#ccc" : "#eee"};
    cursor: pointer;
    font-family: -apple-system, SFNSText-Regular, San Francisco, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                Droid Sans, Helvetica Neue, Lucida Grande, Arial, sans-serif;
    font-weight: 600;

    :before {
        margin-right: 8px;
        content: "";
        display: ${props => props.themeColor ? "block" : "none"};
        width: 32px;
        height: 100%;
        background-color: ${props => props.themeColor};
        border-radius: 4px 0 0 4px;
    }
`;
