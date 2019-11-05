import { Component, Prop, h, Event } from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
  tag: "gxcf-summarytitle",
  styleUrl: "gxcf_summarytitle.scss",
  shadow: false
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

  render() {
    if (this.classType == "") this.classType = this.DefaultClassType;
    return (
      <input
        id={this.summaryid}
        type="text"
        class={this.classType}
        value={this.summaryvalue}
        onChange={event => this.ChangingFlowName(event)}
      />
    );
  }
}
