import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { App } from "../../global/conversational-editor/app";
import { RedirectionProperty } from "../../global/conversational-editor/instance-definition/elements/redirection-property";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { ConversationalElement } from "../../global/conversational-editor/instance-definition/elements/iconversational-element";

@Component({
  tag: "gxcf-redirection",
  styleUrl: "redirection.scss",
  shadow: false
})
export class Redirection {
  @Prop() element: ConversationalElement;
  @Prop() redirectionProperty: RedirectionProperty;

  TriggerOnChangeRedirectCondition(event): void {
    const value = EventHandler.GetValue(event);
    this.redirectionProperty.SetRedirectCondition(this.element, value);
  }

  @Event() changeRedirectTo: EventEmitter;
  TriggerOnChangeRedirectTo(event): void {
    console.log("Trigger");
    const value = EventHandler.GetValueFromSelect(event);
    this.redirectionProperty.SetRedirectTo(this.element, value);
  }

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

  render() {
    return (
      <div class="RedirectionContainer">
        <div>
          <gxcf-condition
            currentCondition={this.redirectionProperty.RedirectCondition}
            onConditionChange={event =>
              this.TriggerOnChangeRedirectCondition(event)
            }
          />
          <select
            class="RedirectToSelect"
            required
            onChange={event => this.TriggerOnChangeRedirectTo(event)}
          >
            {this.LoadFlowsCombo()}
          </select>
        </div>
      </div>
    );
  }
}
