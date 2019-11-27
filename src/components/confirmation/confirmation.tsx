import { Component, h, Prop, Event } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
  tag: "gxcf-confirmation",
  styleUrl: "confirmation.scss",
  shadow: true
})
export class Confirmation {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;

  @Event() userConfirmation: EventEmitter;
  TriggerUserConfirmation(event): void {
    this.userConfirmation.emit(event);
  }

  @Event() userCancellation: EventEmitter;
  TriggerUserCancellation(event): void {
    this.userCancellation.emit(event);
  }

  render() {
    return (
      <div class="ConfirmationModal">
        <div class="ConfirmationTitle">{this.confirmationTitle}</div>
        <div class="ConfirmationContent">
          <p class="ConfirmationMessage">{this.confirmationMessage}</p>
          <div class="ButtonPlaceHolder">
            <button
              class="ConfirmationButtonNo ConfirmationButton"
              onClick={event => this.TriggerUserCancellation(event)}
            >
              No
            </button>
            <button
              class="ConfirmationButtonYes ConfirmationButton"
              onClick={event => this.TriggerUserConfirmation(event)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}
