import "./styles/index.scss";
import "../shared/utils/locale";
import { getPageByRoute } from "../shared/router";
import { renderDOM } from "../shared/utils/renderDOM";
import { Layout } from "./layout";

const render = () => {
  const layout = new Layout({ content: getPageByRoute(window.location.hash) });

  renderDOM("#root", layout);
};

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
