import type { TErrorLayoutProps } from "../../../shared/components/error-layout";

export type TErrorCodes = "404" | "500";
export const errorsData: Record<TErrorCodes, TErrorLayoutProps> = {
  "404": {
    iconName: "error404",
    title: "404",
    description: "Page not found",
    linkText: "Back to chat",
    linkUrl: "#",
  },
  "500": {
    iconName: "error500",
    title: "500",
    description: "Something went wrong! We are already fixing it.",
    linkText: "Back to chat",
    linkUrl: "#",
  },
};
