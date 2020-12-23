import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { EventsHelper } from "../common/events-helper";
import { Hint } from "../hint/hint";
import { HintId } from "../common/helpers";
import { GXCFModel } from "../common/model";

@Component({
  tag: "gxcf-redirection",
  shadow: true
})
export class Redirection {
  @Prop() redirectionProperty: GXCFModel.RedirectionProperty;
  @Prop() requireCondition: boolean;
  @Prop() redirectionIndex: number;
  @Prop() flows: GXCFModel.FlowElement[];
  @Prop() label: string;

  @Event() changeRedirectCondition: EventEmitter;
  TriggerOnChangeRedirectCondition(event): void {
    const value = EventsHelper.GetConditionValue(event);
    this.changeRedirectCondition.emit.call(this, {
      value: value,
      index: this.redirectionIndex
    });
  }

  @Event() changeRedirectTo: EventEmitter;
  TriggerOnChangeRedirectTo(event): void {
    const value = EventsHelper.GetValueFromGxgSelect(event);
    this.changeRedirectTo.emit.call(this, {
      value: value,
      index: this.redirectionIndex
    });
  }

  private LoadFlowsCombo(): HTMLElement[] {
    const combo: HTMLElement[] = new Array<HTMLElement>();
    this.flows.forEach(iFlow => {
      combo.push(
        <gxg-option
          value={iFlow.Name}
          selected={iFlow.Name == this.redirectionProperty.RedirectTo}
        >
          {iFlow.Name}
        </gxg-option>
      );
    }, this);
    return combo;
  }

  private RenderCondition(): HTMLElement {
    return (
      <gxcf-condition
        currentCondition={this.redirectionProperty.RedirectCondition}
        onConditionChange={event =>
          this.TriggerOnChangeRedirectCondition(event)
        }
        label="Condition"
        hintId={HintId.Redirection}
      />
    );
  }

  private RenderRedirectionBody(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();

    if (this.requireCondition) elements.push(this.RenderCondition());
    elements.push(<gxg-gxg-spacer-one />);
    if (!this.requireCondition) {
      elements.push(
        <gxg-columns alignY="center">
          <gxg-text>{this.label}</gxg-text>
          <gxcf-hint hintId={HintId.Redirection} />
        </gxg-columns>
      );
    }
    const label = this.requireCondition ? this.label : "";
    elements.push(
      <gxg-select
        onChange={event => this.TriggerOnChangeRedirectTo(event)}
        label={label}
      >
        {this.LoadFlowsCombo()}
      </gxg-select>
    );
    elements.push(<gxg-separator />);

    return elements;
  }

  render() {
    return this.RenderRedirectionBody();
  }
}
