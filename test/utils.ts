import type { DOMWindow } from "jsdom";

export const firePopstateOnRoute = (win: DOMWindow): void => {
  const { history, PopStateEvent } = win;
  const originalBack = history.back;
  const originalForwards = history.forward;

  // eslint-disable-next-line no-proto
  (history as unknown as { __proto__: History }).__proto__.back =
    function patchedBack(
      this: History,
      ...args: Parameters<History["back"]>
    ): void {
      originalBack.apply(this, args);
      win.dispatchEvent(new PopStateEvent("popstate"));
    };

  // eslint-disable-next-line no-proto
  (history as unknown as { __proto__: History }).__proto__.forward =
    function patchedForward(
      this: History,
      ...args: Parameters<History["forward"]>
    ): void {
      originalForwards.apply(this, args);

      win.dispatchEvent(new PopStateEvent("popstate"));
    };
};
