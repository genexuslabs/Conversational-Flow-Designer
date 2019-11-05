import { Component, Prop, h } from "@stencil/core";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { App } from "../../global/conversational-editor/app";
import { RedirectionProperty } from "../../global/conversational-editor/instance-definition/elements/redirection-property";

@Component({
  tag: "custom-redirection",
  styleUrl: "custom-redirection.scss",
  shadow: false
})
export class Redirection {
  @Prop() userInput: UserInputElement;
  @Prop() redirectionProperty: RedirectionProperty;

  private LoadFlowsCombo(): HTMLElement[] {
    const combo: HTMLElement[] = new Array<HTMLElement>();
    App.GetApp().Instance.Flows.forEach(iFlow => {
      if (iFlow.Name == this.redirectionProperty.RedirectTo) {
        combo.push(
          <option value={iFlow.Name} selected>
            {iFlow.Name}
          </option>
        );
      } else {
        combo.push(<option value={iFlow.Name}>{iFlow.Name}</option>);
      }
    }, this);
    return combo;
  }

  private ResponseConditionChange(value): void {
    console.log(value);
  }

  render() {
    return (
      <div class="RedirectionContainer">
        <div>
          <custom-condition
            currentCondition={this.redirectionProperty.RedirectCondition}
            onConditionChange={this.ResponseConditionChange}
          />
          <select class="RedirectToSelect" required>
            {this.LoadFlowsCombo()}
          </select>
        </div>
      </div>
    );
  }
}
