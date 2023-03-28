import type { Block } from "../../shared/utils/block";

export type TLoginProps = {
  title: string;
};

export type TLoginBlockProps = TLoginProps & {
  form: Block;
};
