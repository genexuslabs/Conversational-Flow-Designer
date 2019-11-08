import { Component, Prop, h, State, Listen } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";

@Component({
  tag: "gxcf-response-container",
  styleUrl: "response-container.scss",
  shadow: false
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

  private Refresh(): void {
    this.refresh = !this.refresh;
  }

  private RenderCollapsed(): HTMLElement {
    return <gxcf-response-collapsed response={this.response} />;
  }

  private RenderFull(): HTMLElement {
    return <gxcf-response-full response={this.response} />;
  }

  render() {
    if (this.response.RenderType == RenderingOptions.Collapsed)
      return this.RenderCollapsed();
    if (this.response.RenderType == RenderingOptions.Full)
      return this.RenderFull();
    return <div>Unsupported render type</div>;
  }
}
