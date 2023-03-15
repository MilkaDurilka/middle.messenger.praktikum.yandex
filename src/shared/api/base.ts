import type { TOptions, TOptionsWithoutMethod } from "./types";
import { METHOD } from "./utils";

class HttpTransport {
  // eslint-disable-next-line class-methods-use-this
  private request(
    url: string,
    options: TOptions = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;
    const xhr = new XMLHttpRequest();

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    return new Promise((resolve, reject) => {
      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }

  get(url: string, options: TOptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: TOptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: TOptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: TOptionsWithoutMethod): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  requestWithRetry(
    url: string,
    options: TOptions & { countRetries: number }
  ): Promise<XMLHttpRequest> {
    const { countRetries, ...opt } = options;

    if (Number.isNaN(countRetries) || countRetries < 1) {
      throw new Error("retries not correct");
    }

    return this.request(url, opt).catch(() =>
      this.requestWithRetry(url, { ...options, countRetries: countRetries - 1 })
    );
  }
}

export const http = new HttpTransport();
