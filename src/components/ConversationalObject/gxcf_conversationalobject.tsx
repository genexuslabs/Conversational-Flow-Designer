import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { HintId } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-conversationalobject",
  styleUrl: "gxcf_conversationalobject.scss",
  shadow: false
})
export class GXCF_ConversationalObject {
  @Prop() conversationalObject: string;

  render() {
      return (
        <div class="ConversationalObject">
          <span class="ConversationalObjectHeader">CONVERSATIONAL OBJECT</span>
          <gxcf-hint hintId={HintId.ConversationalObject} class="Hint"></gxcf-hint>
          <span class="SelectConversationalObject">{this.conversationalObject}</span>
        </div>
      );
  }
}