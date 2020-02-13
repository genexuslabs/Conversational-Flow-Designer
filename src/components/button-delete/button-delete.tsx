import { Component, h, State, Prop, Event, EventEmitter } from "@stencil/core";
import "@genexus/gemini";

@Component({
  tag: "gxcf-button-delete",
  styleUrl: "button-delete.scss",
  shadow: true
})
export class ButtonDelete {
  @State() askConfirmation = false;
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;

  @Event() confirmDelete: EventEmitter;
  TriggerConfirmDelete(event): void {
    this.confirmDelete.emit(event);
    this.HandleCloseConfirmation(event);
  }

  HandleDeleteIntention(event): void {
    console.log(event);
    this.askConfirmation = true;
  }

  HandleCloseConfirmation(event): void {
    console.log(event);
    this.askConfirmation = false;
  }

  private deleteButton(): HTMLElement {
    return (
      <gxg-icon
        size="regular"
        type="deleted"
        onClick={event => this.HandleDeleteIntention(event)}
        class="DeleteFlow"
      />
    );
  }

  private confirmationModal(): HTMLElement {
    return (
      <gxcf-confirmation
        confirmationTitle={this.confirmationTitle}
        confirmationMessage={this.confirmationMessage}
        onUserConfirmation={event => this.TriggerConfirmDelete(event)}
        onUserCancellation={event => this.HandleCloseConfirmation(event)}
      />
    );
  }

  render() {
    if (!this.askConfirmation) return this.deleteButton();
    else
      return (
        <div>
          {this.deleteButton()}
          {this.confirmationModal()}
        </div>
      );
  }
}
