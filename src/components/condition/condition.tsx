import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ConditionType } from "../../global/conversational-editor/helpers/helpers";
import { runInThisContext } from "vm";

@Component({
  tag: "gxcf-condition",
  styleUrl: "condition.scss",
  shadow: false
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
        <span class="LabelConditon">If...</span>
        <input
          class="InputCondition"
          placeholder="always"
          value={this.currentCondition}
          onChange={event => this.TriggerOnConditionChange(event)}
        />
      </div>
    );
  }
}
