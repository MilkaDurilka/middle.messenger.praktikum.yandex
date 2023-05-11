import type { SinonFakeTimers } from "sinon";
import sinon from "sinon";
import { expect } from "chai";
import type { TBlockConstructor } from "../utils/block";
import { router } from "./router";

const routes = {
  login: "/login",
  signup: "/signup",
  home: "/",
};
describe("Router", () => {
  const getContentFake = sinon.fake.returns(document.createElement("div"));
  const dispatchDestroyFake = sinon.fake();
  let timer: SinonFakeTimers | null = null;
  const BlockMock = class {
    getContent = getContentFake;

    dispatchDestroy = dispatchDestroyFake;
  } as unknown as TBlockConstructor;

  const importComponent = () => Promise.resolve({ default: BlockMock });

  beforeEach(() => {
    timer = sinon.useFakeTimers();
    getContentFake.resetHistory();
    dispatchDestroyFake.resetHistory();

    router
      .use(routes.home, importComponent)
      .use(routes.login, importComponent)
      .use(routes.signup, importComponent);
  });

  afterEach(() => {
    router.reset();
    // timer?.reset();
    timer?.restore();
  });

  it("should return current route", () => {
    router.go(routes.login);

    expect(router.getCurrentRoute()?.pathname).equal(routes.login);
  });

  it(".use() should return Router instance", () => {
    const result = router.use("/", importComponent);

    expect(result).to.eq(router);
  });

  it("should render page on .start()", async () => {
    router.start();

    await timer?.nextAsync();

    expect(getContentFake.callCount).to.eq(1);
  });

  it("should render a page on history back action", async () => {
    router.start();
    router.go(routes.login);
    router.go(routes.home);

    expect(router.getCurrentRoute()?.pathname).to.eq(routes.home);

    router.back();
    timer?.runAll();
    expect(router.getCurrentRoute()?.pathname).to.eq(routes.login);
  });

  it("should render a page on history forward action", () => {
    router.start();
    router.go(routes.home);
    router.go(routes.login);
    router.go(routes.signup);

    router.back();
    timer?.runAll();

    router.forward();
    timer?.runAll();

    expect(router.getCurrentRoute()?.pathname).to.eq(routes.signup);
  });
});
