import {
  Component,
  Prop,
  h,
  State,
  Listen,
  Event,
  EventEmitter
} from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { EventHandler } from "../../global/conversational-editor/event-handler";

@Component({
  tag: "gxcf-response-container",
  styleUrl: "response-container.scss",
  shadow: true
})
export class Response {
  @Prop() response: ResponseElement;
  @Prop() flow: FlowElement;
  @State() refresh = false;

  @Listen("expandResponse")
  HandleExpandResponse(event: CustomEvent) {
    console.log(event);
    this.response.SetRenderType(RenderingOptions.Full);
    this.Refresh();
  }

  @Listen("collapseResponse")
  HandleCollapseResponse(event: CustomEvent) {
    console.log(event);
    this.response.SetRenderType(RenderingOptions.Collapsed);
    this.Refresh();
  }

  @Listen("changeResponseName")
  HandleChangeResponseName(event) {
    const value: string = EventHandler.GetValue(event);
    console.log("New response name: " + value);
    this.response.SetResponseName(value);
  }

  @Event() deleteResponse: EventEmitter;
  TriggerDeleteResponse(event: any) {
    this.deleteResponse.emit(event);
  }

  private Refresh(): void {
    this.refresh = !this.refresh;
  }

  private RenderCollapsed(): HTMLElement {
    return <gxcf-response-collapsed response={this.response} />;
  }

  private RenderFull(): HTMLElement {
    return (
      <gxcf-response-full
        response={this.response}
        onDeleteResponseFull={event => this.TriggerDeleteResponse(event)}
      />
    );
  }

  render() {
    if (this.response.RenderType == RenderingOptions.Collapsed)
      return this.RenderCollapsed();
    if (this.response.RenderType == RenderingOptions.Full)
      return this.RenderFull();
    return <div>Unsupported render type</div>;
  }
}
