import { Component, Prop, h } from "@stencil/core";
import { SelectTypes } from "../common/helpers";

@Component({
  tag: "gxcf-select",
  styleUrl: "select.scss",
  shadow: true
})
export class Select {
  @Prop() selectid: string;
  @Prop() selectcaption: string;
  @Prop() selectIconType: string;
  @Prop() selectType: SelectTypes;

  private readonly compactClass: string = "CompactSelect";
  private readonly fullClass: string = "FullSelect";

  private GetIconClass(): string {
    let iconClass = "";
    if (this.selectIconType && this.selectIconType != "")
      iconClass = `${this.selectIconType} SelectIcon`;
    else iconClass = `SelectIconHidden`;
    return iconClass;
  }

  private GetSelectClass(): string {
    if (this.selectType == SelectTypes.Full) return `${this.fullClass} Select`;
    return `${this.compactClass} Select`;
  }

  render() {
    return (
      <div
        id={this.selectid}
        class={this.GetSelectClass()}
        title={this.selectcaption}
      >
        <div class={this.GetIconClass()} />
        {this.selectcaption}
      </div>
    );
  }
}
