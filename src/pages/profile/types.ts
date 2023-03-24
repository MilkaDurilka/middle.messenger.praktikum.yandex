import type { Block } from "../../shared/utils/block";

export type TProfileProps = {
  title: string;
};

export type TProfileBlockProps = TProfileProps & {
  linkBack: Block;
  buttonLogout: Block;
  inputAvatar: Block;
  inputEmail: Block;
  inputLogin: Block;
  inputFirstName: Block;
  inputSecondName: Block;
  inputNickname: Block;
  inputPhone: Block;
  linkChangePassword: Block;
  buttonSubmit: Block;
};
