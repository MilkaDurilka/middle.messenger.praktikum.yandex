import type { TCallback } from "./types";

export class EventBus {
  listeners: Record<string, TCallback[]> = {};

  on(eventName: string, callback: TCallback): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  off(eventName: string, callback: TCallback): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Event "${eventName}" not found `);
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== callback
    );
  }

  emit(eventName: string, ...args: unknown[]): void {
    if (!this.listeners[eventName]) {
      throw new Error(`Event "${eventName}" not found `);
    }

    this.listeners[eventName].forEach((listener) => listener(...args));
  }
}
