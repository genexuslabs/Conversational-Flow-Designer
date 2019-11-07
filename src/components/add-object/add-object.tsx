import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-add-object",
  styleUrl: "add-object.scss",
  shadow: false
})
export class AddObject {
  @Prop() addText: string;

  @Event() addObject: EventEmitter;
  TriggerAddObject(event): void {
    this.addObject.emit(event);
  }

  render() {
    return (
      <div>
        <div class="AddObject" onClick={event => this.TriggerAddObject(event)}>
          <gxcf-add-element class="AddObjectText" />
          <span class="AddObjectText">{this.addText}</span>
        </div>
      </div>
    );
  }
}
