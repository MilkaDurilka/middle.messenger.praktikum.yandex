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
