import type { Block } from "../../utils/block";

export type TModalProps = {
  isOpen?: boolean;
  content: Block;
  onClose: () => void;
};
