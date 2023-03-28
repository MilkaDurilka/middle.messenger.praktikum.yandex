import type { Block } from "../../../shared/utils/block";

export type TChangePasswordFormProps = {
  inputOldPassword: Block;
  inputNewPassword: Block;
  inputConfirmPassword: Block;
  buttonSubmit: Block;
};
