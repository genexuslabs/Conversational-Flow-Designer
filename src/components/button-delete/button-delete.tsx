import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import "@genexus/gemini";

@Component({
  tag: "gxcf-button-delete",
  styleUrl: "button-delete.scss",
  shadow: true
})
export class ButtonDelete {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;
  @Prop() type: "deleted" | "close" = "deleted";

  private confirmListener = this.TriggerConfirmDelete.bind(this);
  private closeListener = this.HandleCloseConfirmation.bind(this);

  @Event() confirmDelete: EventEmitter;
  TriggerConfirmDelete(event): void {
    this.HandleCloseConfirmation(event);
    this.confirmDelete.emit(event);
  }

  HandleDeleteIntention(event): void {
    console.log(event);
    const confirmation: HTMLGxcfConfirmationElement = document.querySelector(
      "gxcf-confirmation"
    );
    confirmation.confirmationTitle = this.confirmationTitle;
    confirmation.confirmationMessage = this.confirmationMessage;
    confirmation.addEventListener("userConfirmation", this.confirmListener);
    confirmation.addEventListener("userCancellation", this.closeListener);
    confirmation.visible = true;
  }

  HandleCloseConfirmation(event): void {
    console.log(event);
    const confirmation: HTMLGxcfConfirmationElement = document.querySelector(
      "gxcf-confirmation"
    );
    confirmation.confirmationTitle = "";
    confirmation.confirmationMessage = "";

    confirmation.removeEventListener("userConfirmation", this.confirmListener);
    confirmation.removeEventListener("userCancellation", this.closeListener);
    confirmation.visible = false;
  }

  private getSize() {
    if (this.type == "close") return "small";
    return "regular";
  }

  render() {
    return (
      <gxg-icon
        size={this.getSize()}
        type={this.type}
        onClick={event => this.HandleDeleteIntention(event)}
        class="DeleteFlow"
        color="primary"
      />
    );
  }
}
