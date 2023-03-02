import Handlebars from "handlebars/dist/handlebars.runtime";
import { ROUTES } from "./constants";
import login from "../../pages/login/index.hbs";
import signup from "../../pages/sign-up/index.hbs";
import profile from "../../pages/profile/index.hbs";
import changePassword from "../../pages/change-password/index.hbs";
import page404 from "../../pages/errors/404.hbs";
import page500 from "../../pages/errors/500.hbs";
import guide from "../../pages/guide/index.hbs";

export function getTemplateByRoute(
  route: string
): Handlebars.TemplateDelegate<Record<string, unknown>> {
  switch (route) {
    case ROUTES.home:
    case ROUTES.login:
      return login;
    case ROUTES.signup:
      return signup;
    case ROUTES.profile:
      return profile;
    case ROUTES.changePassword:
      return changePassword;
    case ROUTES.page404:
      return page404;
    case ROUTES.page500:
      return page500;
    case ROUTES.guide:
      return guide;
    default:
      return page404;
  }
}
