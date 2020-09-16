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
import { HintId, SelectTypes } from "../common/helpers";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { Hint } from "../hint/hint";

@Component({
  tag: "gxcf-user-input",
  assetsDirs: ["assets/gxcf-user-input-lang"],
  shadow: true
})
export class UserInput {
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
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

  @Event() setAskMessages: EventEmitter;
  triggerSetAskMessages(
    userInput: GXCFModel.UserInputElement,
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setAskMessages.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      askMessages: StringCollectionHelper.FormatCollection(
        userInput.RequiredMessages,
        index,
        value,
        remove
      )
    });
  }

  @Event() changeCondition: EventEmitter;
  triggerChangeCondition(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    const value = EventsHelper.GetConditionValue(event);
    this.changeCondition.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      newCondition: value
    });
  }

  @Event() setCleanContextValue: EventEmitter;
  triggerCleantContextChangeValue(userInput: GXCFModel.UserInputElement): void {
    this.setCleanContextValue.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      value: !userInput.CleanInContext
    });
  }

  @Event() changeTryLimit: EventEmitter;
  triggerTryLimitChange(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    event.preventDefault();
    const newValue: string = event.detail + "";
    this.changeTryLimit.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      value: newValue
    });
  }

  @Event() setOnErrorMessages: EventEmitter;
  triggerSetOnErrorMessages(
    userInput: GXCFModel.UserInputElement,
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setOnErrorMessages.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      errorMessages: StringCollectionHelper.FormatCollection(
        userInput.ErrorMessages,
        index,
        value,
        remove
      )
    });
  }

  @Event() selectValidationProcedure: EventEmitter;
  triggerOnChangeValidationProcedure(
    event,
    userInput: GXCFModel.UserInputElement
  ): void {
    console.log(event);
    this.selectValidationProcedure.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable
    });
  }

  @Event() changeUserInputRedirectCondition: EventEmitter;
  triggerChangeUserInputRedirectCondition(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ) {
    event.preventDefault();
    this.changeUserInputRedirectCondition.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      value: event.detail.value,
      index: event.detail.index
    });
  }

  @Event() changeUserInputRedirectTo: EventEmitter;
  triggerUserInputChangeRedirectTo(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    event.preventDefault();
    this.changeUserInputRedirectTo.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable,
      value: event.detail.value,
      index: event.detail.index
    });
  }

  @Event() addRedirection: EventEmitter;
  triggerAddRedirection(userInput: GXCFModel.UserInputElement) {
    this.addRedirection.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable
    });
  }

  @Event() deleteUserInput: EventEmitter;
  triggerDeleteUserInput(userInput: GXCFModel.UserInputElement) {
    this.deleteUserInput.emit.call(this, {
      flowName: this.flow.Name,
      userInput: userInput.Variable
    });
  }

  handleEditOnErrorMessage(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    this.triggerSetOnErrorMessages(
      userInput,
      event.detail.index,
      event.detail.value,
      false
    );
  }

  handleDeleteOnErrorMessage(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    this.triggerSetOnErrorMessages(userInput, event.detail, "", true);
  }

  switchAdvancedMode(): void {
    this.advanced = !this.advanced;
  }

  handleEditAskMessage(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    this.triggerSetAskMessages(
      userInput,
      event.detail.index,
      event.detail.value,
      false
    );
  }

  handleDeleteAskMessage(
    event: CustomEvent,
    userInput: GXCFModel.UserInputElement
  ): void {
    this.triggerSetAskMessages(userInput, event.detail, "", true);
  }

  private renderRedirections(
    userInput: GXCFModel.UserInputElement
  ): HTMLElement[] {
    3;
    const redirs: HTMLElement[] = new Array<HTMLElement>();
    if (userInput.Redirections.length > 0) {
      let index = 0;
      userInput.Redirections.forEach(function(redir) {
        redirs.push(
          <gxcf-redirection
            redirectionProperty={redir}
            flows={this.instance.Flows}
            requireCondition={true}
            redirectionIndex={index}
            onChangeRedirectCondition={(event: CustomEvent) =>
              this.triggerChangeUserInputRedirectCondition(event, userInput)
            }
            onChangeRedirectTo={(event: CustomEvent) =>
              this.triggerUserInputChangeRedirectTo(event, userInput)
            }
            label={this.componentLocale.redirectToLabel}
          />
        );
        index++;
      }, this);
    }
    redirs.push(
      <gxg-columns alignY="center">
        <gxg-button
          type="secondary-text-icon"
          icon="general/add"
          onClick={() => this.triggerAddRedirection(userInput)}
        >
          {this.componentLocale.addRedirection}
        </gxg-button>
        <gxcf-hint hintId={HintId.Redirection} />
      </gxg-columns>
    );
    return redirs;
  }

  cancelBubble(event: CustomEvent) {
    event.cancelBubble = true;
  }

  renderConditionToBeRequired(
    userInput: GXCFModel.UserInputElement
  ): HTMLElement {
    return (
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.conditionRequired}
        itemId={this.componentLocale.conditionRequired}
        padding="xs"
        onAccordionTitleClicked={(event: CustomEvent) =>
          this.cancelBubble(event)
        }
      >
        <gxcf-condition
          currentCondition={userInput.RequiredCondition}
          onConditionChange={event =>
            this.triggerChangeCondition(event, userInput)
          }
          label="Condition"
          hintId={HintId.Required}
        />
        <gxg-spacer-one space="s" />
        <gxg-spacer-layout orientation="horizontal" space="xs">
          <gxg-toggle
            label="Clean Context Value"
            onClick={() => this.triggerCleantContextChangeValue(userInput)}
            size="small"
            class="CleanContextToggle"
          />
          <gxcf-hint hintId={HintId.Required} />
        </gxg-spacer-layout>
      </gxg-accordion-item>
    );
  }

  renderAskMessages(userInput: GXCFModel.UserInputElement): HTMLElement {
    return (
      <gxg-accordion-item
        status="open"
        mode="slim"
        itemTitle={this.componentLocale.askMessages}
        itemId={this.componentLocale.askMessages}
        onAccordionTitleClicked={(event: CustomEvent) =>
          this.cancelBubble(event)
        }
      >
        <gxcf-collection
          collection={userInput.RequiredMessages}
          collectionAddText={this.componentLocale.addAskMessage}
          onEditItem={event => this.handleEditAskMessage(event, userInput)}
          onDeleteItem={event => this.handleDeleteAskMessage(event, userInput)}
          collectionHintId={HintId.AskMessages}
          collectionHeader={this.componentLocale.askMessages}
          defaultNewItemValue={userInput.Variable}
        />
      </gxg-accordion-item>
    );
  }

  hasValidationProcedure(userInput: GXCFModel.UserInputElement) {
    return (
      userInput.ValidationProcedure != null &&
      userInput.ValidationProcedure != ""
    );
  }

  renderValidateUserInput(userInput: GXCFModel.UserInputElement): HTMLElement {
    return (
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.validateUserInput}
        itemId={this.componentLocale.validateUserInput}
        onAccordionTitleClicked={(event: CustomEvent) =>
          this.cancelBubble(event)
        }
      >
        <gxg-spacer-layout orientation="vertical" space="xs">
          <gxcf-collection
            collection={userInput.ErrorMessages}
            collectionAddText={this.componentLocale.addErrorMessage}
            collectionHeader={this.componentLocale.errorMessagesHeader}
            onEditItem={event =>
              this.handleEditOnErrorMessage(event, userInput)
            }
            onDeleteItem={event =>
              this.handleDeleteOnErrorMessage(event, userInput)
            }
            collectionHintId={HintId.ErrorMessages}
            defaultNewItemValue={Locale.format(
              this.componentLocale.defaultErrorMessage,
              [userInput.Variable]
            )}
          />
          <gxg-spacer-layout orientation="horizontal" space="xs">
            <gxg-stepper
              value={userInput.TryLimit}
              onInput={(event: CustomEvent) =>
                this.triggerTryLimitChange(event, userInput)
              }
              label="Try Limit"
            />
            <gxcf-hint hintId={HintId.TryLimit} />
          </gxg-spacer-layout>

          <gxg-separator type="dashed" margin="s" />

          <gxg-title type="title-04">Validation Procedure</gxg-title>
          <gxg-spacer-layout orientation="horizontal" space="xs">
            <gxcf-select
              selectcaption={
                this.hasValidationProcedure(userInput)
                  ? userInput.ValidationProcedure
                  : this.componentLocale.selectValidationProcedure
              }
              selectIconType={
                this.hasValidationProcedure(userInput) ? "Procedure" : ""
              }
              selectType={
                this.hasValidationProcedure(userInput)
                  ? SelectTypes.Compact
                  : SelectTypes.Full
              }
              onClick={event =>
                this.triggerOnChangeValidationProcedure(event, userInput)
              }
            />
            <gxcf-hint hintId={HintId.ValidateUserInput} />
          </gxg-spacer-layout>
        </gxg-spacer-layout>
      </gxg-accordion-item>
    );
  }

  renderUserInputRedirections(
    userInput: GXCFModel.UserInputElement
  ): HTMLElement {
    return (
      <gxg-accordion-item
        mode="slim"
        itemTitle={this.componentLocale.redirection}
        itemId={this.componentLocale.redirection}
        onAccordionTitleClicked={(event: CustomEvent) =>
          this.cancelBubble(event)
        }
      >
        {this.renderRedirections(userInput)}
      </gxg-accordion-item>
    );
  }

  renderBasicMode(userInput: GXCFModel.UserInputElement) {
    return this.renderAskMessages(userInput);
  }

  renderAdvancedMode(userInput: GXCFModel.UserInputElement) {
    const elements: HTMLElement[] = [];
    elements.push(this.renderConditionToBeRequired(userInput));
    elements.push(this.renderBasicMode(userInput));
    elements.push(this.renderValidateUserInput(userInput));
    elements.push(this.renderUserInputRedirections(userInput));
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
          <div slot="subtitle">
            {userInput.RequiredMessages.length > 0
              ? userInput.RequiredMessages[0]
              : ""}
          </div>
          <gxcf-button-delete
            onConfirmDelete={() => this.triggerDeleteUserInput(userInput)}
            confirmationTitle={this.componentLocale.deleteUserInput}
            confirmationMessage={Locale.format(
              this.componentLocale.deleteUserInputConfirmation,
              [userInput.Variable]
            )}
            slot="meta"
          />
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
              on={this.advanced}
              class="ToggleColor"
            />
            <gxg-accordion mode="slim" padding="s">
              {this.advanced
                ? this.renderAdvancedMode(userInput)
                : this.renderBasicMode(userInput)}
            </gxg-accordion>
          </gxg-spacer-layout>
        </gxg-accordion-item>
      );
    }, this);
    return elements;
  }

  render() {
    return (
      <gxg-accordion single-item-open mode="boxed" padding="m">
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
