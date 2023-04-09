import type { Block } from "../../shared/utils/block";

export type TProfileProps = {
  title: string;
};

export type TProfileBlockProps = TProfileProps & {
  linkBack: Block;
  buttonLogout: Block;
  inputAvatar: Block;
  form: Block;
};
