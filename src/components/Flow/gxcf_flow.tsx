import { Component, Prop, h } from "@stencil/core";
import { FlowElement } from "../ConversationalEditor/instanceDefinition/Elements/FlowElement";

@Component({
  tag: "gxcf-flow",
  styleUrl: "gxcf_flow.scss",
  shadow: false
})
export class GXCF_Flow {
  @Prop() flow: FlowElement;
  @Prop() showDropZone: boolean;
  @Prop() flowRenderType: string;

  private renderSummary = 
    <div>           
        <gxcf-dropzone moveType="Up" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
        <gxcf-flowsummary flow={this.flow}></gxcf-flowsummary>
        <gxcf-dropzone moveType="Down" show={this.showDropZone} objectReferenceId={this.flow.Id}></gxcf-dropzone>
    </div>;

  render() {
    if (this.flowRenderType){
        if (this.flowRenderType == "summary")
            return this.renderSummary;
        else
            return (<span>Flow Render Type is not valid</span>)
    }
    return (<span>Flow Render Type not found</span>)
  }  
}