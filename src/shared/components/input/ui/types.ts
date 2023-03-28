import type { TBlockProps } from "../../../utils/block";

export type TPlainInputProps = {
  id: string;
  disabled?: boolean;
  type?: "text" | "number" | "password";
  name: string;
  placeholder?: string;
  value?: string;
} & Pick<TBlockProps, "events">;
