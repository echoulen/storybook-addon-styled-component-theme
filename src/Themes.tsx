import {List} from "immutable";
import * as React from "react";
import {branch, compose, lifecycle, renderNothing, withHandlers, withState} from "recompose";
import {Theme} from "./types/Theme";

export interface ThemeProps {
    channel: any;
    api: any;
}

interface ThemeState {
    themes: List<Theme>;
    setThemes: (themes: List<Theme>) => void;
}

interface ThemeHandler {
    onSelectTheme: (theme: Theme) => void;
}

type BaseComponentProps = ThemeProps & ThemeState & ThemeHandler;

const BaseComponent: React.SFC<BaseComponentProps> = ({onSelectTheme, themes}) => (
    <div style={RowStyle}>
        {themes.map((theme, i) => <div style={ButtonStyle} key={i} onClick={() => onSelectTheme(theme)}>{theme.name}</div>).toArray()}
    </div>
);

export const Themes = compose<BaseComponentProps, ThemeProps>(
    withState("themes", "setThemes", List()),
    withHandlers<ThemeProps & ThemeState, ThemeHandler>({
        onSelectTheme: ({channel}) => (theme) => {
            channel.emit("selectTheme", theme);
        },
    }),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
            const {channel, setThemes} = this.props;
            channel.on("setThemes", (themes) => setThemes(List(themes)));
        },
    }),
    branch<BaseComponentProps>(
        ({themes}) => !themes,
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
    borderRadius: "3px",
    color: "#BBB",
    padding: "15px 10px",
    marginRight: "15px",
};
