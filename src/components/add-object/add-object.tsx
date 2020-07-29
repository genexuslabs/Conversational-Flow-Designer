import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import "@genexus/gemini";

@Component({
  tag: "gxcf-add-object",
  shadow: true
})
export class AddObject {
  @Prop() addText: string;

  @Event() addObject: EventEmitter;
  TriggerAddObject(event): void {
    this.addObject.emit(event);
  }

  render() {
    return (
      <gxg-button type="secondary-text-icon">
        <gxg-icon slot="icon" type="add" size="small" />
        {this.addText}
      </gxg-button>
    );
  }
}
