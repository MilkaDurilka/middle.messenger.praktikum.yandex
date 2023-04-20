import { AuthApi } from "./api";
import type { TSignupData, TSignInData } from "./types";
import { router, ROUTES } from "../../shared/router";
import { store } from "../../shared/utils/store/store";
import { messageController } from "../../entitites/messages";

export class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: TSignupData) {
    try {
      await this.api.signup(data);
      await this.getUser();
      router.go(ROUTES.profile);
    } catch (e) {
      console.error(e);
    }
  }

  async signIn(data: TSignInData) {
    try {
      await this.api.signIn(data);
      await this.getUser();
      router.go(ROUTES.profile);
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      messageController.closeAll();
      router.go(ROUTES.login);
    } catch (e) {
      console.error(e);
    }
  }

  async getUser() {
    store.set("user.isLoading", true);
    const user = await this.api.getUser();
    store.set("user.data", user);
    store.set("user.isLoading", false);
  }
}

export const authController = new AuthController();
