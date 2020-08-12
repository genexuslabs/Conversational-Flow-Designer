import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "gxcf-dot",
  styleUrl: "dot.scss",
  shadow: true
})
export class Dot {
  @Prop() on = true;

  render() {
    return <div class={this.on ? "Dot DotOn" : "Dot DotOff"} />;
  }
}
