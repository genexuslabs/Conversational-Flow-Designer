import { Component, h, Prop, Event } from "@stencil/core";
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
