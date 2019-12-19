import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
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

  @Event() titleMouseDown: EventEmitter;
  TriggerMouseDown(): void {
    this.titleMouseDown.emit();
  }

  @Event() titleMouseLeave: EventEmitter;
  TriggerMouseLeave(): void {
    this.titleMouseLeave.emit();
  }

  render() {
    return (
      <div
        id={this.selectid}
        class={this.GetSelectClass()}
        title={this.selectcaption}
        onMouseDown={() => this.TriggerMouseDown()}
        onMouseLeave={() => this.TriggerMouseLeave()}
      >
        <div class={this.GetIconClass()} />
        {this.selectcaption}
      </div>
    );
  }
}
