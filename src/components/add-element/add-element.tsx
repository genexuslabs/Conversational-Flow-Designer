import { Component, h } from "@stencil/core";

@Component({
  tag: "gxcf-add-element",
  styleUrl: "add-element.scss",
  shadow: false
})
export class AddElement {
  render() {
    return <span class="AddElement">+</span>;
  }
}