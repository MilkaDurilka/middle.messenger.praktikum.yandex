import { v4 as generateUuid } from "uuid";
import type { TBlockProps, TBlockChildren } from "./types";
import { EventBus } from "../event-bus";

export abstract class Block<T extends TBlockProps = TBlockProps> {
  private EVENTS = {
    INIT: "flow:init",
    MOUNTED: "flow:component-did-mount",
    UPDATED: "flow:component-did-update",
    RENDER: "flow:render",
  } as const;

  private element?: HTMLElement;

  private readonly id?: string;

  protected readonly props: T & { __id?: string };

  protected readonly children: TBlockChildren;

  private readonly eventBus: EventBus;

  protected constructor(propsAndChildren: T) {
    const { children, props } = this.separatePropsFromChildren(propsAndChildren);

    if (props.settings?.withInternalId) {
      this.id = generateUuid();
    }

    this.props = this.makePropsProxy({ ...props, __id: this.id });
    this.children = children;

    this.eventBus = new EventBus();
    this.registerEventListener();
    this.eventBus.emit(this.EVENTS.INIT);
  }

  makePropsProxy(props: T) {
    return new Proxy(props, {
      set: (target: T, name: string, newValue: unknown): boolean => {
        // eslint-disable-next-line no-param-reassign
        target[name as keyof T] = typeof newValue === "function" ? newValue.bind(this) : newValue;
        this.eventBus.emit(this.EVENTS.UPDATED);
        return true;
      },
      deleteProperty: (): never => {
        throw new Error("Deletion of property is forbidden");
      },
    });
  }

  setProps(nextProps: T): void {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  registerEventListener(): void {
    this.eventBus.on(this.EVENTS.INIT, this.innerInit.bind(this));
    this.eventBus.on(this.EVENTS.MOUNTED, this.innerMounted.bind(this));
    this.eventBus.on(this.EVENTS.UPDATED, this.innerUpdated.bind(this));
    this.eventBus.on(this.EVENTS.RENDER, this.innerRender.bind(this));
  }

  private innerInit() {
    // this.createResources();
    this.eventBus.emit(this.EVENTS.RENDER);
  }

  dispatchMounted(): void {
    this.eventBus.emit(this.EVENTS.MOUNTED);
  }

  private innerMounted() {
    this.mounted();

    Object.values(this.children).forEach((child) => child.dispatchMounted());
  }

  mounted() {}

  private innerUpdated(oldProps: T, newProps: T) {
    const response = this.updated(oldProps, newProps);

    if (response) {
      this.eventBus.emit(this.EVENTS.RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(_oldProps: T, _newProps: T): boolean {
    return true;
  }

  private innerRender() {
    const block = this.render();
    const element = block.firstElementChild;

    if (!element) {
      throw new Error("The first child of the block is empty");
    }

    this.removeEvents();

    if (!this.element) {
      this.element = element as HTMLElement;
    } else {
      this.element.replaceWith(element);
    }

    this.addEvents();
  }

  abstract render(): DocumentFragment;

  protected compile(template: (props: TBlockProps) => string, props: TBlockProps) {
    const stubs: Record<string, string> = {};

    Object.entries(this.children).forEach(([name, child]) => {
      stubs[name] = `<div data-id="${child.id}"></div>`;
    });

    const propsWithStubs: TBlockProps = { ...props, ...stubs };

    const fragment = this.createDocumentElement("template");
    fragment.innerHTML = template(propsWithStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id='${child.id}']`);
      const content = child.getContent();
      if (stub && content) {
        stub.replaceWith(content);
      }
    });

    return fragment.content;
  }

  getContent(): HTMLElement | undefined {
    return this.element;
  }

  createDocumentElement<K extends keyof HTMLElementTagNameMap>(
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
      if (value instanceof Block) {
        children[name] = value;
      } else {
        props[name] = value;
      }
    });

    return { props: props as T, children };
  }
}
