import type { Block } from "../../../shared/utils/block";

export const enum EForm {
  login = "login",
  password = "password",
}

export type TLoginFormBlock = {
  [EForm.login]: Block;
  [EForm.password]: Block;
  linkSignUp: Block;
  buttonSubmit: Block;
};

export type TLoginForm = {
  login: string;
  password: string;
};
