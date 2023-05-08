import { EventBus } from "../event-bus";
import { set } from "../object";
import type { TState } from "./types";
import { StoreEvents } from "./constants";

const initialState: TState = {
  user: {
    isLoading: false,
  },
  chats: {
    data: [],
    isLoading: false,
  },
  messages: {},
};

class Store extends EventBus {
  private state: TState = initialState;

  set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  getState() {
    return this.state;
  }
}

export const store = new Store();
