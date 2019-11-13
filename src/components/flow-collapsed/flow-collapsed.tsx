import { Component, Prop, Event, EventEmitter, h, State } from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";

@Component({
  tag: "gxcf-flow-collapsed",
  styleUrl: "flow-collapsed.scss",
  shadow: false
})
export class FlowCollapsed {
  @Prop() flow: FlowElement;
  @Prop() renderingType: RenderingOptions;
  @State() refresh: boolean;

  @Event() expandFlow: EventEmitter;
  TriggerOnExpandFlow(event): void {
    this.expandFlow.emit(event);
  }

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    this.selectConversationalObject.emit(event);
  }

  @Event() flowDragStart: EventEmitter;
  TriggerOnFlowDragStart(event): void {
    this.flowDragStart.emit(event);
  }

  @Event() dragOverFlow: EventEmitter;
  TriggerOnDragOverFlow(event): void {
    this.dragOverFlow.emit(event);
  }

  get SummaryId(): string {
    return `GXCFSum_${this.flow.Id}`;
  }

  get ArrowId(): string {
    return `GXCFArrow_${this.flow.Id}`;
  }

  get SelectId(): string {
    return `GXCFSelectId_${this.flow.Id}`;
  }

  get DescriptionId(): string {
    return `GXCFDescriptionId_${this.flow.Id}`;
  }

  render() {
    this.flow.UserInputComponentCollapsed = this;
    let classProp;
    if (this.renderingType == RenderingOptions.Collapsed) {
      classProp = "FlowSummary NoActiveContent";
    } else {
      classProp = "FlowSummary ActiveContent";
    }

    return (
      <div
        id={this.flow.Id}
        data-elementType="flow"
        class={classProp}
        draggable
        onDragStart={event => this.TriggerOnFlowDragStart(event)}
        onDragOver={event => this.TriggerOnDragOverFlow(event)}
        onClick={event => this.TriggerOnExpandFlow(event)}
      >
        <gxcf-summary-title
          summaryid={this.SummaryId}
          summaryvalue={this.flow.Name}
          classType="SummaryTitle"
        />
        <gxcf-select
          class="SelectBoxing"
          selectid={this.SelectId}
          selectcaption={this.flow.GetSummaryConversationalObject()}
          selectIconType={this.flow.ConversationalObjectType}
          onClick={event => this.TriggerSelectConversationalObject(event)}
        />
        <gxcf-summary-description
          descriptionid={this.DescriptionId}
          descriptionvalue={this.flow.GetSummaryTriggerMessage()}
        />
      </div>
    );
  }
}
