import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, renderNothing, withHandlers, withState} from "recompose";
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
    <div style={RowStyle}>
        {themes.map((th, i) => {
            const buttonStyle = th === theme ? SelectedButtonStyle : ButtonStyle;
            return <div style={buttonStyle} key={i} onClick={() => onSelectTheme(th)}>{th.name}</div>;
        }).toArray()}
    </div>
);

export const Themes = compose<BaseComponentProps, ThemeProps>(
    withState("theme", "setTheme", null),
    withState("themes", "setThemes", List()),
    withHandlers<ThemeProps & ThemeState, ThemeHandler>({
        onSelectTheme: ({channel, setTheme}) => (theme) => {
            setTheme(theme);
            channel.emit("selectTheme", theme);
        },
        onReceiveThemes: ({setTheme, setThemes, channel}) => (newThemes: Theme[]) => {
            const themes = List(newThemes);
            setThemes(List(themes));
            if (themes.count() > 0) {
                const theme = themes.first();
                setTheme(theme);
                channel.emit("selectTheme", theme);
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
        ({theme, active}) => !theme || !active,
        renderNothing,
    ),
)(BaseComponent);

const RowStyle: React.CSSProperties = {
    display: "flex",
    height: "45px",
    padding: "15px",
};

const ButtonStyle: React.CSSProperties = {
    border: "1px solid #BBB",
    borderRadius: "6px",
    color: "#BBB",
    padding: "13px",
    marginRight: "15px",
    cursor: "pointer",
    // tslint:disable-next-line:max-line-length
    fontFamily: "-apple-system, \".SFNSText-Regular\", \"San Francisco\", BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Lucida Grande\", \"Arial\", sans-serif",
    lineHeight: 1,
};

const SelectedButtonStyle: React.CSSProperties = {
    ...ButtonStyle,
    borderColor: "#666",
    color: "#666",
    fontWeight: "bold",
};
