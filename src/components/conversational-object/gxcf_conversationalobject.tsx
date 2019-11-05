import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { HintId } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-conversationalobject",
  styleUrl: "gxcf_conversationalobject.scss",
  shadow: false
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
        <custom-hint
          hintId={HintId.ConversationalObject}
          class="Hint"
        ></custom-hint>
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
