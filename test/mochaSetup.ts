import Handlebars from "handlebars";
import { JSDOM } from "jsdom";
import fs from "fs";
import { firePopstateOnRoute } from "./utils";

const { window } = new JSDOM('<div id="root"></div>', {
  url: "http://localhost:3000",
});

firePopstateOnRoute(window);

// @ts-ignore
global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions[".hbs"] = (module, filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  // eslint-disable-next-line no-param-reassign
  module.exports = Handlebars.compile(content);
};

require.extensions[".scss"] = (module) => {
  // eslint-disable-next-line no-param-reassign
  module.exports = {};
};
