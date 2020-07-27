import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  State,
  Listen,
  Element
} from "@stencil/core";
import { HintId } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-user-input-full",
  styleUrl: "user-input-full.scss",
  shadow: true,
  assetsDirs: ["assets/gxcf-user-input-full-lang"]
})
export class FullUserInput {
  @Prop() userInput: GXCFModel.UserInputElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @State() enableAdvancedMode = false;
  @Element() element: HTMLElement;

  private componentLocale: any;

  @Event() collapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event): void {
    this.collapseUserInput.emit(event);
  }

  @Event() modifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event): void {
    this.modifyUserInputName.emit(event);
  }

  @Event() selectValidationProcedure: EventEmitter;
  TriggerOnChangeValidationProcedure(event): void {
    console.log(event);
    this.selectValidationProcedure.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  SwitchAdvancedMode(event): void {
    console.log(event);
    this.enableAdvancedMode = !this.enableAdvancedMode;
  }

  @Event() changeCondition: EventEmitter;
  TriggerChangeCondition(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    this.changeCondition.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      newCondition: value
    });
  }

  @Listen("addObject")
  HandleAddObject(event: Event): void {
    console.log(event);
    console.log("add redirection");
  }

  @Event() changeTryLimit: EventEmitter;
  TriggerTryLimitChange(event: CustomEvent): void {
    event.preventDefault();
    const newValue: string = event.detail + "";
    this.changeTryLimit.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: newValue
    });
  }
  @Event() addRedirection: EventEmitter;
  TriggerAddRedirection() {
    this.addRedirection.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  @Event() setAskMessages: EventEmitter;
  TriggerSetAskMessages(index: number, value: string, remove: boolean): void {
    this.setAskMessages.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      askMessages: StringCollectionHelper.FormatCollection(
        this.userInput.RequiredMessages,
        index,
        value,
        remove
      )
    });
  }

  @Event() setCleanContextValue: EventEmitter;
  TriggerCleantContextChangeValue(): void {
    this.setCleanContextValue.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: !this.userInput.CleanInContext
    });
  }

  HandleEditAskMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetAskMessages(+index, value, false);
  }

  HandleDeleteAskMessage(event: CustomEvent): void {
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetAskMessages(+index, "", true);
  }

  @Event() setOnErrorMessages: EventEmitter;
  TriggerSetOnErrorMessages(
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setOnErrorMessages.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      errorMessages: StringCollectionHelper.FormatCollection(
        this.userInput.ErrorMessages,
        index,
        value,
        remove
      )
    });
  }

  HandleEditOnErrorMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetOnErrorMessages(+index, value, false);
  }

  HandleDeleteOnErrorMessage(event: CustomEvent): void {
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetOnErrorMessages(+index, "", true);
  }

  @Event() deleteUserInputFull: EventEmitter;
  TriggerDeleteUserInput(event): void {
    this.deleteUserInputFull.emit(event);
  }

  @Event() changeUserInputRedirectCondition: EventEmitter;
  TriggerChangeUserInputRedirectCondition(event: CustomEvent) {
    event.preventDefault();
    this.changeUserInputRedirectCondition.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: event.detail.value,
      index: event.detail.index
    });
  }

  @Event() changeUserInputRedirectTo: EventEmitter;
  TriggerUserInputChangeRedirectTo(event: CustomEvent): void {
    event.preventDefault();
    this.changeUserInputRedirectTo.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: event.detail.value,
      index: event.detail.index
    });
  }

  @Event() clickOnUserInput;
  @Event() clickOnUserInputNameInternal;
  TriggerOnClickUserInputName(event: MouseEvent): void {
    console.log(event);
    this.clickOnUserInputNameInternal.emit();
    this.clickOnUserInput.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  private RenderRedirections(): HTMLElement[] {
    3;
    const redirs: HTMLElement[] = new Array<HTMLElement>();
    if (this.userInput.Redirections.length > 0) {
      let index = 0;
      this.userInput.Redirections.forEach(function(redir) {
        redirs.push(
          <gxcf-redirection
            redirectionProperty={redir}
            flows={this.instance.Flows}
            requireCondition={true}
            redirectionIndex={index}
            onChangeRedirectCondition={(event: CustomEvent) =>
              this.TriggerChangeUserInputRedirectCondition(event)
            }
            onChangeRedirectTo={(event: CustomEvent) =>
              this.TriggerUserInputChangeRedirectTo(event)
            }
            label={this.componentLocale.redirectToLabel}
          />
        );
        index++;
      }, this);
    }
    redirs.push(
      <gxcf-add-object
        addText={this.componentLocale.addRedirection}
        onClick={() => this.TriggerAddRedirection()}
      />
    );
    return redirs;
  }

  private RenderBasicMode(): HTMLElement {
    return (
      <details open>
        <summary class="UserInputPart">
          <span class="UserInputPartSummaryText gxg-title-03">
            {this.componentLocale.askMessages}
          </span>
        </summary>
        <gxcf-collection
          collection={this.userInput.RequiredMessages}
          collectionAddText={this.componentLocale.addAskMessage}
          onEditItem={event => this.HandleEditAskMessage(event)}
          onDeleteItem={event => this.HandleDeleteAskMessage(event)}
          collectionHintId={HintId.AskMessages}
          collectionHeader={this.componentLocale.askMessages}
          defaultNewItemValue={this.userInput.Variable}
        />
      </details>
    );
  }

  private GetCleanContextSwitchIconClass(): string {
    if (this.userInput.CleanInContext) return "SwitchIconOn";
    return "SwitchIconOff";
  }

  @Event() setUserInputEntity: EventEmitter;
  private TriggerSetUserInputEntity(event): void {
    const entity = EventsHelper.GetValueFromInput(event);
    this.setUserInputEntity.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: entity
    });
  }

  private RenderAdvancedMode(): HTMLElement {
    return (
      <div>
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText gxg-title-03">
              {this.componentLocale.conditionRequired}
            </span>
          </summary>
          <gxcf-hint hintId={HintId.Required} class="UserInputHints" />
          <gxcf-condition
            currentCondition={this.userInput.RequiredCondition}
            onConditionChange={event => this.TriggerChangeCondition(event)}
          />
          <gxg-toggle
            label="Clean Context Value"
            onClick={() => this.TriggerCleantContextChangeValue()}
            size="small"
            class="CleanContextToggle"
          />
        </details>
        {this.RenderBasicMode()}
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText gxg-title-03">
              {this.componentLocale.validateUserInput}
            </span>
          </summary>
          <div>
            <gxcf-collection
              collection={this.userInput.ErrorMessages}
              collectionAddText={this.componentLocale.addErrorMessage}
              collectionHeader={this.componentLocale.errorMessagesHeader}
              onEditItem={event => this.HandleEditOnErrorMessage(event)}
              onDeleteItem={event => this.HandleDeleteOnErrorMessage(event)}
              collectionHintId={HintId.ErrorMessages}
              defaultNewItemValue={Locale.format(
                this.componentLocale.defaultErrorMessage,
                [this.userInput.Variable]
              )}
            />
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint hintId={HintId.TryLimit} class="UserInputHints" />
            <gxg-stepper
              value={this.userInput.TryLimit}
              onInput={(event: CustomEvent) =>
                this.TriggerTryLimitChange(event)
              }
              label="Try Limit"
              //   inlineFlex={true}
            />
            <hr class="Separator"></hr>
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint
              hintId={HintId.ValidateUserInput}
              class="UserInputHints"
            />
            <span class="gxg-title-01">Validation Procedure</span>
            <input
              class="UserInputLine SelectVP gxg-text"
              placeholder={this.componentLocale.validationProcedurePlaceHolder}
              value={this.userInput.ValidationProcedure}
              onClick={event => this.TriggerOnChangeValidationProcedure(event)}
            />
          </div>
        </details>
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText gxg-title-03">
              Redirection
            </span>
          </summary>
          <gxcf-hint hintId={HintId.Redirection} class="UserInputHints" />
          {this.RenderRedirections()}
        </details>
      </div>
    );
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  render() {
    let editionMode: HTMLElement;
    let advancedEditionStatus: string;
    if (this.enableAdvancedMode) {
      editionMode = this.RenderAdvancedMode();
      advancedEditionStatus = this.componentLocale.advancedModeOn;
    } else {
      advancedEditionStatus = this.componentLocale.advancedModeOff;
      editionMode = this.RenderBasicMode();
    }

    return (
      <div class="FullUserInput">
        <input
          type="text"
          class="UserInputTitle gxg-title-01"
          value={this.userInput.Variable}
          onClick={event => this.TriggerOnClickUserInputName(event)}
          readonly
        />
        <gxg-icon
          size="regular"
          type="chevron-up"
          class="UserInputCommandsPosition"
          onClick={event => this.TriggerOnCollapseUserInput(event)}
        />
        <gxcf-button-delete
          class="UserInputCommandsPosition"
          onConfirmDelete={event => this.TriggerDeleteUserInput(event)}
          confirmationTitle={this.componentLocale.deleteUserInput}
          confirmationMessage={Locale.format(
            this.componentLocale.deleteUserInputConfirmation,
            [this.userInput.Variable]
          )}
          type="close"
        />
        <div class="Entity">
          <span class="gxg-title-03">Entity: </span>
          <input
            type="text"
            placeholder={this.componentLocale.noneEntity}
            class="EntityInput gxg-text"
            onChange={event => this.TriggerSetUserInputEntity(event)}
            value={this.userInput.Entity}
          />
        </div>
        <gxg-toggle
          size="small"
          label={advancedEditionStatus}
          onClick={event => this.SwitchAdvancedMode(event)}
          class="ToggleColor"
        />
        {editionMode}
      </div>
    );
  }
}
