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
  @Prop() renderingType: RenderingOptions;
  @State() refresh: boolean;

  @Event() onExpandFlow: EventEmitter;
  TriggerOnExpandFlow(event){
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
        EventHandler.SelectConversationalObject(event).then( retFlow => {
        this.flow = retFlow;
        if (this.flow.UserInputComponent)
          this.flow.UserInputComponent.refresh = !this.flow.UserInputComponent.refresh;
        this.refresh = !this.refresh;
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
    let classProp;
    if (this.renderingType == RenderingOptions.Summary)
    {
      classProp = "FlowSummary NoActiveContent";
    }      
    else
    {
      classProp = "FlowSummary ActiveContent";
    }      

    return (
    <div id={this.flow.Id} data-elementType="flow" class={classProp} draggable onDragStart={ (event) => this.TriggerOnFlowDragStart(event) } onDragOver={ (event) => this.TriggerOnDragOverFlow(event) } onClick={ (event) => this.TriggerOnExpandFlow(event)}>
        <gxcf-summarytitle summaryid={this.SummaryId} summaryvalue={this.flow.Name} classType="SummaryTitle"></gxcf-summarytitle>
        <gxcf-select selectid={this.SelectId} selectcaption={this.flow.GetSummaryConversationalObject()} onClick={ (event) => this.TriggerSelectConversationalObject(event)}></gxcf-select>
        <gxcf-summarydescription descriptionid={this.DescriptionId} descriptionvalue={this.flow.GetSummaryTriggerMessage()}></gxcf-summarydescription>
    </div>
    );
  }
}