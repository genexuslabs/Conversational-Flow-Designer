import { Component, Prop, h } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-response",
  styleUrl: "response.scss",
  shadow: false
})
export class Response {
  @Prop() response: ResponseElement;

  render() {
    return <div></div>;
  }
}
