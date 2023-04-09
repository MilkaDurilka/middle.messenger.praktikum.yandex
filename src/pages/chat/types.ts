import type { Block } from "../../shared/utils/block";

export type TChatBlockProps = {
  linkProfile: Block;
  inputSearch: Block;
  chatItem: Block;
  chatHeader: Block;
  chatBody: Block;
  chatFooter: Block;
};

export type TAuthorMessage = {
  id: string;
  name: string;
};

export type TMessage = {
  date: Date;
  author: TAuthorMessage;
  text: string;
};

export type TMessageBlock = {
  date: Date;
  messages: TMessage[];
};
