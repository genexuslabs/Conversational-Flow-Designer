import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";

@Component({
  tag: "gxcf-collapseduserinput",
  styleUrl: "gxcf_collapseduserinput.scss",
  shadow: false
})
export class GXCF_CollapsedUserInput {
  @Prop() userInput: UserInputElement;

  render() {
      return (
        <div class="CollapsedUserInput">
          <input type="text" class="CollapsedTitle" value={this.userInput.Variable} />
          <gxcf-downarrow class="CollapsedUserInputDownArrow"></gxcf-downarrow>
          <input type="text" class="FirstAskMessage" value={this.userInput.GetFirstAskMessage()} />
        </div>
      );
  }
}