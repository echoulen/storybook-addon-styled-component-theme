import "jest";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

declare const global: any;

configure({adapter: new Adapter()});
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

const matchMedia = () => {
  return {
    matches: false,
    addListener: null,
    removeListener: null,
  };
};

global.matchMedia = global.matchMedia || matchMedia;
