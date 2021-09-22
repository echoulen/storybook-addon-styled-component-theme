import "jest";

declare const global: any;

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
