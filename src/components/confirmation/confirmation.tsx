import { Component, h, Prop, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-confirmation",
  shadow: true,
  assetsDirs: ["assets/gxcf-confirmation-lang"]
})
export class Confirmation {
  @Prop() confirmationTitle: string;
  @Prop() confirmationMessage: string;
  @Prop() visible = false;
  @Element() element: HTMLElement;

  private componentLocale: any;

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

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  render() {
    return (
      <gxg-modal modalTitle={this.confirmationTitle} visible={this.visible}>
        {this.confirmationMessage}
        <gxg-button
          type="outlined"
          slot="footer"
          onClick={event => this.TriggerUserCancellation(event)}
        >
          {this.componentLocale.cancel}
        </gxg-button>
        <gxg-button
          type="outlined"
          slot="footer"
          onClick={event => this.TriggerUserConfirmation(event)}
          style={{ marginLeft: "var(--spacing-comp-01)" }}
        >
          {this.componentLocale.delete}
        </gxg-button>
      </gxg-modal>
    );
  }
}
