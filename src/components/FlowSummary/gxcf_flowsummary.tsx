import { Component, Prop, Event, EventEmitter, h, State, Listen } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { RenderingOptions } from "../../global/ConversationalEditor/helpers/Helpers";


@Component({
  tag: "gxcf-flowsummary",
  styleUrl: "gxcf_flowsummary.scss",
  shadow: false
})
export class GXCF_FlowSummary {
  @Prop() flow: FlowElement;
  @State() flowState: FlowElement;

  @Event() onExpandFlow: EventEmitter;
  TriggerOnExpandFlow(event){
    this.flow.RenderType = RenderingOptions.Full;
    console.log("New Rendering type: "+this.flow.RenderType);
    this.onExpandFlow.emit(event);
  }

  @Event() selectConversationalObject: EventEmitter
  TriggerSelectConversationalObject(event){
    this.selectConversationalObject.emit(event);
  }

  @Event() onFlowDragStart: EventEmitter;
  TriggerOnFlowDragStart(event){
    this.onFlowDragStart.emit(event);
  }

  @Event() onDragOverFlow: EventEmitter;
  TriggerOnDragOverFlow(event){
    this.onDragOverFlow.emit(event);
  }

  @Listen('selectConversationalObject')
  HandleSelectConversationalObject(event:CustomEvent)
  {
    console.log(event.isTrusted.valueOf());
    EventHandler.SelectConversationalObject(event).then( retFlow => {
      this.flow = retFlow;
      this.flowState = retFlow;
    });
  }

  get SummaryId():string
  {
    return `GXCFSum_${this.flow.Id}`;
  }

  get ArrowId():string
  {
    return `GXCFArrow_${this.flow.Id}`;
  }

  get SelectId():string
  {
    return `GXCFSelectId_${this.flow.Id}`;
  }

  get DescriptionId():string
  {
    return `GXCFDescriptionId_${this.flow.Id}`;
  }

  render() {
    return (
    <div id={this.flow.Id} data-elementType="flow" class="FlowSummary" draggable onDragStart={ (event) => this.TriggerOnFlowDragStart(event) } onDragOver={ (event) => this.TriggerOnDragOverFlow(event) }>
        <gxcf-summarytitle summaryid={this.SummaryId} summaryvalue={this.flow.Name}></gxcf-summarytitle>
        <gxcf-downarrow arrowid={this.ArrowId} onClick={ (event) => this.TriggerOnExpandFlow(event)} class="FlowDownArrow"></gxcf-downarrow>
        <gxcf-select selectid={this.SelectId} selectcaption={this.flow.GetSummaryConversationalObject()} onClick={ (event) => this.TriggerSelectConversationalObject(event)}></gxcf-select>
        <gxcf-summarydescription descriptionid={this.DescriptionId} descriptionvalue={this.flow.GetSummaryTriggerMessage()}></gxcf-summarydescription>
    </div>
    );
  }
}