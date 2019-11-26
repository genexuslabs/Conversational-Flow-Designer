import {
  Component,
  h,
  Prop,
  Listen,
  State,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { App } from "../../global/conversational-editor/app";

@Component({
  tag: "gxcf-flow-container",
  styleUrl: "flow-container.scss",
  shadow: true
})
export class Flow {
  @Prop() flow: FlowElement;
  @Prop() showDropZone = false;
  @State() activeDropZone = false;
  @State() refresh = true;
  @Element() element: HTMLElement;

  @Listen("expandFlow")
  HandleExpandFlow(event: CustomEvent): void {
    console.log(event.type);
    this.flow = App.GetApp().Instance.SetFlowRenderType(
      this.flow,
      RenderingOptions.Full
    );
    this.flow.SetRenderType(RenderingOptions.Full);
  }

  @Listen("collapseFlow")
  HandleCollapseFlow(event: CustomEvent): void {
    console.log(event.type);
    this.flow = App.GetApp().Instance.SetFlowRenderType(
      this.flow,
      RenderingOptions.Collapsed
    );
    this.flow.SetRenderType(RenderingOptions.Collapsed);
  }

  @Listen("changingFlowName")
  HandleChangingFlowName(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    if (value != null) this.flow.SetName(value);
  }

  @Listen("changingFlowTriggerSummary")
  HandleChangingFlowTriggerSummary(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    if (value != null) this.flow.SetFirstTriggerMessage(value);
  }

  @Listen("selectConversationalObject")
  HandleSelectConversationalObject(event: CustomEvent): void {
    console.log(event);
    EventHandler.SelectConversationalObject(this.flow, this
      .element as HTMLGxcfFlowContainerElement);
  }

  @Event() deleteFlow: EventEmitter;
  TriggerDeleteFlow(event: CustomEvent): void {
    this.deleteFlow.emit(event);
  }

  private renderSummary(renderingOption: RenderingOptions): HTMLElement {
    return (
      <div>
        <gxcf-drop-zone
          moveType="Up"
          show={this.showDropZone}
          objectReferenceId={this.flow.Id}
        />
        <gxcf-flow-collapsed
          renderingType={renderingOption}
          data-flowid={this.flow.Id}
          flow={this.flow}
          draggable
        />
        <gxcf-drop-zone
          moveType="Down"
          show={this.showDropZone}
          objectReferenceId={this.flow.Id}
        />
      </div>
    );
  }

  private renderFull(): HTMLElement {
    return (
      <div>
        {this.renderSummary(RenderingOptions.Full)}
        <div class="FullFlowContainer">
          <gxcf-flow-full
            data-flowid={this.flow.Id}
            flow={this.flow}
            onDeleteFullFlow={event => this.TriggerDeleteFlow(event)}
          />
        </div>
      </div>
    );
  }

  render() {
    this.flow.Component = this;
    if (this.flow.RenderType == RenderingOptions.Collapsed)
      return this.renderSummary(RenderingOptions.Collapsed);
    if (this.flow.RenderType == RenderingOptions.Full) return this.renderFull();
    return (
      <span>
        Flow Render Type '{this.flow.RenderType.toString()}' is not valid
      </span>
    );
  }
}
