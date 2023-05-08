import { Block } from "../../utils/block";

import type { TIconProps } from "./types";
import { icons as iconsTemplates } from "./icons";

export class Icon extends Block<TIconProps> {
  render() {
    return this.compile(iconsTemplates[this.props.name], { ...this.props });
  }
}
