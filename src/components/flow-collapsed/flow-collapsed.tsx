import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element,
  Method
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

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    console.log(event);
    this.selectConversationalObject.emit.call(this, {
      flowName: this.flow.Name
    });
  }

  @Method()
  async setTitleFocus() {
    const summary: any = this.element
      .querySelector("gxg-box")
      .querySelector("gxg-spacer-layout")
      .querySelector("gxcf-summary-title");
    summary.setInputFocus();
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
      return this.flow.ConversationalObjectName;
    return "Conversational Object";
  }

  private GetSelectCOClass(): string {
    if (this.flow.ConversationalObjectName)
      return "NotEmptySelectBoxing SelectBoxing";
    return "SelectBoxing";
  }

  hasTriggers(): boolean {
    return this.flow.Triggers.length > 0;
  }

  render() {
    let classProp = "";
    if (this.renderingType == RenderingOptions.Collapsed) {
      classProp = "FlowSummary NoActiveContent";
    } else {
      classProp = "FlowSummary ActiveContent";
    }

    let selectType: SelectTypes = SelectTypes.Compact;
    if (!this.flow.ConversationalObjectName) selectType = SelectTypes.Full;

    return (
      <gxg-columns space="s" padding="xs" alignY="center">
        <gxg-column width="fluid">
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
              <gxcf-dot on={this.flow.Triggers.length > 0} class="Dot" />
              <gxcf-summary-title
                summaryid={this.SummaryId}
                summaryvalue={this.flow.Name}
              />
            </gxg-spacer-layout>

            <gxcf-summary-description
              descriptionid={this.DescriptionId}
              descriptionvalue={this.GetSummaryTriggerMessage()}
            />
          </gxg-spacer-layout>
        </gxg-column>
        <gxg-column width="content">
          <gxcf-select
            selectid={this.SelectId}
            selectcaption={this.GetSummaryConversationalObject()}
            selectIconType={this.flow.ConversationalObjectType}
            selectType={selectType}
            onClick={event => this.TriggerSelectConversationalObject(event)}
          />
        </gxg-column>
      </gxg-columns>
    );
  }
}
