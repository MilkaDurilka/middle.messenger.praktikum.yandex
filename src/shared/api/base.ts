import type { TOptions, TRequest } from "./types";
import { METHOD, queryStringify } from "./utils";
import { isObject } from "../utils/object";

class HttpTransport {
  private request(url: string, options: TOptions = { method: METHOD.GET }): Promise<XMLHttpRequest> {
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

  get: TRequest = (url, options = {}) => {
    const data = isObject(options.data) ? queryStringify(options.data) : "";
    return this.request(url + data, { ...options, method: METHOD.GET });
  };

  post: TRequest = (url, options = {}) => this.request(url, { ...options, method: METHOD.POST });

  put: TRequest = (url, options = {}) => this.request(url, { ...options, method: METHOD.PUT });

  delete: TRequest = (url, options = {}) => this.request(url, { ...options, method: METHOD.DELETE });

  requestWithRetry(url: string, options: TOptions & { countRetries: number }): Promise<XMLHttpRequest> {
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
