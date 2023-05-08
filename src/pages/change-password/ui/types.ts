export const enum EForm {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  confirmPassword = "confirmPassword",
}

export type TSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
