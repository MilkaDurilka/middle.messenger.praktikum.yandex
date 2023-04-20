import { BaseApi } from "../../shared/api";
import type {
  TUserData,
  TUpdateAvatarData,
  TUpdateProfileData,
  TChangePasswordData,
} from "./types";

export class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  getUserById(id: string | number): Promise<TUserData> {
    return this.http.get<TUserData>("/", { data: { id } });
  }

  updateProfile(data: TUpdateProfileData): Promise<TUserData> {
    return this.http.put("/profile", { data });
  }

  updateAvatar(data: TUpdateAvatarData): Promise<TUserData> {
    return this.http.put("/profile/avatar", { data });
  }

  changePassword(data: TChangePasswordData): Promise<void> {
    return this.http.put("/password", { data });
  }

  searchByLogin(login: string): Promise<TUserData[]> {
    return this.http.post("/search", { data: { login } });
  }
}
