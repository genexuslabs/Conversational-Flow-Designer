import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-condition",
  shadow: true
})
export class Condition {
  @Prop() currentCondition: string;

  @Event() conditionChange: EventEmitter;
  triggerOnConditionChange(event): void {
    this.conditionChange.emit(event.detail);
  }

  render() {
    return (
      <gxg-form-text
        clearButton
        value={this.currentCondition}
        onChange={event => this.triggerOnConditionChange(event)}
        placeholder="always"
        label="If..."
      />
    );
  }
}
