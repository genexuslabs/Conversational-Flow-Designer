import { Component, Prop, h } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { App } from "../../global/ConversationalEditor/App";
import { RedirectionProperty } from "../../global/ConversationalEditor/instanceDefinition/Elements/RedirectionProperty";

@Component({
  tag: "gxcf-redirection",
  styleUrl: "gxcf_redirection.scss",
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
          <gxcf-condition
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
