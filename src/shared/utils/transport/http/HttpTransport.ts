import type { TOptions, TRequest } from "./types";
import { METHOD, queryStringify } from "./utils";
import { isObject } from "../../object";
import { API_URL } from "../../../contstants";

export class HttpTransport {
  static API_URL = API_URL;

  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HttpTransport.API_URL}${endpoint}`;
  }

  private request<Response>(
    url: string,
    options: TOptions = { method: METHOD.GET }
  ): Promise<Response> {
    const { method, data, headers = {} } = options;
    const isFormData = data instanceof FormData;

    const xhr = new XMLHttpRequest();

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    return new Promise((resolve, reject) => {
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(isFormData ? data : JSON.stringify(data));
      }
    });
  }

  get: TRequest = (path = "/", options = {}) => {
    const data = isObject(options.data) ? queryStringify(options.data) : "";
    return this.request(this.endpoint + path + data, {
      ...options,
      method: METHOD.GET,
    });
  };

  post: TRequest = (path, options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHOD.POST });

  put: TRequest = (path, options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHOD.PUT });

  delete: TRequest = (path, options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHOD.DELETE });

  requestWithRetry<Response>(
    path: string,
    options: TOptions & { countRetries: number }
  ): Promise<Response> {
    const { countRetries, ...opt } = options;

    if (Number.isNaN(countRetries) || countRetries < 1) {
      throw new Error("retries not correct");
    }

    return this.request<Response>(this.endpoint + path, opt).catch(() =>
      this.requestWithRetry(this.endpoint + path, {
        ...options,
        countRetries: countRetries - 1,
      })
    );
  }
}
