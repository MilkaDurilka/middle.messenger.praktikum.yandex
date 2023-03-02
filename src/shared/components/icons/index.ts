import { registerPartial } from "../../utils/register-partial";

import error from "./error.hbs";
import error404 from "./404.hbs";
import error500 from "./500.hbs";

registerPartial({ name: "iconError", template: error });
registerPartial({ name: "iconError404", template: error404 });
registerPartial({ name: "iconError500", template: error500 });
