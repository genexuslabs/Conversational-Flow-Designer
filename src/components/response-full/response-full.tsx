import { Component, Prop, h } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-response-full",
  styleUrl: "response-full.scss",
  shadow: false
})
export class FullResponse {
  @Prop() response: ResponseElement;

  render() {
    return <div></div>;
  }
}
