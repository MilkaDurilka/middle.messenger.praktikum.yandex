import type { TUserState } from "../../../../entitites/user/types";

export type TInputImg = {
  id: string;
  error?: string;
  disabled?: boolean;
  name: string;
  value?: string;
  onSubmit?: () => void;
  user: TUserState;
};
