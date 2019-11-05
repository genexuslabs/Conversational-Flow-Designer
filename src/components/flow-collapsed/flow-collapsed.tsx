import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  State,
  Listen
} from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";

@Component({
  tag: "flow-collapsed",
  styleUrl: "flow-collapsed.scss",
  shadow: false
})
export class FlowSummary {
  @Prop() flow: FlowElement;
  @Prop() renderingType: RenderingOptions;
  @State() refresh: boolean;

  @Event() onExpandFlow: EventEmitter;
  TriggerOnExpandFlow(event): void {
    this.onExpandFlow.emit(event);
  }

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    this.selectConversationalObject.emit(event);
  }

  @Event() onFlowDragStart: EventEmitter;
  TriggerOnFlowDragStart(event): void {
    this.onFlowDragStart.emit(event);
  }

  @Event() onDragOverFlow: EventEmitter;
  TriggerOnDragOverFlow(event): void {
    this.onDragOverFlow.emit(event);
  }

  @Listen("selectConversationalObject")
  HandleSelectConversationalObject(event: CustomEvent): void {
    EventHandler.SelectConversationalObject(event).then(retFlow => {
      this.flow = retFlow;
      if (this.flow.UserInputComponent)
        this.flow.UserInputComponent.refresh = !this.flow.UserInputComponent
          .refresh;
      this.refresh = !this.refresh;
    });
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
    let classProp;
    if (this.renderingType == RenderingOptions.Summary) {
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
        <summary-title
          summaryid={this.SummaryId}
          summaryvalue={this.flow.Name}
          classType="SummaryTitle"
        ></summary-title>
        <custom-select
          selectid={this.SelectId}
          selectcaption={this.flow.GetSummaryConversationalObject()}
          onClick={event => this.TriggerSelectConversationalObject(event)}
        ></custom-select>
        <summary-description
          descriptionid={this.DescriptionId}
          descriptionvalue={this.flow.GetSummaryTriggerMessage()}
        ></summary-description>
      </div>
    );
  }
}
