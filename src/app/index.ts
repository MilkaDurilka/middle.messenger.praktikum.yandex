import "../shared/components";
import "./styles/index.scss";
import template from "./index.hbs";
import { ROUTES, getTemplateByRoute } from "../shared/router";

const navs = Object.entries(ROUTES).map(([name, path]) => ({ name, path }));

const render = () => {
  const app = document.getElementById("root");

  app.innerHTML = template({
    content: getTemplateByRoute(window.location.hash),
    navs,
  });
};

window.addEventListener("DOMContentLoaded", render);
window.addEventListener("hashchange", render);
