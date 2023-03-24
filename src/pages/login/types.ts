import type { Block } from "../../shared/utils/block";

export type TLoginProps = {
  title: string;
};

export type TLoginBlockProps = TLoginProps & {
  inputLogin: Block;
  inputPassword: Block;
  linkSignUp: Block;
  buttonSubmit: Block;
};
