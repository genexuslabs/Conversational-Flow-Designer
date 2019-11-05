import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  State,
  Listen
} from "@stencil/core";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { HintId } from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { CollectionType } from "../../global/conversational-editor/instance-definition/elements/iconversational-element";

@Component({
  tag: "user-input-full",
  styleUrl: "user-input-full.scss",
  shadow: false
})
export class FullUserInput {
  @Prop() userInput: UserInputElement;
  @Prop() flow: FlowElement;
  @State() enableAdvancedMode = false;
  @State() refresh = false;

  @Event() onCollapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event): void {
    this.onCollapseUserInput.emit(event);
  }

  @Event() onModifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event): void {
    this.onModifyUserInputName.emit(event);
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

  ChangeRequiredCondition(value): void {
    console.log(value);
  }

  @Listen("addObject")
  HandleAddObject(event): void {
    console.log(event);
    console.log("add redirection");
  }

  private RenderRedirections(): HTMLElement[] {
    const redirs: HTMLElement[] = new Array<HTMLElement>();
    if (this.userInput.Redirections.length > 0) {
      this.userInput.Redirections.forEach(function(redir) {
        redirs.push(
          <custom-redirection
            userInput={this.userInput}
            redirectionProperty={redir}
          />
        );
      }, this);
    } else {
      redirs.push(<custom-redirection userInput={this.userInput} />);
    }
    redirs.push(<add-object collectionAddText="Add another redirection" />);
    return redirs;
  }

  private RenderBasicMode(): HTMLElement {
    return (
      <details open>
        <summary class="UserInputPart">
          <span class="UserInputPartSummaryText">Ask messages</span>
        </summary>
        <custom-hint hintId={HintId.AskMessages} class="UserInputHints" />
        <custom-collection
          collection={this.userInput.RequiredMessages}
          collectionAddText="Add another ask message"
          itemParent={this.userInput}
          collectionType={CollectionType.AskMessages}
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
          <custom-hint hintId={HintId.Required} class="UserInputHints" />
          <custom-condition
            currentCondition={this.userInput.RequiredCondition}
            onConditionChange={this.ChangeRequiredCondition}
          />
        </details>
        {this.RenderBasicMode()}
        <details>
          <summary class="UserInputPart">
            <span class="UserInputPartSummaryText">Validate User Input</span>
          </summary>
          <div>
            <custom-hint hintId={HintId.ErrorMessages} class="UserInputHints" />
            <custom-collection
              collection={this.userInput.ErrorMessages}
              collectionAddText="Add another error message"
              itemParent={this.userInput}
              collectionType={CollectionType.OnErrorMessages}
              collectionHeader="Entity or Data Type Error messages"
            />
          </div>
          <div class="ContainerForUserInput">
            <custom-hint hintId={HintId.TryLimit} class="UserInputHints" />
            <span>Try Limit</span>
            <input
              class="UserInputLine"
              placeholder="0 - No limits"
              value={this.userInput.TryLimit}
            />
            <hr class="Separator"></hr>
          </div>
          <div class="ContainerForUserInput">
            <custom-hint
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
          <custom-hint hintId={HintId.Redirection} class="UserInputHints" />
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
        <up-arrow
          class="ExpandUserInputDownArrow"
          onClick={event => this.TriggerOnCollapseUserInput(event)}
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
