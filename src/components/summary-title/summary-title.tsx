import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-summary-title",
  styleUrl: "summary-title.scss",
  shadow: true
})
export class SummaryTitle {
  @Prop() summaryid: string;
  @Prop() summaryvalue: string;
  @Prop() classType: string;
  public readonly DefaultClassType = "SummaryTitle";

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

  private getClasType(): string {
    const ret = "CommonTitle ";
    if (this.classType == "") this.classType = this.DefaultClassType;
    return ret + this.classType + " gxg-title-01";
  }

  render() {
    return (
      <input
        id={this.summaryid}
        type="text"
        class={this.getClasType()}
        value={this.summaryvalue}
        onChange={event => this.ChangingFlowName(event)}
        onMouseDown={() => this.TriggerMouseDown()}
        onMouseLeave={() => this.TriggerMouseLeave()}
        onClick={event => this.TriggerOnClickTitleInputValue(event)}
      />
    );
  }
}
