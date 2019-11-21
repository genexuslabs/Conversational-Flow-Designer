import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  State,
  Listen
} from "@stencil/core";
import {
  UserInputElement,
  RequiredTypes
} from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { HintId } from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";

@Component({
  tag: "gxcf-user-input-full",
  styleUrl: "user-input-full.scss",
  shadow: false
})
export class FullUserInput {
  @Prop() userInput: UserInputElement;
  @Prop() flow: FlowElement;
  @State() enableAdvancedMode = false;
  @State() refresh = false;

  @Event() collapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event): void {
    this.collapseUserInput.emit(event);
  }

  @Event() modifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event): void {
    this.modifyUserInputName.emit(event);
  }

  TriggerOnChangeValidationProcedure(event): void {
    console.log(event);
    EventHandler.SelectValidationProcedure(this.flow, this.userInput).then(
      uInput => {
        this.userInput = uInput;
        this.refresh = !this.refresh;
      }
    );
  }

  SwitchAdvancedMode(event): void {
    console.log(event);
    this.enableAdvancedMode = !this.enableAdvancedMode;
  }

  HandleChangeCondition(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    this.userInput.Required = RequiredTypes.Condition;
    this.userInput.RequiredCondition = value;
    if (window.external.SetUserInputRequiredCondition)
      window.external.SetUserInputRequiredCondition(
        this.flow.Name,
        this.userInput.Variable,
        value
      );
  }

  @Listen("addObject")
  HandleAddObject(event: Event): void {
    console.log(event);
    console.log("add redirection");
  }

  HandleTryLimitChange(event: CustomEvent): void {
    const value: string = EventHandler.GetValueFromInput(event);
    this.userInput.SetTryLimit(+value);
    console.log(value);
  }

  HandleAddRedirection(event) {
    console.log(event);
    this.userInput.AddNewRedirection();
    this.refresh = !this.refresh;
  }

  HandleEditAskMessage(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.userInput.SetAskMessage(+index, value);
  }

  HandleDeleteAskMessage(event: CustomEvent): void {
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    console.log("Index: " + index);
    this.userInput.DeleteAskMessage(+index);
  }

  HandleEditOnErrorMessage(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.userInput.SetOnErrorMessage(+index, value);
  }

  HandleDeleteOnErrorMessage(event: CustomEvent): void {
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.userInput.DeleteOnErrorMessage(+index);
  }

  @Event() deleteUserInputFull: EventEmitter;
  TriggerDeleteUserInput(event): void {
    this.deleteUserInputFull.emit(event);
  }

  private RenderRedirections(): HTMLElement[] {
    const redirs: HTMLElement[] = new Array<HTMLElement>();
    if (this.userInput.Redirections.length > 0) {
      this.userInput.Redirections.forEach(function(redir) {
        redirs.push(
          <gxcf-redirection
            element={this.userInput}
            redirectionProperty={redir}
          />
        );
      }, this);
    } else {
      redirs.push(
        <gxcf-redirection element={this.userInput} requireCondition={true} />
      );
    }
    redirs.push(
      <gxcf-add-object
        addText="Add another redirection"
        onClick={event => this.HandleAddRedirection(event)}
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
        />
      </details>
    );
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
            onConditionChange={event => this.HandleChangeCondition(event)}
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
                this.HandleTryLimitChange(event)
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
        />
        <gxcf-up-arrow
          class="UserInputCommandsPosition"
          onClick={event => this.TriggerOnCollapseUserInput(event)}
        />
        <gxcf-button-delete
          class="UserInputCommandsPosition"
          onClick={event => this.TriggerDeleteUserInput(event)}
        />
        <p class="DataType">Datatype: {this.userInput.DataType}</p>
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
