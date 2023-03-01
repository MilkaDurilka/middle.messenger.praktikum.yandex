import { registerPartial } from "../../utils/register-partial";

import template from "./template.hbs";
import * as style from "./style.module.scss";

registerPartial({ name: "errorPage", template, style });
