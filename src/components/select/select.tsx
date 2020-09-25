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
  private readonly extendedClass: string = "ExtendedSelect";

  private GetIconClass(): string {
    let iconClass = "";
    if (this.selectIconType && this.selectIconType != "")
      iconClass = `${this.selectIconType} SelectIcon`;
    else iconClass = `SelectIconHidden`;
    return iconClass;
  }

  private GetSelectClass(): string {
    if (this.selectType == SelectTypes.Full) return `${this.fullClass} Select`;
    if (this.selectType == SelectTypes.Extended)
      return `${this.extendedClass} Select`;
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

  private renderIcon(): HTMLElement {
    if (this.selectType == SelectTypes.Full)
      return <gxg-icon size="small" type="add" color="onbackground" />;
    return <div class={this.GetIconClass()} />;
  }

  render() {
    if (this.selectType == SelectTypes.Compact)
      return (
        <gxg-box
          id={this.selectid}
          class={this.GetSelectClass()}
          title={this.selectcaption}
          onMouseDown={() => this.TriggerMouseDown()}
          onMouseLeave={() => this.TriggerMouseLeave()}
        >
          <gxg-spacer-layout
            space="xs"
            orientation="horizontal"
            justify-content="flex-start"
          >
            {this.renderIcon()}
            <span class="SelectText">{this.selectcaption}</span>
          </gxg-spacer-layout>
        </gxg-box>
      );
    else
      return (
        <gxg-button type="secondary-text-icon" icon="gemini-tools/add">
          {this.selectcaption}
        </gxg-button>
      );
  }
}
