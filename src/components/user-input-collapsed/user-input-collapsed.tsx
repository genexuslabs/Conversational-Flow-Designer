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

  componentDidRender(): void {
    const title = this.element.shadowRoot.querySelector("input");
    if (title) title.focus();
  }

  @Event() clickOnInput;
  TriggerOnClickUserInputName(event: MouseEvent): void {
    this.clickOnInput.emit.call(this, {
      source: event.target as HTMLInputElement
    });
  }

  render() {
    return (
      <div class="CollapsedUserInput">
        <gxcf-dot class="DotPosition" />
        <input
          type="text"
          class="CollapsedTitle"
          value={this.userInput.Variable}
          onChange={event => this.TriggerOnModifyUserInputName(event)}
          onClick={event => this.TriggerOnClickUserInputName(event)}
        />
        <gxcf-down-arrow
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
