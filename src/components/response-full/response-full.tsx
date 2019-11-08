import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";
import { HintId } from "../../global/conversational-editor/helpers/helpers";
import M from "minimatch";
import { EventHandler } from "../../global/conversational-editor/event-handler";

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

  HandleEditResponseMessage(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    console.log("Value: " + value);
    console.log("Index: " + index);
    this.response.EditMessage(value, +index);
  }

  HandleDeleteResponseMessage(event: CustomEvent): void {
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.response.DeleteMessage(+index);
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
        <gxcf-collection
          collection={this.response.Messages}
          collectionHeader={`Response Messages (${this.response.Messages.length})`}
          collectionAddText="Add an alternative response message"
          collectionHintId={HintId.ResponseMessage}
          onEditItem={event => {
            this.HandleEditResponseMessage(event);
          }}
          onDeleteItem={event => {
            this.HandleDeleteResponseMessage(event);
          }}
        />
      </div>
    );
  }
}
