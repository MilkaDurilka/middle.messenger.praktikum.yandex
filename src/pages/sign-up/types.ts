import type { Block } from "../../shared/utils/block";

export type TLoginProps = {
  title: string;
};

export type TLoginBlockProps = TLoginProps & {
  inputEmail: Block;
  inputLogin: Block;
  inputFirstName: Block;
  inputSecondName: Block;
  inputPhone: Block;
  inputPassword: Block;
  inputConfirmPassword: Block;
  linkLogIn: Block;
  buttonSubmit: Block;
};
