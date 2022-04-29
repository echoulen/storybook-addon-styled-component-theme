import addons, { makeDecorator, types } from "@storybook/addons";
import * as React from "react";
import {Themes} from "./Themes";

addons.register("storybook/themes", (api) => {
    // Also need to set a unique name to the panel.
    addons.addPanel("storybook/themes/panel", {
        title: "Themes",
        type: types.PANEL,
        render: ({active = false}) => {
            return (<Themes key="storybook-theme-addon" channel={addons.getChannel()} api={api} active={active} />);
        },
    });
});

export default makeDecorator({
    name: "withThemesProvider",
    parameterName: "theme",
    wrapper: (getStory, context) => {
        console.log("hello");
        return getStory(context);
    },
});
