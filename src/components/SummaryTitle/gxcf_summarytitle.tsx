import { Component, Prop, h, Event } from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
  tag: "gxcf-summarytitle",
  styleUrl: "gxcf_summarytitle.scss",
  shadow: false
})
export class GXCF_SummaryTitle {
  @Prop() summaryid: string;
  @Prop() summaryvalue: string;
  
  @Event() changingFlowName:EventEmitter;
  ChangingFlowName(event)
  {
    this.changingFlowName.emit(event);
  }

  render() {
    return (
        <input id={this.summaryid} type="text" class="SummaryTitle" value={this.summaryvalue} onChange={ (event) => this.ChangingFlowName(event) }/>
    );
  }
}