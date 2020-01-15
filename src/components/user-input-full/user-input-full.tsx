import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  State,
  Listen
} from "@stencil/core";
import { HintId } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";

@Component({
  tag: "gxcf-user-input-full",
  styleUrl: "user-input-full.scss",
  shadow: true
})
export class FullUserInput {
  @Prop() userInput: GXCFModel.UserInputElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @State() enableAdvancedMode = false;

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
    const value: string = EventsHelper.GetValueFromInput(event);
    this.changeTryLimit.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      value: value
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

  @Event() clickOnInput;
  TriggerOnClickUserInputName(event: MouseEvent): void {
    this.clickOnInput.emit.call(this, {
      source: event.target as HTMLInputElement
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
          />
        );
        index++;
      }, this);
    } else {
      redirs.push(
        <gxcf-redirection
          requireCondition={true}
          flows={this.instance.Flows}
          redirectionIndex={0}
          onChangeRedirectCondition={(event: CustomEvent) =>
            this.TriggerChangeUserInputRedirectCondition(event)
          }
          onChangeRedirectTo={(event: CustomEvent) =>
            this.TriggerUserInputChangeRedirectTo(event)
          }
        />
      );
    }
    redirs.push(
      <gxcf-add-object
        addText="Add another redirection"
        onClick={() => this.TriggerAddRedirection()}
      />
    );
    return redirs;
  }

  private RenderBasicMode(): HTMLElement {
    return (
      <details open>
        <summary class="UserInputPart">
          <span class="UserInputPartSummaryText">Ask messages</span>
        </summary>
        <gxcf-collection
          collection={this.userInput.RequiredMessages}
          collectionAddText="Add another ask message"
          onEditItem={event => this.HandleEditAskMessage(event)}
          onDeleteItem={event => this.HandleDeleteAskMessage(event)}
          collectionHintId={HintId.AskMessages}
          collectionHeader="Ask Messages"
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
            <span class="UserInputPartSummaryText">
              Condition to be required
            </span>
          </summary>
          <gxcf-hint hintId={HintId.Required} class="UserInputHints" />
          <gxcf-condition
            currentCondition={this.userInput.RequiredCondition}
            onConditionChange={event => this.TriggerChangeCondition(event)}
          />
          <p class="CleanContextLabel">Clean Context Value</p>
          <div
            class={`${this.GetCleanContextSwitchIconClass()} CleanContextIcon`}
            onClick={() => this.TriggerCleantContextChangeValue()}
          />
        </details>
        {this.RenderBasicMode()}
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText">Validate User Input</span>
          </summary>
          <div>
            <gxcf-collection
              collection={this.userInput.ErrorMessages}
              collectionAddText="Add another error message"
              collectionHeader="Entity or Data Type Error messages"
              onEditItem={event => this.HandleEditOnErrorMessage(event)}
              onDeleteItem={event => this.HandleDeleteOnErrorMessage(event)}
              collectionHintId={HintId.ErrorMessages}
              defaultNewItemValue={`${this.userInput.Variable} error`}
            />
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint hintId={HintId.TryLimit} class="UserInputHints" />
            <span>Try Limit</span>
            <input
              class="UserInputLine"
              placeholder="0 - No limits"
              value={this.userInput.TryLimit}
              onChange={(event: CustomEvent) =>
                this.TriggerTryLimitChange(event)
              }
            />
            <hr class="Separator"></hr>
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint
              hintId={HintId.ValidateUserInput}
              class="UserInputHints"
            />
            <span>Validation Procedure</span>
            <input
              class="UserInputLine SelectVP"
              placeholder="Select a Validation Procedure"
              value={this.userInput.ValidationProcedure}
              onClick={event => this.TriggerOnChangeValidationProcedure(event)}
            />
          </div>
        </details>
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText">Redirection</span>
          </summary>
          <gxcf-hint hintId={HintId.Redirection} class="UserInputHints" />
          {this.RenderRedirections()}
        </details>
      </div>
    );
  }

  render() {
    let editionMode: HTMLElement;
    let advancedEditionStatus: string;
    let switchClass: string;
    if (this.enableAdvancedMode) {
      switchClass = "SwitchIconOn";
      editionMode = this.RenderAdvancedMode();
      advancedEditionStatus = "ON";
    } else {
      switchClass = "SwitchIconOff";
      advancedEditionStatus = "OFF";
      editionMode = this.RenderBasicMode();
    }

    return (
      <div class="FullUserInput">
        <input
          type="text"
          class="UserInputTitle"
          value={this.userInput.Variable}
          onChange={event => this.TriggerOnModifyUserInputName(event)}
          onClick={event => this.TriggerOnClickUserInputName(event)}
        />
        <gxcf-up-arrow
          class="UserInputCommandsPosition"
          onClick={event => this.TriggerOnCollapseUserInput(event)}
        />
        <gxcf-button-delete
          class="UserInputCommandsPosition"
          onConfirmDelete={event => this.TriggerDeleteUserInput(event)}
          confirmationTitle="Delete user input"
          confirmationMessage={`Do you want to delete the user input '${this.userInput.Variable}'?`}
        />
        <p class="DataType">Datatype: {this.userInput.DataType}</p>
        <div>
          <span>Entity: </span>
          <input
            type="text"
            placeholder="None"
            class="EntityInput"
            onChange={event => this.TriggerSetUserInputEntity(event)}
          />
        </div>
        <img
          class={switchClass}
          onClick={event => this.SwitchAdvancedMode(event)}
        />
        <span class="TextMode">Advanced mode {advancedEditionStatus}</span>
        {editionMode}
      </div>
    );
  }
}
