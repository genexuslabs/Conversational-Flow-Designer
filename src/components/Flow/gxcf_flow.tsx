import { Component, Prop, h, Listen, State, Event, EventEmitter } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { RenderingOptions } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { App } from "../../global/ConversationalEditor/App";

@Component({
  tag: "gxcf-flow",
  styleUrl: "gxcf_flow.scss",
  shadow: false
})
export class GXCF_Flow {
  @Prop() flow: FlowElement;
  @Prop() showDropZone: boolean;
  @State() refresh: boolean = true;

  @Listen('onExpandFlow')
  HandleExpandFlow(event:CustomEvent)
  {
    console.log(event.type);
    this.flow = App.GetApp().Instance.SetFlowRenderType(this.flow, RenderingOptions.Full);
    this.flow.SetRenderType(RenderingOptions.Full);
  }

  @Listen('onCollapseFlow')
  HandleCollapseFlow(event:CustomEvent)
  {
    console.log(event.type);
    this.flow = App.GetApp().Instance.SetFlowRenderType(this.flow, RenderingOptions.Summary);
    this.flow.SetRenderType(RenderingOptions.Summary);
  }

  @Listen('changingFlowName')
  HandleChangingFlowName(event:CustomEvent)
  {
    EventHandler.ChangingFlowName(event);
  }

  @Listen('changingFlowTriggerSummary')
  HandleChangingFlowTriggerSummary(event:CustomEvent)
  {
    EventHandler.ChangingFlowTriggerSummary(event);
  }

  private renderSummary(renderingOption:RenderingOptions):any{
    return (
      <div>           
        <gxcf-dropzone moveType="Up" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
        <gxcf-flowsummary renderingType={ renderingOption } data-flowid={this.flow.Id} flow={this.flow}></gxcf-flowsummary>
        <gxcf-dropzone moveType="Down" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
      </div>
    );
  }

  private renderFull():any
  {
    return (    
      <div>
        { this.renderSummary(RenderingOptions.Full) }
        <div class="FullFlowContainer">           
          <gxcf-flowfull data-flowid={this.flow.Id} flow={this.flow}></gxcf-flowfull>
        </div>
      </div>
      );
  }

  render() 
  {
    this.flow.Component = this;
    if (this.flow.RenderType == RenderingOptions.Summary)
      return this.renderSummary(RenderingOptions.Summary);
    if (this.flow.RenderType == RenderingOptions.Full)
      return this.renderFull();    
    return (<span>Flow Render Type '{this.flow.RenderType.toString()}' is not valid</span>)
  }  
}