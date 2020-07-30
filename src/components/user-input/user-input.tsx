import {
  Component,
  Prop,
  h,
  Event,
  Element,
  State,
  EventEmitter
} from "@stencil/core";
import { Locale } from "../common/locale";
import { EventsHelper } from "../common/events-helper";

@Component({
  tag: "gxcf-user-input",
  assetsDirs: ["assets/gxcf-user-input-lang"],
  shadow: true
})
export class UserInput {
  @Prop() flow: GXCFModel.FlowElement;
  @Element() element: HTMLElement;
  @State() advanced = false;
  private componentLocale: any;

  @Event() clickOnUserInputName;
  triggerClickOnUserInputName(userInput: GXCFModel.UserInputElement): void {
    this.clickOnUserInputName.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable
    });
  }

  @Event() setUserInputEntity: EventEmitter;
  private triggerSetUserInputEntity(event: CustomEvent, userInput): void {
    console.log(event);
    this.setUserInputEntity.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      value: event.detail
    });
  }

  @Event() selectUserInput: EventEmitter;
  triggerSelectUserInput(userInput): void {
    this.selectUserInput.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable
    });
  }

  getFirstAskMessage(userInput: GXCFModel.UserInputElement): string {
    if (userInput.RequiredMessages.length > 0)
      return userInput.RequiredMessages[0];
    return "";
  }

  switchAdvancedMode(): void {
    this.advanced = !this.advanced;
  }

  renderBasicMode() {
    return (
      <gxg-accordion-item
        status="open"
        mode="slim"
        itemTitle={this.componentLocale.askMessages}
        itemId={this.componentLocale.askMessages}
      ></gxg-accordion-item>
    );
  }

  renderAdvancedMode() {
    const elements: HTMLElement[] = [];
    elements.push(
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.conditionRequired}
        itemId={this.componentLocale.conditionRequired}
      ></gxg-accordion-item>
    );
    elements.push(this.renderBasicMode());
    elements.push(
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.validateUserInput}
        itemId={this.componentLocale.validateUserInput}
      ></gxg-accordion-item>
    );
    elements.push(
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.redirection}
        itemId={this.componentLocale.redirection}
      ></gxg-accordion-item>
    );
    return elements;
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  renderUserInputs(): HTMLElement[] {
    const elements: HTMLElement[] = [];
    this.flow.Fields.forEach(function(userInput) {
      elements.push(
        <gxg-accordion-item
          item-title={userInput.Variable}
          mode="boxed"
          padding="xs"
          itemId={userInput.Variable}
          onAccordionTitleClicked={() =>
            this.triggerClickOnUserInputName(userInput)
          }
          onClick={() => this.triggerSelectUserInput(userInput)}
        >
          <div slot="subtitle">{this.getFirstAskMessage(userInput)}</div>
          <gxg-spacer-layout
            space="xs"
            orientation="vertical"
            justify-content="flex-start"
          >
            <span class="gxg-title-03">
              {this.componentLocale.entity + " " + userInput.Entity}
            </span>
            <gxg-toggle
              size="small"
              label={
                this.advanced
                  ? this.componentLocale.advancedModeOn
                  : this.componentLocale.advancedModeOff
              }
              onClick={() => this.switchAdvancedMode()}
              class="ToggleColor"
            />
            <gxg-accordion mode="slim" padding="s">
              {this.advanced
                ? this.renderAdvancedMode()
                : this.renderBasicMode()}
            </gxg-accordion>
          </gxg-spacer-layout>
        </gxg-accordion-item>
      );
    }, this);
    return elements;
  }

  render() {
    return (
      <gxg-accordion /*single-item-open*/ mode="boxed" padding="m">
        {this.renderUserInputs()}
      </gxg-accordion>
    );
  }
}
/*
<div class="Entity">
            <span class="gxg-title-03">Entity: </span>
            <input
              type="text"
              placeholder={this.componentLocale.noneEntity}
              class="EntityInput gxg-text"
              onChange={event =>
                this.triggerSetUserInputEntity(event, userInput)
              }
              value={userInput.Entity}
            />
          </div>
*/
