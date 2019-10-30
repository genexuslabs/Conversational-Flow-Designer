import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-uparrow",
  styleUrl: "gxcf_uparrow.scss",
  shadow: false
})
export class GXCF_UpArrow {
  @Prop() arrowid: string;

  render() {
    return (
        <div id={this.arrowid} class="UpArrow"></div>
    );
  }
}