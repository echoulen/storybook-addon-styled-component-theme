import * as React from "react";
import {stub} from "sinon";
import {Themes} from "../Themes";
import {create} from "react-test-renderer";

describe("Themes spec", () => {
    it("should render proper", () => {
        const channel = {
            on: stub(),
            emit: stub(),
            removeListener: stub(),
        };

        const component = create(<Themes api={null} channel={channel} active={true} />);
        expect(component.toJSON()).toMatchSnapshot();
        expect(channel.on.calledOnce).toBeTruthy();
        expect(channel.emit.notCalled).toBeTruthy();

        component.unmount();
        expect(channel.removeListener.calledOnce).toBeTruthy();
    });
});
