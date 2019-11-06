import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-select",
  styleUrl: "select.scss",
  shadow: false
})
export class Select {
  @Prop() selectid: string;
  @Prop() selectcaption: string;
  @Prop() selectIconType: string;

  private GetIconClass(): string {
    let iconClass = "";
    if (this.selectIconType != "")
      iconClass = `${this.selectIconType} SelectIcon`;
    else iconClass = `${this.selectIconType} SelectIconHidden`;

    console.log("Class: " + iconClass);
    return iconClass;
  }

  render() {
    const iconClass: string = this.GetIconClass();
    return (
      <div id={this.selectid} class="Select" title={this.selectcaption}>
        <div class={iconClass} />
        {this.selectcaption}
      </div>
    );
  }
}
