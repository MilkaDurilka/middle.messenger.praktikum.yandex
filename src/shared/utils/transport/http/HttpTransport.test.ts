import type {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { useFakeXMLHttpRequest } from "sinon";
import chai, { expect } from "chai";
import ChaiAsPromised from "chai-as-promised";
import { HttpTransport } from "./HttpTransport";
import { queryStringify } from "./utils";
import { API_URL } from "../../../contstants";

const methods = ["get", "post", "put", "delete"] as const;

chai.use(ChaiAsPromised);

describe("HttpTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let instance: HttpTransport;
  const endpoint = "/auth";
  const pathUrl = "/user";

  before(() => {
    xhr = useFakeXMLHttpRequest();
    xhr.onCreate = (req: SinonFakeXMLHttpRequest) => requests.push(req);

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    instance = new HttpTransport(endpoint);
  });

  afterEach(() => {
    requests = [];
  });

  after(() => {
    xhr.restore();
  });

  methods.forEach((method) => {
    it(`.${method}() should send ${method.toUpperCase()} request`, () => {
      instance[method](pathUrl);

      const [request] = requests;

      expect(request.method).equal(method.toUpperCase());
    });

    it(`.${method}() should contain url ${API_URL}, endpoint ${endpoint}, path ${pathUrl}`, () => {
      const url = API_URL + endpoint + pathUrl;
      instance[method](pathUrl);

      const [request] = requests;

      expect(request.url).contain(url);
    });
  });

  it(`.get() should send data in url`, () => {
    const data = { id: "123" };
    instance.get("/user", { data });

    const [request] = requests;

    expect(request.url).contain(queryStringify(data));
  });

  it(".requestWithRetry() should throw Error when countRetries is NaN", () => {
    chai
      .expect(
        // @ts-ignore
        instance.requestWithRetry(pathUrl, { countRetries: "111" })
      )
      .eventually.throw("retries not correct");
  });
});
