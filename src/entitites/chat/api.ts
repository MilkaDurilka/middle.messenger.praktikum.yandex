import { BaseApi } from "../../shared/api";
import type { TChatData } from "./types";
import type { TUserData } from "../user";

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  read(): Promise<TChatData[]> {
    return this.http.get("/");
  }

  create(title: string): Promise<void> {
    return this.http.post("/", { data: { title } });
  }

  delete(chatId: string | number): Promise<void> {
    return this.http.delete("/", { data: { chatId } });
  }

  addUsers(chatId: number, usersIds: string[]): Promise<void> {
    return this.http.put("/users", { data: { chatId, users: usersIds } });
  }

  deleteUsers(chatId: number, usersIds: string[]): Promise<void> {
    return this.http.delete("/users", { data: { chatId, users: usersIds } });
  }

  getUsers(chatId: number): Promise<TUserData[]> {
    return this.http.get(`/${chatId}/users`);
  }

  async getToken(chatId: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(
      `/token/${chatId}`
    );
    return response.token;
  }
}
