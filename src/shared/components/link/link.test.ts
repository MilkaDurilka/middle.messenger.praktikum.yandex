import { expect } from "chai";
import sinon from "sinon";
import { Link } from "./link";
import { router } from "../../router";

describe("Link", () => {
  it("should render", () => {
    // eslint-disable-next-line no-new
    new Link({ text: "textLink", to: "/" });
  });

  it("should return <a/>", () => {
    const link = new Link({ text: "textLink", to: "/" });
    const element = link.getContent();

    expect(element).instanceof(window.HTMLAnchorElement);
  });

  it("should navigate to the passed route on click", () => {
    const to = "/";
    const link = new Link({ text: "textLink", to });
    // @ts-ignore
    const spy = sinon.spy(router, "go");

    const element = link.getContent();

    element?.click();

    expect(spy.calledOnceWith(to)).to.equal(true);
  });

  it("should contain text", () => {
    const text = "textLink";
    const link = new Link({ text, to: "/" });
    const element = link.getContent();

    expect(element?.textContent).to.contain(text);
  });
});
