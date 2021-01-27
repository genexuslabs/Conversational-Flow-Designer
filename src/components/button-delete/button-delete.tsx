import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-button-delete",
  shadow: true
})
export class ButtonDelete {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;
  @Prop() type: "deleted" | "close" = "deleted";

  private confirmListener = this.triggerConfirmDelete.bind(this);
  private closeListener = this.handleCloseConfirmation.bind(this);

  @Event() confirmDelete: EventEmitter;
  triggerConfirmDelete(event): void {
    this.handleCloseConfirmation(event);
    this.confirmDelete.emit(event);
  }

  handleDeleteIntention(event): void {
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

  handleCloseConfirmation(event): void {
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

  render() {
    return (
      <gxg-button
        icon="gemini-tools/delete"
        type="secondary-icon-only"
        onClick={event => this.handleDeleteIntention(event)}
      />
    );
  }
}
