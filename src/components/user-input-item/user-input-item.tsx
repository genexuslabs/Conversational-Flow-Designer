import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  Element,
  State
} from "@stencil/core";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-user-input-item",
  assetsDirs: ["assets/gxcf-user-input-item-lang"]
})
export class UserInputItem {
  @Prop() userInput: GXCFModel.UserInputElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Element() element: HTMLElement;
  @State() enableAdvancedMode = false;

  private componentLocale: any;

  getFirstAskMessage(): string {
    if (this.userInput.RequiredMessages.length > 0)
      return this.userInput.RequiredMessages[0];
    return "";
  }

  @Event() clickOnUserInputName;
  TriggerClickOnUserInputName(): void {
    this.clickOnUserInputName.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  switchAdvancedMode(): void {
    this.enableAdvancedMode = !this.enableAdvancedMode;
  }

  renderBasicMode() {
    return "";
  }

  renderAdvancedMode() {
    return "";
  }

  render() {
    return (
      <gxg-accordion-item
        item-title={this.userInput.Variable}
        mode="boxed"
        padding="xs"
        itemId={this.userInput.Variable}
        onAccordionTitleClicked={() => this.TriggerClickOnUserInputName()}
      >
        Test
      </gxg-accordion-item>
    );
  }
}
/*
<div slot="subtitle">{this.getFirstAskMessage()}</div>
        <div class="Entity">
          <span class="gxg-title-03">Entity: </span>
          <input
            type="text"
            placeholder={this.componentLocale.noneEntity}
            class="EntityInput gxg-text"
            //onChange={event => this.TriggerSetUserInputEntity(event)}
            value={this.userInput.Entity}
          />
        </div>
        <gxg-toggle
          size="small"
          // label={advancedEditionStatus}
          //  onClick={event => this.SwitchAdvancedMode(event)}
          class="ToggleColor"
        />
*/
