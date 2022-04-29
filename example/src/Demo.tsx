import React from "react";
import {createUseStyles, useTheme} from "react-jss";

export const defaultTheme = {
    name: "DEFAULT",
    backgroundColor: "white",
    textColor: "dimgrey",
    borderRadius: "30px",
};

export const darkTheme = {
    name: "DARK",
    backgroundColor: "black",
    textColor: "seashell",
    borderRadius: "100px",
};

type ThemeType = keyof typeof defaultTheme;

const useStyles = createUseStyles<string, any, ThemeType>({

    content: ({theme}) => ({
        width: "200px",
        lineHeight: "200px",
        textAlign: "center",
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        border: "1px solid dimgrey",
        borderRadius: theme.borderRadius,
    }),
});

// @ts-ignore
const Content = ({children}): React.ReactElement => {

    const theme = useTheme<ThemeType>();
    const classes = useStyles({theme});

    return (
        <div className={classes.content}>
            {children}
        </div>
    );
};

export const Demo = () => (
    <Content>Demo</Content>
);
