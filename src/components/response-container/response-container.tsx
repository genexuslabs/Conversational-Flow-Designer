import {
  Component,
  Prop,
  h,
  Listen,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { RenderingOptions } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";

@Component({
  tag: "gxcf-response-container",
  styleUrl: "response-container.scss",
  shadow: true
})
export class Response {
  @Prop() response: GXCFModel.ResponseElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() renderType: RenderingOptions;
  @Prop() responseIndex: number;
  @Prop() instance: GXCFModel.Instance;
  @Element() element: HTMLElement;

  @Event() expandResponseOut: EventEmitter;
  TriggerExpandResponseOut(event): void {
    console.log(event);
    this.expandResponseOut.emit.call(this, { source: this.element });
  }

  @Event() collapseResponseOut: EventEmitter;
  TriggerCollapseResponseOut(event): void {
    console.log(event);
    this.collapseResponseOut.emit.call(this, { source: this.element });
  }

  @Event() setResponseMessages: EventEmitter;
  TriggerSetResponseMessages(
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setResponseMessages.emit.call(this, {
      flowName: this.flow.Name,
      responseIndex: this.responseIndex,
      responseMessages: StringCollectionHelper.FormatCollection(
        this.response.Format,
        index,
        value,
        remove
      )
    });
  }

  @Listen("setResponseMessagesInternal")
  HandleSetResponseMessagesInternal(event: CustomEvent): void {
    event.preventDefault();
    this.TriggerSetResponseMessages(
      event.detail.index,
      event.detail.value,
      event.detail.remove
    );
  }

  @Listen("expandResponse")
  HandleExpandResponse(event: CustomEvent) {
    this.TriggerExpandResponseOut(event);
  }

  @Listen("collapseResponse")
  HandleCollapseResponse(event: CustomEvent) {
    this.TriggerCollapseResponseOut(event);
  }

  @Event() changeResponseName: EventEmitter;
  TriggerChangeResponseName(event: CustomEvent): void {
    const value: string = EventsHelper.GetValue(event);
    this.changeResponseName.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex,
      value: value
    });
  }

  @Event() deleteResponse: EventEmitter;
  TriggerDeleteResponse(): void {
    this.deleteResponse.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex
    });
  }

  private RenderCollapsed(): HTMLElement {
    return (
      <gxcf-response-collapsed
        response={this.response}
        onChangeResponseName={event => this.TriggerChangeResponseName(event)}
      />
    );
  }

  private RenderFull(): HTMLElement {
    return (
      <gxcf-response-full
        response={this.response}
        responseIndex={this.responseIndex}
        flow={this.flow}
        onDeleteResponseFull={() => this.TriggerDeleteResponse()}
        instance={this.instance}
        onChangeResponseName={event => this.TriggerChangeResponseName(event)}
      />
    );
  }

  render() {
    if (this.renderType == RenderingOptions.Collapsed)
      return this.RenderCollapsed();
    if (this.renderType == RenderingOptions.Full) return this.RenderFull();
    return <div>Unsupported render type</div>;
  }
}
