import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-condition",
  styleUrl: "condition.scss",
  shadow: true
})
export class Condition {
  @Prop() currentCondition: string;

  @Event() conditionChange: EventEmitter;
  TriggerOnConditionChange(event): void {
    this.conditionChange.emit(event);
  }

  render() {
    return (
      <div class="ContainerConditon">
        <span class="LabelConditon gxg-label">If...</span>
        <input
          class="InputCondition gxg-text"
          placeholder="always"
          value={this.currentCondition}
          onChange={event => this.TriggerOnConditionChange(event)}
        />
      </div>
    );
  }
}
