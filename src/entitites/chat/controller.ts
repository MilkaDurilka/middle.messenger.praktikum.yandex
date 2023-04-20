import { ChatApi } from "./api";
import { store } from "../../shared/utils/store/store";
import { messageController } from "../messages";
import type { TUserData } from "../user";

class ChatController {
  private api: ChatApi;

  constructor() {
    this.api = new ChatApi();
  }

  async read(): Promise<void> {
    try {
      store.set("chats.isLoading", true);
      const chats = await this.api.read();
      store.set("chats.data", chats);
      chats.forEach(({ id }) => this.connectWithChat(id));
    } catch (e) {
      console.log("Can't read chats: ", e);
    }
    store.set("chats.isLoading", false);
  }

  private async connectWithChat(chatId: number): Promise<void> {
    try {
      const token = await this.getToken(chatId);
      await messageController.connect(chatId, token);
    } catch (e) {
      console.log(`Can't connect with chat id=${chatId}: `, e);
    }
  }

  async create(title: string): Promise<void> {
    await this.api.create(title);
    await this.read();
  }

  async delete(chatId: number): Promise<void> {
    await this.api.delete(chatId);
    store.set("selectedChatId", null);
    await this.read();
  }

  async addUsers(chatId: number, usersIds: string[]): Promise<void> {
    await this.api.addUsers(chatId, usersIds);
  }

  async deleteUsers(chatId: number, usersIds: string[]): Promise<void> {
    await this.api.deleteUsers(chatId, usersIds);
  }

  getUsers(chatId: number): Promise<TUserData[]> {
    return this.api.getUsers(chatId);
  }

  getToken(chatId: number): Promise<string> {
    return this.api.getToken(chatId);
  }
}

export const chatController = new ChatController();
