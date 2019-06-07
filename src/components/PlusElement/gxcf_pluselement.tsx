import { Component, h } from "@stencil/core";

@Component({
  tag: "gxcf-pluselement",
  styleUrl: "gxcf_pluselement.scss",
  shadow: false
})
export class GXCF_PlusElement {
  render() {
    return (
        <span class="PlusFlowElement">+</span>
    );
  }
}