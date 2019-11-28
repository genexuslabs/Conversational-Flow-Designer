import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-response-collapsed",
  styleUrl: "response-collapsed.scss",
  shadow: true
})
export class CollapsedResponse {
  @Prop() response: ResponseElement;

  @Event() expandResponse: EventEmitter;
  TriggerOnExpandResponse(event): void {
    this.expandResponse.emit(event);
  }

  @Event() changeResponseName: EventEmitter;
  TriggerChangeResponseName(event): void {
    this.changeResponseName.emit(event);
  }

  private GetDownArrow(): HTMLElement {
    return (
      <gxcf-down-arrow
        class="CollapsedResponseDownArrow"
        onClick={event => this.TriggerOnExpandResponse(event)}
      />
    );
  }

  private GetHeader(): HTMLElement[] {
    const title: HTMLElement[] = new Array<HTMLElement>();
    title.push(
      <input
        type="text"
        class="CollapsedResponseTitle"
        value={this.response.ResponseName}
        placeholder="Response name..."
        onChange={event => this.TriggerChangeResponseName(event)}
      />
    );
    title.push(this.GetDownArrow());
    if (this.response.Condition != "") {
      title.push(
        <div class="ConditionHeader">
          <span class="IfTitle">if...</span>
          <span class="ConditionTitle">{this.response.Condition}</span>
        </div>
      );
    }
    return title;
  }

  private GetFirstResponseMessageClass(): string {
    let tab = "FirstResponseMessageNoTab";
    if (this.response.Condition != "") tab = "FirstResponseMessageTab";
    return `FirstResponseMessage ${tab}`;
  }

  render() {
    return (
      <div class="CollapsedResponse">
        <gxcf-dot class="DotPosition" />
        {this.GetHeader()}
        <input
          type="text"
          class={this.GetFirstResponseMessageClass()}
          value={this.response.GetFristResponseMessage()}
          placeholder="First response message..."
        />
      </div>
    );
  }
}
