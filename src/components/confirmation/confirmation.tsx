import { Component, h, Prop, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";
import "@genexus/gemini";

@Component({
  tag: "gxcf-confirmation",
  shadow: true
})
export class Confirmation {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;
  @Prop() visible = false;
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
      <gxg-modal
        modalTitle={this.confirmationTitle}
        footerAlignment="right"
        visible={this.visible}
        zIndex={this.visible ? "10" : "-1"}
      >
        {this.confirmationMessage}
        <gxg-button
          type="outlined"
          slot="footer"
          onClick={event => this.TriggerUserCancellation(event)}
        >
          Cancel
        </gxg-button>
        <gxg-button
          type="outlined"
          slot="footer"
          onClick={event => this.TriggerUserConfirmation(event)}
        >
          Delete
        </gxg-button>
      </gxg-modal>
    );
  }
}
