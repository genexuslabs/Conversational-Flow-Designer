import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-select",
  styleUrl: "gxcf_select.scss",
  shadow: false
})
export class Select {
  @Prop() selectid: string;
  @Prop() selectcaption: string;

  render() {
    return (
      <div id={this.selectid} class="Select">
        {this.selectcaption}
      </div>
    );
  }
}
