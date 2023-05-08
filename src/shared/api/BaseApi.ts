import { HttpTransport } from "../utils/transport";

export abstract class BaseApi {
  protected http: HttpTransport;

  protected constructor(endpoint: string) {
    this.http = new HttpTransport(endpoint);
  }
}
