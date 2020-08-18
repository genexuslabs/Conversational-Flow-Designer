import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element,
  Method
} from "@stencil/core";

@Component({
  tag: "gxcf-flow-collapsed",
  shadow: true
})
export class FlowCollapsed {
  @Prop() flow: GXCFModel.FlowElement;

  @Element() element: HTMLElement;

  @Method()
  async setTitleFocus() {
    this.element
      .querySelector("gxg-box")
      .querySelector("gxg-spacer-layout")
      .querySelector("gxcf-summary-title")
      .setInputFocus();
  }

  @Event() modifyFlowName: EventEmitter;
  triggerChangeFlowName(event) {
    this.modifyFlowName.emit.call(this, {
      currentFlowName: this.flow.Name,
      newFlowName: event.detail
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

  hasTriggers(): boolean {
    return this.flow.Triggers.length > 0;
  }

  render() {
    return (
      <gxg-spacer-layout
        space="xs"
        orientation="vertical"
        justify-content="flex-start"
      >
        <gxg-spacer-layout
          space="xs"
          orientation="horizontal"
          justify-content="flex-start"
        >
          <gxcf-dot
            on={this.flow.Triggers.length > 0}
            style={{ marginTop: "var(--small-icon-height)" }}
          />
          <gxcf-summary-title
            summaryid={this.SummaryId}
            summaryvalue={this.flow.Name}
            onChangingValue={event => this.triggerChangeFlowName(event)}
          />
        </gxg-spacer-layout>

        <gxcf-summary-description
          descriptionid={this.DescriptionId}
          descriptionvalue={this.GetSummaryTriggerMessage()}
        />
      </gxg-spacer-layout>
    );
  }
}
