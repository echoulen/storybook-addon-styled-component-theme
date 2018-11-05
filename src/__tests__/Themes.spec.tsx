import {mount} from "enzyme";
import * as React from "react";
import {stub} from "sinon";
import {Themes} from "../Themes";

describe("Themes spec", () => {
    it("should render proper", () => {
        const channel = {
            on: stub(),
            emit: stub(),
            removeListener: stub(),
        };

        const component = mount(<Themes api={null} channel={channel} active={true} />);
        expect(component.render()).toMatchSnapshot();
        expect(channel.on.calledOnce).toBeTruthy();
        expect(channel.emit.notCalled).toBeTruthy();

        component.unmount();
        expect(channel.removeListener.calledOnce).toBeTruthy();
    });
});
