import type { Button, Link, Input } from "../../shared/components";

export type TChangePasswordProps = {
  title: string;
};

export type TChangePasswordBlockProps = TChangePasswordProps & {
  linkBack: Link;
  buttonLogout: Button;
  inputOldPassword: Input;
  inputNewPassword: Input;
  inputConfirmPassword: Input;
  buttonSubmit: Button;
};
