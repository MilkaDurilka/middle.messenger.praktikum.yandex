import type { Block } from "../../../shared/utils/block";

export const enum EForm {
  email = "email",
  login = "login",
  firstName = "first_name",
  secondName = "second_name",
  phone = "phone",
  password = "password",
  confirmPassword = "confirm_password",
}

export type TSignUpForm = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  confirm_password: string;
};

export type TSignUpFormProps = {
  [EForm.email]: Block;
  [EForm.login]: Block;
  [EForm.firstName]: Block;
  [EForm.secondName]: Block;
  [EForm.phone]: Block;
  [EForm.password]: Block;
  [EForm.confirmPassword]: Block;
  linkLogIn: Block;
  buttonSubmit: Block;
};
