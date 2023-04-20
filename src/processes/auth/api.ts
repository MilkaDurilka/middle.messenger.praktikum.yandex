import type { TSignupData, TSignInData } from "./types";
import type { TUserData } from "../../entitites/user";
import { BaseApi } from "../../shared/api";

export class AuthApi extends BaseApi {
  constructor() {
    super("/auth");
  }

  signup(data: TSignupData) {
    return this.http.post("/signup", { data });
  }

  signIn(data: TSignInData) {
    return this.http.post("/signin", { data });
  }

  logout() {
    return this.http.post("/logout");
  }

  getUser(): Promise<TUserData> {
    return this.http.get<TUserData>("/user");
  }
}
