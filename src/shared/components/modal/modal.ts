import template from "./template.hbs";
import * as style from "./style.module.scss";
import { Block } from "../../utils/block";
import { EventBus } from "../../utils/event-bus";
import { Background } from "./ui/background";

class Modal extends Block {
  private MODAL_EVENTS = {
    SHOW: "modal:show",
    HIDE: "modal:hide",
  };

  private readonly modalEventBus: EventBus;

  constructor() {
    super({
      isOpen: false,
      background: new Background({
        events: {
          click: () => {
            this.hide();
          },
        },
      }),
    });
    this.modalEventBus = new EventBus();
    this.registerModalEventListener();
  }

  private registerModalEventListener() {
    this.modalEventBus.on(this.MODAL_EVENTS.SHOW, this.show.bind(this));
    this.modalEventBus.on(this.MODAL_EVENTS.HIDE, this.hide.bind(this));
  }

  show({ title, content }: { title: string; content: Block }): void {
    this.children.content = content;
    this.setProps({ isOpen: true, title });
  }

  hide(): void {
    this.setProps({ isOpen: false });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}

export const modal = new Modal();
