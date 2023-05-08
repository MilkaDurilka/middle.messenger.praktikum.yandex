import template from "./template.hbs";
import { Block } from "../../../../shared/utils/block";
import type { TChatHeaderBlock, TChatHeaderProps } from "./types";
import * as style from "./style.module.scss";
import { Avatar, Dropdown, modal } from "../../../../shared/components";
import { chatController } from "../../../../entitites/chat";
import { AddUserModal } from "../modal/add-user-modal";
import { DeleteUserModal } from "../modal/delete-user-modal";

export class ChatHeader extends Block<TChatHeaderBlock> {
  constructor(props: TChatHeaderProps) {
    super({
      ...props,
      avatar: new Avatar({ src: props.avatar }),
      title: props.title,
      menu: new Dropdown({
        icon: "menuPoints",
        content: [
          {
            text: "Add user to chat",
            onClick: () => {
              modal.show({
                title: "Add user to chat",
                content: new AddUserModal({ chatId: this.props.chatId }),
              });
            },
          },
          {
            text: "Delete user from chat",
            onClick: () => {
              modal.show({
                title: "Delete user to chat",
                content: new DeleteUserModal({ chatId: this.props.chatId }),
              });
            },
          },
          {
            text: "Delete chat",
            onClick: () => {
              // TODO: Добавить подтверждение действия перед удалением
              chatController.delete(this.props.chatId);
            },
          },
        ],
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props, style });
  }
}
