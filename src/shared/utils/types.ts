import Handlebars = require("handlebars");

export type TRegisterPartial = {
  name: string;
  template: Handlebars.TemplateDelegate<Record<string, unknown>>;
  style?: Record<string, unknown>;
};
