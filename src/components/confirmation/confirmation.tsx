import { Component, h, Prop, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";
import "@genexus/gemini";

@Component({
  tag: "gxcf-confirmation",
  styleUrl: "confirmation.scss",
  shadow: true
})
export class Confirmation {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;
  @Element() element: HTMLElement;

  @Event() userConfirmation: EventEmitter;
  TriggerUserConfirmation(event): void {
    this.userConfirmation.emit(event);
  }

  @Event() userCancellation: EventEmitter;
  TriggerUserCancellation(event): void {
    this.userCancellation.emit(event);
  }

  handleKeyDown(event): void {
    console.log(event.keyCode);
    if (event.key === "Escape") {
      this.userCancellation.emit(event);
    }
  }

  componentDidRender(): void {
    document.onkeydown = (event: KeyboardEvent) => this.handleKeyDown(event);
  }

  render() {
    return (
      <div class="ConfirmationModal gxg-text">
        <div class="ConfirmationHeader gxg-text--negative">
          <span class="ConfirmationTitleText">{this.confirmationTitle}</span>
          <gxg-icon
            type="close"
            size="small"
            color="negative"
            class="CloseComponent"
            onClick={event => this.TriggerUserCancellation(event)}
          />
        </div>
        <div class="ConfirmationContent">
          <p class="gxg-text">{this.confirmationMessage}</p>
          <div class="ButtonPlaceHolder">
            <gxg-button
              type="outlined"
              class="ConfirmationButtonPosition"
              onClick={event => this.TriggerUserCancellation(event)}
            >
              Cancel
            </gxg-button>
            <gxg-button
              type="outlined"
              class="ConfirmationButtonPosition"
              onClick={event => this.TriggerUserConfirmation(event)}
            >
              Delete
            </gxg-button>
          </div>
        </div>
      </div>
    );
  }
}
