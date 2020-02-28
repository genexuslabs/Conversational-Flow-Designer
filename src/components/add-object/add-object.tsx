import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import "@genexus/gemini";

@Component({
  tag: "gxcf-add-object",
  styleUrl: "add-object.scss",
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
      <div>
        <div class="AddObject" onClick={event => this.TriggerAddObject(event)}>
          <gxg-icon size="small" type="add" color="onbackground" />
          <span class="AddObjectText gxg-text">{this.addText}</span>
        </div>
      </div>
    );
  }
}
