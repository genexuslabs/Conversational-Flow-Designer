import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-add-object",
  styleUrl: "gxcf-add-object.scss",
  shadow: false
})
export class AddObject {
  @Prop() collectionAddText: string;
  // @Prop() onAddObject:Function;

  @Event() addObject: EventEmitter;
  TriggerAddObject(event): void {
    this.addObject.emit(event);
  }

  render() {
    return (
      <div>
        <div class="AddObject" onClick={event => this.TriggerAddObject(event)}>
          <gxcf-addelement class="AddObjectText"></gxcf-addelement>
          <span class="AddObjectText">{this.collectionAddText}</span>
        </div>
      </div>
    );
  }
}
