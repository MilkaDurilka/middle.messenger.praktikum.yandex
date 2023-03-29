import type { Block } from "../../../shared/utils/block";

export const enum EForm {
  oldPassword = "oldPassword",
  newPassword = "newPassword",
  confirmPassword = "confirmPassword",
}

export type TTemplateBlockProps = {
  [EForm.oldPassword]: Block;
  [EForm.newPassword]: Block;
  [EForm.confirmPassword]: Block;
  buttonSubmit: Block;
};

export type TSchema = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
