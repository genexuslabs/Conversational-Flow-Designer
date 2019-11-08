import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-response-full",
  styleUrl: "response-full.scss",
  shadow: false
})
export class FullResponse {
  @Prop() response: ResponseElement;

  @Event() collapseResponse: EventEmitter;
  TriggerCollapseResponse(event): void {
    this.collapseResponse.emit(event);
  }

  render() {
    return (
      <div class="FullResponse">
        <input
          type="text"
          class="FullResponseTitle"
          value={this.response.Style}
        />
        <gxcf-up-arrow
          class="FullResponseUpArrow"
          onClick={event => this.TriggerCollapseResponse(event)}
        />
      </div>
    );
  }
}
