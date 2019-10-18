import { Component, Prop, h, Listen, State } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { RenderingOptions } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";

@Component({
  tag: "gxcf-flow",
  styleUrl: "gxcf_flow.scss",
  shadow: false
})
export class GXCF_Flow {
  @Prop() flow: FlowElement;
  @Prop() showDropZone: boolean;
  
  @Listen('onExpandFlow')
  HandleExpandFlow(event:CustomEvent)
  {
    console.log(event.type);
    this.refresh = !this.refresh;
  }

  @Listen('onCollapseFlow')
  HandleCollapseFlow(event:CustomEvent)
  {
    console.log(event.type);
    this.refresh = !this.refresh;
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

  private renderSummary = 
    <div>           
        <gxcf-dropzone moveType="Up" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
        <gxcf-flowsummary data-flowid={this.flow.Id} flow={this.flow}></gxcf-flowsummary>
        <gxcf-dropzone moveType="Down" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
    </div>;

  private renderFull = 
  <div>           
      <gxcf-flowfull data-flowid={this.flow.Id} flow={this.flow}></gxcf-flowfull>
  </div>;

  @State() refresh:boolean = true;

  render() 
  {
    if (this.flow.RenderType == RenderingOptions.Summary)
    {
      console.log("Summary");
      return this.renderSummary;
    }
    if (this.flow.RenderType == RenderingOptions.Full)
    {
      console.log("Full");
      return this.renderFull;
    }      
    
    return (<span>Flow Render Type '{this.flow.RenderType.toString()}' is not valid</span>)
  }  
}