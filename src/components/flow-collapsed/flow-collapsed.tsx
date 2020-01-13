import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element
} from "@stencil/core";
import { RenderingOptions, SelectTypes } from "../common/helpers";

@Component({
  tag: "gxcf-flow-collapsed",
  styleUrl: "flow-collapsed.scss",
  shadow: true
})
export class FlowCollapsed {
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() renderingType: RenderingOptions;

  @Element() element: HTMLElement;

  @Event() expandFlow: EventEmitter;
  TriggerOnExpandFlow(event): void {
    console.log(event);
    this.expandFlow.emit.call(this, { flowName: this.flow.Name });
  }

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    console.log(event);
    this.selectConversationalObject.emit.call(this, {
      flowName: this.flow.Name
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

  private GetSummaryTriggerMessage(): string {
    if (this.flow.Triggers[0] != null) {
      return this.flow.Triggers[0];
    }
    return "";
  }

  private GetSummaryConversationalObject(): string {
    if (this.flow.ConversationalObjectName)
      return this.flow.ConversationalObjectName.toUpperCase();
    return "Conversational Object";
  }

  private GetSummaryTitleClass(): string {
    if (this.flow.ConversationalObjectName) return "SummaryTitle";
    return "MinSummaryTitle";
  }

  switchDraggable(drag: boolean): void {
    const element = this.element.shadowRoot.querySelector("div") as HTMLElement;
    element.setAttribute("draggable", "" + drag);
  }

  private GetSelectCOClass(): string {
    if (this.flow.ConversationalObjectName)
      return "NotEmptySelectBoxing SelectBoxing";
    return "SelectBoxing";
  }

  render() {
    let classProp;
    if (this.renderingType == RenderingOptions.Collapsed) {
      classProp = "FlowSummary NoActiveContent";
    } else {
      classProp = "FlowSummary ActiveContent";
    }

    let selectType: SelectTypes = SelectTypes.Compact;
    if (!this.flow.ConversationalObjectName) selectType = SelectTypes.Full;

    return (
      <div
        id={this.flow.Id}
        data-elementType="flow"
        class={classProp}
        draggable
        onClick={event => this.TriggerOnExpandFlow(event)}
      >
        <gxcf-select
          selectid={this.SelectId}
          selectcaption={this.GetSummaryConversationalObject()}
          class={this.GetSelectCOClass()}
          selectIconType={this.flow.ConversationalObjectType}
          selectType={selectType}
          onClick={event => this.TriggerSelectConversationalObject(event)}
          onTitleMouseDown={() => this.switchDraggable(false)}
          onTitleMouseLeave={() => this.switchDraggable(true)}
        />
        <gxcf-summary-title
          summaryid={this.SummaryId}
          summaryvalue={this.flow.Name}
          classType={this.GetSummaryTitleClass()}
          onTitleMouseDown={() => this.switchDraggable(false)}
          onTitleMouseLeave={() => this.switchDraggable(true)}
        />
        <gxcf-summary-description
          descriptionid={this.DescriptionId}
          descriptionvalue={this.GetSummaryTriggerMessage()}
          onTitleMouseDown={() => this.switchDraggable(false)}
          onTitleMouseLeave={() => this.switchDraggable(true)}
        />
      </div>
    );
  }
}
