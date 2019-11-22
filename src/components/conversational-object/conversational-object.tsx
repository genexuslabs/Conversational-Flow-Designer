import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";
import { HintId } from "../../global/conversational-editor/helpers/helpers";

@Component({
  tag: "gxcf-conversational-object",
  styleUrl: "conversational-object.scss",
  shadow: true
})
export class ConversationalObject {
  @Prop() conversationalObject: string;

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    this.selectConversationalObject.emit(event);
  }

  render() {
    return (
      <div class="ConversationalObject">
        <span class="ConversationalObjectHeader">CONVERSATIONAL OBJECT</span>
        <gxcf-hint hintId={HintId.ConversationalObject} class="Hint" />
        <span
          class="SelectConversationalObject"
          onClick={event => this.TriggerSelectConversationalObject(event)}
        >
          {this.conversationalObject}
        </span>
      </div>
    );
  }
}
