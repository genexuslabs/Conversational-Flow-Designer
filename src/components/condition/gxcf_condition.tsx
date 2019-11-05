import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-condition",
  styleUrl: "gxcf_condition.scss",
  shadow: false
})
export class Condition {
  @Prop() currentCondition: string;
  @Prop() onConditionChange: Function;

  render() {
    return (
      <div class="ContainerConditon">
        <span class="LabelConditon">If...</span>
        <input
          class="InputCondition"
          placeholder="always"
          value={this.currentCondition}
          onChange={event => this.onConditionChange(event)}
        />
      </div>
    );
  }
}
