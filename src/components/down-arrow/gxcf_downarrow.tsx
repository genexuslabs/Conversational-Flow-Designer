import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-downarrow",
  styleUrl: "gxcf_downarrow.scss",
  shadow: false
})
export class DownArrow {
  @Prop() arrowid: string;

  render() {
    return <p id={this.arrowid} class="DownArrow"></p>;
  }
}
