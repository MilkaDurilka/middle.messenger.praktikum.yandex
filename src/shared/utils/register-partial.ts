import Handlebars from "handlebars/dist/handlebars.runtime";
import { TRegisterPartial } from "./types";

export const registerPartial = ({ name, template, style }: TRegisterPartial): void => {
  Handlebars.registerPartial(name, (params, options) =>
    template.apply(null, [{ ...params, style }, options])
  );
};
