import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "custom-select",
  styleUrl: "custom-select.scss",
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
