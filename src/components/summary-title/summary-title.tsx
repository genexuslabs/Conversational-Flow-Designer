import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Method,
  Element
} from "@stencil/core";

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

  @Event() changingFlowName: EventEmitter;
  ChangingFlowName(event): void {
    this.changingFlowName.emit(event);
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
        onChange={event => this.ChangingFlowName(event)}
        onMouseDown={() => this.TriggerMouseDown()}
        onMouseLeave={() => this.TriggerMouseLeave()}
        onClick={event => this.TriggerOnClickTitleInputValue(event)}
      />
    );
  }
}
