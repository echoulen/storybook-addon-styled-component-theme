import React, {FunctionComponent, ReactNode} from "react";
import {List} from "immutable";
import {branch, compose, lifecycle, renderNothing, withHandlers, withState} from "recompose";
import {Theme} from "./types/Theme";
import {createUseStyles} from "react-jss";

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

const BaseComponent: FunctionComponent<BaseComponentProps> = ({onSelectTheme, themes, theme}) => (
    <div style={{display: "flex", padding: "10px", boxSizing: "border-box"}}>
        {themes.map((th, i) => (
            <Button
                id={`theme-selection-button-fi-${th.name}`}
                selected={th === theme}
                key={i}
                onClick={() => onSelectTheme(th)}>
                {th.name}
            </Button>
        )).toArray()}
        <div style={{flex: "1"}}/>
        <div style={{fontSize: "0"}}/>
        |
        <div style={{fontSize: "0"}}/>
    </div>
);

export const Themes: React.FunctionComponent<ThemeProps> = compose<BaseComponentProps, ThemeProps>(
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
)(BaseComponent) as any;

interface ButtonProps {
    id: string;
    children?: ReactNode;
    selected: boolean;
    onClick: () => void;
}

const useStyles = createUseStyles<any, ButtonProps>({
    button: ({...props}) => ({
        border: "1px solid #BBB",
        borderRadius: "6px",
        color: props.selected ? "#FFF" : "#3d3d3d",
        padding: "13px",
        marginRight: "15px",
        height: "55px",
        cursor: "pointer",
        fontFamily: "-apple-system, .SFNSText-Regular, San Francisco, Roboto, Oxygen, Ubuntu, Arial, sans-serif",
        lineHeight: "25px",
        fontWeight: props.selected ? "bold" : "normal",
        backgroundColor: props.selected ? "#333" : "#FFF",
        whiteSpace: "nowrap",
    }),
});

const Button = ({children, ...props}: ButtonProps): React.ReactElement => {

    const classes = useStyles({...props});

    return (
        <div className={classes.button} id={props.id} onClick={props.onClick}>
            {children}
        </div>
    );
};
