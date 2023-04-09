import type * as Handlebars from "handlebars";

export type TRegisterPartial = {
  name: string;
  template: Handlebars.TemplateDelegate<Record<string, unknown>>;
  style?: Record<string, unknown>;
};
