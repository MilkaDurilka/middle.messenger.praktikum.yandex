import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { ErrorLayout } from "../../shared/components";
import type { TErrorProps, TErrorBlock } from "./types";
import { errorsData } from "./utils/errors-data";

export class ErrorPage extends Block<TErrorBlock> {
  constructor(props: TErrorProps) {
    super({
      errorPage: new ErrorLayout(errorsData[props.errorCode]),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
