import { UserApi } from "./api";
import type {
  TUpdateProfileData,
  TChangePasswordData,
  TUpdateAvatarData,
} from "./types";
import { router, ROUTES } from "../../shared/router";
import { store } from "../../shared/utils/store/store";

class UserController {
  private api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  getUserById(id: string | number) {
    return this.api.getUserById(id);
  }

  async updateProfile(data: TUpdateProfileData) {
    try {
      const user = await this.api.updateProfile(data);
      store.set("user.data", user);
    } catch (e) {
      console.error(e);
    }
  }

  async updateAvatar(data: TUpdateAvatarData) {
    try {
      const user = await this.api.updateAvatar(data);
      store.set("user.data", user);
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(data: TChangePasswordData) {
    try {
      await this.api.changePassword(data);
      router.go(ROUTES.profile);
    } catch (e) {
      console.error(e);
    }
  }

  searchByLogin(login: string) {
    return this.api.searchByLogin(login);
  }
}

export const userController = new UserController();
