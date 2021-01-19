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

  @Event() titleMouseDown: EventEmitter;
  TriggerMouseDown(): void {
    this.titleMouseDown.emit();
  }

  @Event() titleMouseLeave: EventEmitter;
  TriggerMouseLeave(): void {
    this.titleMouseLeave.emit();
  }

  private getIconName(icon: string): string {
    if (icon == "") return "gemini-tools/add";

    if (icon == "DataProvider") icon = "data-provider";
    else if (icon == "SDPanel") icon = "panel-for-sd";
    else if (icon == "WebComponent") icon = "web-component";

    return `objects/${icon.toLowerCase()}`;
  }

  render() {
    if (this.selectType == SelectTypes.Compact)
      return (
        <gxg-pill
          icon={this.getIconName(this.selectIconType)}
          onMouseDown={() => this.TriggerMouseDown()}
          onMouseLeave={() => this.TriggerMouseLeave()}
          class="Select"
        >
          {this.selectcaption}
        </gxg-pill>
      );
    else
      return (
        <gxg-button
          type="secondary-text-icon"
          icon={this.getIconName(this.selectIconType)}
        >
          {this.selectcaption}
        </gxg-button>
      );
  }
}
