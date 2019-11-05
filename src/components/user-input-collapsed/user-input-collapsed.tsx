import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";

@Component({
  tag: "user-input-collapsed",
  styleUrl: "user-input-collapsed.scss",
  shadow: false
})
export class CollapsedUserInput {
  @Prop() userInput: UserInputElement;

  @Event() onExpandUserInput: EventEmitter;
  TriggerOnExpandUserInput(event): void {
    this.onExpandUserInput.emit(event);
  }

  @Event() onModifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event): void {
    this.onModifyUserInputName.emit(event);
  }

  @Event() onModifyUserInputFirstAskMessage: EventEmitter;
  TriggerOnModifyUserInputFirstAskMessage(event): void {
    this.onModifyUserInputFirstAskMessage.emit(event);
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
        <down-arrow
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
