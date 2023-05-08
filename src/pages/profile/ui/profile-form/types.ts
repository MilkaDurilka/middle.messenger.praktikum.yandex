import type { Block } from "../../../../shared/utils/block";
import type { Input } from "../../../../shared/components";
import type { TUserState } from "../../../../entitites/user/types";

export const enum EForm {
  email = "email",
  login = "login",
  firstName = "first_name",
  secondName = "second_name",
  displayName = "display_name",
  phone = "phone",
}

export type TFormElements = {
  [EForm.email]: Input;
  [EForm.login]: Input;
  [EForm.firstName]: Input;
  [EForm.secondName]: Input;
  [EForm.displayName]: Input;
  [EForm.phone]: Input;
};

export type TProfileFormBlockProps = TFormElements & {
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

export type TProfileFormProps = {
  user: TUserState;
};
