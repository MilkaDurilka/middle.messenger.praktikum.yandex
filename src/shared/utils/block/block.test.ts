// eslint-disable-next-line max-classes-per-file
import type { SinonFakeTimers } from "sinon";
import sinon from "sinon";
import proxyquire from "proxyquire";
import { expect } from "chai";
import type { Block as BlockType } from "./block";
import { Block } from "./block";

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { Block: BlockWithEventBusMock } = proxyquire("./Block", {
  "../event-bus": {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { Block: typeof BlockType };
describe("Block", () => {
  let timers: SinonFakeTimers | null = null;
  const fakeMethods = {
    render: sinon.fake(),
    init: sinon.fake(),
    mounted: sinon.fake(),
    updated: sinon.fake(),
    beforeDestroy: sinon.fake(),
  };

  const fragment = new DocumentFragment();
  const div = document.createElement("div");
  div.textContent = "Test";
  fragment.append(div);

  beforeEach(() => {
    timers = sinon.useFakeTimers();
  });

  afterEach(() => {
    timers?.restore();
    Object.values(fakeMethods).forEach((fakeMethod) => {
      fakeMethod.resetHistory();
    });
  });

  describe("with mock EventBus", () => {
    class MockEventBusComponent extends BlockWithEventBusMock {}

    it("should fire init event on initialization", () => {
      // eslint-disable-next-line no-new
      new MockEventBusComponent({});

      expect(eventBusMock.emit.calledWith("flow:init")).equal(true);
    });
    it("should fire mounted event on call dispatchMounted", () => {
      const cmp = new MockEventBusComponent({});
      cmp.dispatchMounted();
      expect(eventBusMock.emit.calledWith("flow:component-did-mount")).equal(
        true
      );
    });
    it("should fire updated event on set props", () => {
      const cmp = new MockEventBusComponent({ test: 123 });
      cmp.setProps({ test: 321 });
      expect(eventBusMock.emit.calledWith("flow:component-did-update")).equal(
        true
      );
    });

    it("should fire destroy event on call dispatchDestroy", () => {
      const cmp = new MockEventBusComponent({});
      cmp.dispatchDestroy();
      expect(eventBusMock.emit.calledWith("flow:destroy")).equal(true);
    });
    it("should set props", () => {
      const newPropsValue = 321;
      const cmp = new MockEventBusComponent({ test: 123 });
      cmp.setProps({ test: newPropsValue });
      // @ts-ignore
      expect(cmp.props.test).equal(newPropsValue);
    });

    it("should get children by name if exist", () => {
      const childKey = "childKey";
      const child = new MockEventBusComponent({});
      const cmp = new MockEventBusComponent({ [childKey]: child });
      const res = cmp.getChildren(childKey);
      expect(res).equal(child);
    });

    it("should return null if getting children by name that doesn't exist", () => {
      const childKey = "childKey";
      const cmp = new MockEventBusComponent({});
      const res = cmp.getChildren(childKey);
      expect(res).equal(null);
    });
  });
  class MockComponent extends Block {
    init() {
      fakeMethods.init();
    }

    mounted = fakeMethods.mounted;

    // @ts-ignore
    updated(oldProps, newProps) {
      fakeMethods.updated();
      return super.updated(oldProps, newProps);
    }

    beforeDestroy = fakeMethods.beforeDestroy;

    render() {
      fakeMethods.render();
      return fragment;
    }
  }

  it("should run render method after init", () => {
    // eslint-disable-next-line no-new
    new MockComponent({});

    expect(fakeMethods.render.calledOnce).equal(true);
  });
  it("should run render event after updated props", () => {
    const cmp = new MockComponent({ test: 123 });
    fakeMethods.render.resetHistory();
    cmp.setProps({ test: 321 });
    expect(fakeMethods.render.calledOnce).equal(true);
  });
  it("should run init method on initialization", () => {
    // eslint-disable-next-line no-new
    new MockComponent({});

    expect(fakeMethods.init.calledOnce).equal(true);
  });
  it("should run mounted method on dispatchMounted", () => {
    const cmp = new MockComponent({});
    cmp.dispatchMounted();
    expect(fakeMethods.mounted.calledOnce).equal(true);
  });
  it("should run updated method on set props", () => {
    const cmp = new MockComponent({ test: 123 });
    cmp.setProps({ test: 321 });
    expect(fakeMethods.updated.calledOnce).equal(true);
  });
  it("should run beforeDestroy method after dispatchDestroy", () => {
    const cmp = new MockComponent({});
    cmp.dispatchDestroy();
    expect(fakeMethods.beforeDestroy.calledOnce).equal(true);
  });

  it("should replace result of render method in element", () => {
    const cmp = new MockComponent({});
    expect(cmp.getContent()).equal(fragment.firstElementChild);
  });

  describe("check use result of updated to determine if rendering is needed", () => {
    let result: boolean;
    class MockComponent2 extends Block {
      updated(): boolean {
        return result;
      }

      render(): DocumentFragment {
        fakeMethods.render();
        return fragment;
      }
    }

    it("updated is default with same props", () => {
      const cmp = new MockComponent({ test: 123 });
      fakeMethods.render.resetHistory();
      cmp.setProps({ test: 123 });
      expect(fakeMethods.render.callCount).equal(0);
    });

    it("updated is default with changed props", () => {
      const cmp = new MockComponent({ test: 123 });
      fakeMethods.render.resetHistory();
      cmp.setProps({ test: 321 });
      expect(fakeMethods.render.callCount).equal(1);
    });

    it("should not start rendering if updated return false", () => {
      result = false;
      const cmp = new MockComponent2({ test: 123 });
      fakeMethods.render.resetHistory();
      cmp.setProps({ test: 321 });
      expect(fakeMethods.render.callCount).equal(0);
    });

    it("should start rendering if updated return true", () => {
      result = true;
      const cmp = new MockComponent2({ test: 123 });
      fakeMethods.render.resetHistory();
      cmp.setProps({ test: 321 });
      expect(fakeMethods.render.callCount).equal(1);
    });
  });
});
