import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "gxcf-summary-description",
  styleUrl: "summary-description.scss",
  shadow: false
})
export class SummaryDescription {
  @Prop() descriptionid: string;
  @Prop() descriptionvalue: string;

  @Event() changingFlowTriggerSummary: EventEmitter;
  ChangingFlowTriggerSummary(event): void {
    this.changingFlowTriggerSummary.emit(event);
  }

  render() {
    return (
      <input
        id={this.descriptionid}
        type="text"
        class="SummaryDescription"
        value={this.descriptionvalue}
        size={45}
        onChange={event => this.ChangingFlowTriggerSummary(event)}
      />
    );
  }
}
