import { Block } from "../../../../utils/block";
import template from "./template.hbs";
import * as style from "./style.module.scss";

export class Background extends Block {
  render() {
    return this.compile(template, { ...this.props, style });
  }
}
