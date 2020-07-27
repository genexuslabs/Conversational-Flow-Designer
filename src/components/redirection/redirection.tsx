import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { EventsHelper } from "../common/events-helper";

@Component({
  tag: "gxcf-redirection",
  styleUrl: "redirection.scss",
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
    const value = EventsHelper.GetValue(event);
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
      />
    );
  }

  private RenderRedirectionBody(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();

    if (this.requireCondition) elements.push(this.RenderCondition());

    elements.push(
      <gxg-select
        required
        onChange={event => this.TriggerOnChangeRedirectTo(event)}
        label={this.label}
      >
        {this.LoadFlowsCombo()}
      </gxg-select>
    );

    return elements;
  }

  render() {
    return (
      <div class="RedirectionContainer">
        <div>{this.RenderRedirectionBody()}</div>
      </div>
    );
  }
}
