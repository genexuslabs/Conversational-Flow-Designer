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
import { RenderingOptions } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { Position } from "../common/position";

@Component({
  tag: "gxcf-flow-container",
  styleUrl: "flow-container.scss",
  shadow: true
})
export class Flow {
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @Prop() showDropZone = false;
  @Prop() renderType: RenderingOptions;
  @State() activeDropZone = false;
  @Element() element: HTMLElement;

  @Event() modifyFlowName: EventEmitter;
  TriggerModifyFlowName(event, value: string): void {
    console.log(event);
    this.modifyFlowName.emit.call(this, {
      currentFlowName: this.flow.Name,
      newFlowName: value
    });
  }

  @Listen("changingFlowName")
  HandleChangingFlowName(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    this.TriggerModifyFlowName(event, value);
  }

  @Event() setTriggers: EventEmitter;
  TriggerSetTriggers(value): void {
    this.setTriggers.emit.call(this, {
      flowName: this.flow.Name,
      triggerMessages: StringCollectionHelper.FormatCollection(
        this.flow.Triggers,
        0,
        value,
        false
      )
    });
  }

  @Listen("changingFlowTriggerSummary")
  HandleChangingFlowTriggerSummary(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    this.TriggerSetTriggers(value);
  }

  @Event() deleteFlow: EventEmitter;
  TriggerDeleteFlow(): void {
    this.deleteFlow.emit.call(this, {
      flowName: this.flow.Name
    });
  }

  handleClickFlowContainer(flowName): void {
    Position.SetFlow(flowName);
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
          onClick={() => this.handleClickFlowContainer(this.flow.Name)}
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
            onDeleteFullFlow={() => this.TriggerDeleteFlow()}
            instance={this.instance}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.renderType == RenderingOptions.Collapsed)
      return this.renderSummary(RenderingOptions.Collapsed);
    if (this.renderType == RenderingOptions.Full) return this.renderFull();
    return (
      <span>Flow Render Type '{this.renderType.toString()}' is not valid</span>
    );
  }
}
