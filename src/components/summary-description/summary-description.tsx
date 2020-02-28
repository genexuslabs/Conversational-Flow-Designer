import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "gxcf-summary-description",
  styleUrl: "summary-description.scss",
  shadow: true
})
export class SummaryDescription {
  @Prop() descriptionid: string;
  @Prop() descriptionvalue: string;

  @Event() changingFlowTriggerSummary: EventEmitter;
  ChangingFlowTriggerSummary(event): void {
    this.changingFlowTriggerSummary.emit(event);
  }

  @Event() titleMouseDown: EventEmitter;
  TriggerMouseDown(): void {
    this.titleMouseDown.emit();
  }

  @Event() titleMouseLeave: EventEmitter;
  TriggerMouseLeave(): void {
    this.titleMouseLeave.emit();
  }

  render() {
    return (
      <input
        id={this.descriptionid}
        type="text"
        class="SummaryDescription gxg-quote"
        value={this.descriptionvalue}
        size={45}
        onChange={event => this.ChangingFlowTriggerSummary(event)}
        onMouseDown={() => this.TriggerMouseDown()}
        onMouseLeave={() => this.TriggerMouseLeave()}
      />
    );
  }
}
