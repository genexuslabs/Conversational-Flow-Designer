import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";

@Component({
  tag: "gxcf-user-input-collapsed",
  styleUrl: "user-input-collapsed.scss",
  shadow: true
})
export class CollapsedUserInput {
  @Prop() userInput: UserInputElement;

  @Event() expandUserInput: EventEmitter;
  TriggerOnExpandUserInput(event): void {
    this.expandUserInput.emit(event);
  }

  @Event() modifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event): void {
    this.modifyUserInputName.emit(event);
  }

  @Event() modifyUserInputFirstAskMessage: EventEmitter;
  TriggerOnModifyUserInputFirstAskMessage(event): void {
    this.modifyUserInputFirstAskMessage.emit(event);
  }

  render() {
    return (
      <div class="CollapsedUserInput">
        <input
          type="text"
          class="CollapsedTitle"
          value={this.userInput.Variable}
          onChange={event => this.TriggerOnModifyUserInputName(event)}
        />
        <gxcf-down-arrow
          class="CollapsedUserInputDownArrow"
          onClick={event => this.TriggerOnExpandUserInput(event)}
        />
        <input
          type="text"
          class="FirstAskMessage"
          value={this.userInput.GetFirstAskMessage()}
          onChange={event =>
            this.TriggerOnModifyUserInputFirstAskMessage(event)
          }
        />
      </div>
    );
  }
}
