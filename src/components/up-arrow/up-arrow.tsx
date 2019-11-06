import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-up-arrow",
  styleUrl: "up-arrow.scss",
  shadow: false
})
export class UpArrow {
  @Prop() arrowid: string;

  render() {
    return <div id={this.arrowid} class="UpArrow"></div>;
  }
}
