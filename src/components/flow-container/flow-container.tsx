import { Component, h, Prop, Listen, State } from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { App } from "../../global/conversational-editor/app";

@Component({
  tag: "gxcf-flow-container",
  styleUrl: "flow-container.scss",
  shadow: false
})
export class Flow {
  @Prop() flow: FlowElement;
  @Prop() showDropZone: boolean;
  @State() refresh = true;

  @Listen("onExpandFlow")
  HandleExpandFlow(event: CustomEvent): void {
    console.log(event.type);
    this.flow = App.GetApp().Instance.SetFlowRenderType(
      this.flow,
      RenderingOptions.Full
    );
    this.flow.SetRenderType(RenderingOptions.Full);
  }

  @Listen("onCollapseFlow")
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
    console.log("hit");
    EventHandler.SelectConversationalObject(event).then(retFlow => {
      this.flow = retFlow;
      if (this.flow.UserInputComponent) {
        console.log("Refresh main component");
        this.flow.UserInputComponent.refresh = !this.flow.UserInputComponent
          .refresh;
        this.flow.UserInputComponentCollapsed.refresh = !this.flow
          .UserInputComponentCollapsed.refresh;
      }
      this.refresh = !this.refresh;
    });
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
          <gxcf-flow-full data-flowid={this.flow.Id} flow={this.flow} />
        </div>
      </div>
    );
  }

  render() {
    console.log("container refresh");
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
