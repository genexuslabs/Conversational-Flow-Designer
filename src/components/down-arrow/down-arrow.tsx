import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-down-arrow",
  styleUrl: "down-arrow.scss",
  shadow: true
})
export class DownArrow {
  @Prop() arrowid: string;

  render() {
    return <div id={this.arrowid} class="DownArrow"></div>;
  }
}
