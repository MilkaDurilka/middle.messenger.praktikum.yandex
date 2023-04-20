import { WSTransport, WSTransportStatuses } from "../../shared/utils/transport";
import { store } from "../../shared/utils/store/store";
import type { TMessage } from "./types";

class MessageController {
  private sockets: Map<number, WSTransport> = new Map();

  public async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState().user.data?.id;

    if (!userId) {
      throw new Error("User id not defined");
    }

    // TODO: вынести в апи работу с сокетом
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    const transport = new WSTransport(url);

    this.sockets.set(chatId, transport);

    await transport.connect();
    this.subscribe(transport, chatId);
    this.getOldMessage(transport);
  }

  // TODO: Добавить пагинацию
  private getOldMessage(transport: WSTransport) {
    transport.send({
      type: "get old",
      content: "0",
    });
  }

  public sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Socket with id=${chatId} not defined`);
    }

    socket.send({
      type: "message",
      content: message,
    });
  }

  private onMessage(chatId: number, messages: TMessage | TMessage[]) {
    const messageToAdd: TMessage[] = Array.isArray(messages)
      ? messages.reverse()
      : [messages];

    const currentMessages = store.getState().messages[chatId] || [];

    store.set(`messages.${chatId}`, [...currentMessages, ...messageToAdd]);
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  public closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSTransportStatuses.Message, (data) => {
      this.onMessage(chatId, data);
    });
    transport.on(WSTransportStatuses.Close, () => {
      this.onClose(chatId);
    });
  }
}

export const messageController = new MessageController();
