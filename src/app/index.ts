import "./styles/index.scss";
import "../shared/utils/locale";
import { ROUTES, router } from "../shared/router";
import { authController } from "../processes/auth";

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use(
      ROUTES.login,
      () => import(/* webpackChunkName: "login" */ "../pages/login")
    )
    .use(
      ROUTES.signup,
      () => import(/* webpackChunkName: "sign-up" */ "../pages/sign-up")
    )
    .use(
      ROUTES.profile,
      () => import(/* webpackChunkName: "profile" */ "../pages/profile")
    )
    .use(
      ROUTES.changePassword,
      () =>
        import(
          /* webpackChunkName: "change-password" */ "../pages/change-password"
        )
    )
    .use(
      ROUTES.guide,
      () => import(/* webpackChunkName: "guide" */ "../pages/guide")
    )
    .use(
      ROUTES.chat,
      () => import(/* webpackChunkName: "chat" */ "../pages/chat")
    )
    .use("/*", () => import(/* webpackChunkName: "error" */ "../pages/error"), {
      isExact: false,
    });

  let isPrivateRoute;

  switch (window.location.pathname) {
    case ROUTES.login:
    case ROUTES.signup:
      isPrivateRoute = false;
      break;
    default:
      isPrivateRoute = true;
  }

  try {
    await authController.getUser();

    router.start();
    if (!isPrivateRoute) {
      router.go(ROUTES.profile);
    }
  } catch (e) {
    router.start();
    if (isPrivateRoute) {
      router.go(ROUTES.login);
    }
  }
});
