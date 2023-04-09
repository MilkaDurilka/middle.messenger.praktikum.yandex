import type { Block } from "../../../shared/utils/block";

export const enum EForm {
  email = "email",
  login = "login",
  firstName = "first_name",
  secondName = "second_name",
  displayName = "display_name",
  phone = "phone",
}

export type TProfileFormProps = {
  [EForm.email]: Block;
  [EForm.login]: Block;
  [EForm.firstName]: Block;
  [EForm.secondName]: Block;
  [EForm.displayName]: Block;
  [EForm.phone]: Block;
  linkChangePassword: Block;
  buttonSubmit: Block;
};

export type TProfileForm = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};
