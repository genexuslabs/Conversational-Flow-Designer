import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-downarrow",
  styleUrl: "gxcf_downarrow.scss",
  shadow: false
})
export class GXCF_DownArrow {
  @Prop() arrowid: string;
//onclick="expandSummaryFlow(event)"
//name={this.arrowname}
  render() {
    return (
        <div id={this.arrowid} class="DownArrow"></div>
    );
  }
}