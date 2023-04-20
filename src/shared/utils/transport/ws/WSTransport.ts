import { EventBus } from "../../event-bus";
import { WSTransportStatuses } from "./types";

export class WSTransport extends EventBus {
  private socket: WebSocket | null = null;

  constructor(private url: string) {
    super();
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    return new Promise((resolve) => {
      this.on(WSTransportStatuses.Connected, () => {
        resolve();
        this.setupPing();
      });
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Can't send message because socket is close");
    }
    this.socket.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSTransportStatuses.Connected);
    });

    socket.addEventListener("close", () => {
      this.emit(WSTransportStatuses.Close);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WSTransportStatuses.Error, e);
    });

    socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (!data || (data.type && data.type !== "message")) {
        return;
      }

      this.emit(WSTransportStatuses.Message, data);
    });
  }

  private setupPing() {
    const intervalId = setInterval(() => {
      this.send({
        type: "ping",
      });
    }, 5000);

    this.on(WSTransportStatuses.Close, () => {
      clearInterval(intervalId);
    });
  }
}
