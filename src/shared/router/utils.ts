import { ROUTES } from "./constants";
import { LoginPage } from "../../pages/login";
import { SignUpPage } from "../../pages/sign-up";
import { ProfilePage } from "../../pages/profile";
import { ChangePasswordPage } from "../../pages/change-password";
import { ErrorPage } from "../../pages/error";
import { GuidePage } from "../../pages/guide";
import { ChatPage } from "../../pages/chat";
import type { Block } from "../utils/block";

export function getPageByRoute(route: string): Block {
  switch (route) {
    case ROUTES.home:
    case ROUTES.login:
      return new LoginPage({ title: "Log in" });
    case ROUTES.signup:
      return new SignUpPage({ title: "Sign up" });
    case ROUTES.profile:
      return new ProfilePage({ title: "Profile" });
    case ROUTES.changePassword:
      return new ChangePasswordPage({ title: "Change password" });
    case ROUTES.page404:
      return new ErrorPage({ errorCode: "404" });
    case ROUTES.page500:
      return new ErrorPage({ errorCode: "500" });
    case ROUTES.guide:
      return new GuidePage();
    case ROUTES.chat:
      return new ChatPage();
    default:
      return new ErrorPage({ errorCode: "404" });
  }
}
