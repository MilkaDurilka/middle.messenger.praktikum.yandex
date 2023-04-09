import "./styles/index.scss";
import "../shared/utils/locale";
import { ROUTES, router } from "../shared/router";
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";
import { ChangePasswordPage } from "../pages/change-password";
import { ErrorPage } from "../pages/error";
import { GuidePage } from "../pages/guide";
import { ChatPage } from "../pages/chat";

router
  .use(ROUTES.login, LoginPage)
  .use(ROUTES.signup, SignUpPage)
  .use(ROUTES.profile, ProfilePage)
  .use(ROUTES.changePassword, ChangePasswordPage)
  .use(ROUTES.guide, GuidePage)
  .use(ROUTES.chat, ChatPage)
  .use("/*", ErrorPage, { isExact: false })
  .start();
