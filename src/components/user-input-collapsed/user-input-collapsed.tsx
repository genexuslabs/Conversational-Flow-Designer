import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  Element
} from "@stencil/core";

@Component({
  tag: "gxcf-user-input-collapsed",
  styleUrl: "user-input-collapsed.scss",
  shadow: true
})
export class CollapsedUserInput {
  @Prop() userInput: GXCFModel.UserInputElement;
  @Element() element: HTMLElement;

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

  GetFirstAskMessage(): string {
    if (this.userInput.RequiredMessages.length > 0)
      return this.userInput.RequiredMessages[0];
    return "";
  }

  @Event() clickOnUserInputNameInternal;
  TriggerOnClickUserInputName(): void {
    this.clickOnUserInputNameInternal.emit();
  }

  render() {
    return (
      <div class="CollapsedUserInput">
        <gxcf-dot class="DotPosition" />
        <input
          type="text"
          class="CollapsedTitle"
          value={this.userInput.Variable}
          onClick={() => this.TriggerOnClickUserInputName()}
          readonly
        />
        <gxg-icon
          size="regular"
          type="chevron-down"
          class="CollapsedUserInputDownArrow"
          onClick={event => this.TriggerOnExpandUserInput(event)}
        />
        <input
          type="text"
          class="FirstAskMessage"
          value={this.GetFirstAskMessage()}
          onChange={event =>
            this.TriggerOnModifyUserInputFirstAskMessage(event)
          }
          placeholder="First ask message..."
        />
      </div>
    );
  }
}
