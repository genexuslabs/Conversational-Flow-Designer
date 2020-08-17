import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Method,
  Element
} from "@stencil/core";
import { EventsHelper } from "../common/events-helper";

@Component({
  tag: "gxcf-summary-title",
  styleUrl: "summary-title.scss",
  shadow: true
})
export class SummaryTitle {
  @Prop() summaryid: string;
  @Prop() summaryvalue: string;
  @Prop() fullWidth: boolean;

  @Element() element: HTMLElement;

  @Event() changingValue: EventEmitter;
  triggerChangingValue(event): void {
    const value = EventsHelper.GetValueFromInput(event);
    this.changingValue.emit(value);
  }

  @Event() titleMouseDown: EventEmitter;
  TriggerMouseDown(): void {
    this.titleMouseDown.emit();
  }

  @Event() titleMouseLeave: EventEmitter;
  TriggerMouseLeave(): void {
    this.titleMouseLeave.emit();
  }

  @Event() clickOnInput;
  TriggerOnClickTitleInputValue(event: MouseEvent): void {
    this.clickOnInput.emit.call(this, {
      source: event.target as HTMLInputElement
    });
  }

  @Method()
  async setInputFocus() {
    this.element.shadowRoot.querySelector("input").select();
  }

  getClass(): string {
    let cls = "CommonTitle gxg-title-01";
    if (this.fullWidth) cls += " FullTitle";
    else cls += " SummaryTitle";
    return cls;
  }

  render() {
    return (
      <input
        id={this.summaryid}
        type="text"
        class={this.getClass()}
        value={this.summaryvalue}
        onChange={event => this.triggerChangingValue(event)}
        onMouseDown={() => this.TriggerMouseDown()}
        onMouseLeave={() => this.TriggerMouseLeave()}
        onClick={event => this.TriggerOnClickTitleInputValue(event)}
      />
    );
  }
}
