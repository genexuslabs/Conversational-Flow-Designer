import { Component, h } from "@stencil/core";

@Component({
  tag: "gxcf-addelement",
  styleUrl: "gxcf_addelement.scss",
  shadow: false
})
export class GXCF_AddElement {
  render() {
    return (
        <span class="AddElement">+</span>
    );
  }
}