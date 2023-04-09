import template from "./template.hbs";
import { Block } from "../../shared/utils/block";
import { ErrorLayout } from "../../shared/components";
import type { TErrorBlock } from "./types";
import type { TErrorCodes } from "./utils/errors-data";
import { errorsData } from "./utils/errors-data";
import { router } from "../../shared/router";

const isErrorCode = (str: string): str is TErrorCodes => str in errorsData;
export class ErrorPage extends Block<TErrorBlock> {
  constructor() {
    const pathname = router.getCurrentRoute()?.pathname.replace("/", "");
    const errorCode = pathname && isErrorCode(pathname) ? pathname : "404";
    super({
      errorPage: new ErrorLayout(errorsData[errorCode]),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
