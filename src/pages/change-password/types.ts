import type { Block } from "../../shared/utils/block";

export type TChangePasswordProps = {
  title: string;
};

export type TChangePasswordBlockProps = TChangePasswordProps & {
  linkBack: Block;
  buttonLogout: Block;
  form: Block;
};
