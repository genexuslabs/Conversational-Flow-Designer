import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-response-collapsed",
  styleUrl: "response-collapsed.scss",
  shadow: false
})
export class CollapsedResponse {
  @Prop() response: ResponseElement;

  @Event() expandResponse: EventEmitter;
  TriggerOnExpandResponse(event): void {
    this.expandResponse.emit(event);
  }

  render() {
    return (
      <div class="CollapsedResponse">
        <input
          type="text"
          class="CollapsedResponseTitle"
          value={this.response.Style}
        />
        <gxcf-down-arrow
          class="CollapsedResponseDownArrow"
          onClick={event => this.TriggerOnExpandResponse(event)}
        />
        <input
          type="text"
          class="FirstResponseMessage"
          value={this.response.GetFristResponseMessage()}
        />
      </div>
    );
  }
}
