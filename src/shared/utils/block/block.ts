import { v4 as generateUuid } from "uuid";
import type { TBlockProps, TBlockChildren, TStubs } from "./types";
import { EventBus } from "../event-bus";
import { isEqual, deepClone, hasKey } from "../object";

export class Block<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  private EVENTS = {
    INIT: "flow:init",
    MOUNTED: "flow:component-did-mount",
    UPDATED: "flow:component-did-update",
    RENDER: "flow:render",
    DESTROY: "flow:destroy",
  } as const;

  protected element?: HTMLElement;

  private readonly id?: string;

  protected readonly props: TBlockProps<T>;

  protected readonly children: TBlockChildren;

  private readonly eventBus: EventBus;

  constructor(propsAndChildren: TBlockProps<T>) {
    const { children, props } =
      this.separatePropsFromChildren(propsAndChildren);

    this.id = generateUuid();

    this.props = this.makePropsProxy({ ...deepClone(props), __id: this.id });
    this.children = children;

    this.eventBus = new EventBus();
    this.registerEventListener();
    this.eventBus.emit(this.EVENTS.INIT);
  }

  private registerEventListener(): void {
    this.eventBus.on(this.EVENTS.INIT, this.innerInit.bind(this));
    this.eventBus.on(this.EVENTS.MOUNTED, this.innerMounted.bind(this));
    this.eventBus.on(this.EVENTS.UPDATED, this.innerUpdated.bind(this));
    this.eventBus.on(this.EVENTS.RENDER, this.innerRender.bind(this));
    this.eventBus.on(this.EVENTS.DESTROY, this.innerDestroy.bind(this));
  }

  private makePropsProxy(props: T) {
    return new Proxy(props, {
      set: (target: T, name: string, newValue: unknown): boolean => {
        const oldTarget = deepClone(target);
        // eslint-disable-next-line no-param-reassign
        target[name as keyof T] =
          typeof newValue === "function" ? newValue.bind(this) : newValue;
        this.eventBus.emit(this.EVENTS.UPDATED, oldTarget, target);
        return true;
      },
      deleteProperty: (): never => {
        throw new Error("Deletion of property is forbidden");
      },
    });
  }

  setProps(nextProps: Partial<T>): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  init() {}

  private innerInit() {
    this.init();
    this.eventBus.emit(this.EVENTS.RENDER);
  }

  dispatchMounted(): void {
    this.eventBus.emit(this.EVENTS.MOUNTED);
  }

  private innerMounted() {
    this.mounted();

    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((child) => child.dispatchMounted());
      } else {
        value.dispatchMounted();
      }
    });
  }

  mounted() {}

  private innerUpdated(oldProps: T, newProps: T) {
    const response = this.updated(oldProps, newProps);

    if (response) {
      this.eventBus.emit(this.EVENTS.RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(oldProps: T, newProps: T): boolean {
    return !isEqual(oldProps, newProps);
  }

  private innerRender() {
    const block = this.render();
    const element = block.firstElementChild;

    if (!element) {
      throw new Error("The first child of the block is empty");
    }

    this.removeEvents();

    if (this.element && element) {
      this.element.replaceWith(element);
    }

    this.element = element as HTMLElement;

    this.addEvents();
  }

  // @ts-ignore
  render(): DocumentFragment {}

  dispatchDestroy(): void {
    this.eventBus.emit(this.EVENTS.DESTROY);
  }

  private innerDestroy(): void {
    this.beforeDestroy();

    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((child) => child.dispatchDestroy());
      } else {
        value.dispatchDestroy();
      }
    });

    this.removeEvents();
  }

  beforeDestroy(): void {}

  protected compile(template: (props: T) => string, props: TBlockProps<T>) {
    const stubs = this.getStubsForChildren();
    const propsWithStubs: T = { ...props, ...stubs };

    const fragment = this.createDocumentElement("template");
    fragment.innerHTML = template(propsWithStubs);

    Object.values(this.children).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((child) =>
          this.replaceStubWithComponent(fragment, child)
        );
      } else {
        this.replaceStubWithComponent(fragment, value);
      }
    });

    return fragment.content;
  }

  private getStubsForChildren(): TStubs {
    const stubs: TStubs = {};

    Object.entries(this.children).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        stubs[name] = value
          .map((child) => `<div data-id="${child.id}"></div>`)
          .join("");
      } else {
        stubs[name] = `<div data-id="${value.id}"></div>`;
      }
    });
    return stubs;
  }

  private replaceStubWithComponent(
    fragment: HTMLTemplateElement,
    block: Block
  ): void {
    const stubsElements = fragment.content.querySelectorAll(
      `[data-id='${block.id}']`
    );
    const content = block.getContent();
    if (!content) return;

    if (stubsElements.length === 1) {
      stubsElements[0].replaceWith(content);
    } else if (stubsElements.length) {
      stubsElements.forEach((stub) => {
        stub.replaceWith(content.cloneNode(true));
      });
    }
  }

  getContent(): HTMLElement | undefined {
    return this.element;
  }

  private createDocumentElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    if (this.id) {
      element.setAttribute("data-id", this.id);
    }
    return element;
  }

  private addEvents(): void {
    const { events = {} } = this.props;
    const el = this.element;

    if (!el) {
      throw new Error("Element is empty");
    }

    Object.entries(events).forEach(([event, listener]) => {
      el.addEventListener(event, listener);
    });
  }

  private removeEvents(): void {
    const { events = {} } = this.props;
    const el = this.element;

    if (!el) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      el.removeEventListener(event, listener);
    });
  }

  private separatePropsFromChildren(propsAndChildren: T): {
    props: T;
    children: TBlockChildren;
  } {
    const props: TBlockProps = {};
    const children: TBlockChildren = {};

    Object.entries(propsAndChildren).forEach(([name, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) &&
          value.length &&
          value.every((element) => element instanceof Block))
      ) {
        children[name] = value;
      } else {
        props[name] = value;
      }
    });

    return { props: props as T, children };
  }

  getChildren(key: string): Block | null {
    if (!hasKey(this.children, key)) {
      console.log(`Children with name = '${key}' not found!`);
      return null;
    }

    const children = this.children[key];
    return Array.isArray(children) ? null : children;
  }
}
