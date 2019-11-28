import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import {
  HintId,
  SelectTypes
} from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-flow-full",
  styleUrl: "flow-full.scss",
  shadow: true
})
export class FlowFull {
  @Prop() flow: FlowElement;
  @State() refresh = true;
  @State() expandTriggers = false;

  @Event() collapseFlow: EventEmitter;
  TriggerOnCollapseFlow(event): void {
    this.collapseFlow.emit(event);
  }

  TriggerOnAddUserInput(event): void {
    console.log(event);
    this.flow.NewUserInput();
    this.refresh = !this.refresh;
  }

  TriggerOnAddResponse(event): void {
    console.log(event);
    this.flow.NewResponse();
    this.refresh = !this.refresh;
  }

  get SummaryId(): string {
    return `GXCFSum_${this.flow.Id}`;
  }

  get ArrowId(): string {
    return `GXCFArrow_${this.flow.Id}`;
  }

  get SelectId(): string {
    return `GXCFSelectId_${this.flow.Id}`;
  }

  get DescriptionId(): string {
    return `GXCFDescriptionId_${this.flow.Id}`;
  }

  get CollectionHeader(): string {
    return `Sample trigger messages (${this.flow.TriggerMessages.length.toString()})`;
  }

  HandleDeleteUserInput(event: CustomEvent, userInput: UserInputElement): void {
    console.log(event);
    this.flow.DeleteUserInput(userInput);
    this.refresh = !this.refresh;
  }

  HandleDeleteResponse(event: CustomEvent, response: ResponseElement): void {
    console.log(event);
    this.flow.DeleteResponse(response);
    this.refresh = !this.refresh;
  }

  private RenderizeUserInputs(): HTMLElement[] {
    const userInputs: HTMLElement[] = [];
    this.flow.UserInputs.forEach(function(userInput) {
      userInputs.push(
        <gxcf-user-input-container
          userInput={userInput}
          flow={this.flow}
          onDeleteUserInput={event =>
            this.HandleDeleteUserInput(event, userInput)
          }
        />
      );
    }, this);
    return userInputs;
  }

  private RenderizeResponse(): HTMLElement[] {
    const responses: HTMLElement[] = [];
    this.flow.Responses.forEach(function(response) {
      responses.push(
        <gxcf-response-container
          response={response}
          onDeleteResponse={event => this.HandleDeleteResponse(event, response)}
        />
      );
    }, this);
    return responses;
  }

  HandleEditTriggerMessage(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.flow.SetTrigger(+index, value);
  }

  HandleDeleteTriggerMessage(event: CustomEvent): void {
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.flow.DeleteTrigger(+index);
  }

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    this.selectConversationalObject.emit(event);
  }

  @Event() deleteFullFlow: EventEmitter;
  TriggerDeleteFlow(event): void {
    this.deleteFullFlow.emit(event);
  }

  HandleExpandTriggers(event): void {
    console.log(event);
    this.expandTriggers = true;
  }

  HandleCollapseTriggers(event): void {
    console.log(event);
    this.expandTriggers = false;
  }

  private GetTriggers(): HTMLElement {
    if (this.expandTriggers)
      return (
        <div class="TriggersContainer TriggersContainerBorder">
          <div>
            <gxcf-up-arrow
              class="TriggersArrow"
              onClick={event => this.HandleCollapseTriggers(event)}
            />
          </div>
          <gxcf-collection
            collection={this.flow.TriggerMessages}
            collectionHeader={this.CollectionHeader}
            collectionHintId={HintId.TriggerMessages}
            collectionAddText="Add another sample trigger message"
            onEditItem={event => this.HandleEditTriggerMessage(event)}
            onDeleteItem={event => this.HandleDeleteTriggerMessage(event)}
          />
        </div>
      );
    else
      return (
        <div class="TriggersContainer TriggersContainerBorder">
          <gxcf-down-arrow
            class="TriggersArrow"
            onClick={event => this.HandleExpandTriggers(event)}
          />
          <div class="TriggersContainer">
            <span>
              Sample trigger messages ({this.flow.TriggerMessages.length})
            </span>
            <gxcf-hint hintId={HintId.TriggerMessages} class="Hint" />
            <p class="FirstTriggerMessage">
              {this.flow.GetSummaryTriggerMessage()}
            </p>
          </div>
        </div>
      );
  }

  render() {
    return (
      <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
        <div class="FullFlowContent">
          <div class="TabFullFlowContent">
            <gxcf-summary-title
              summaryid={this.SummaryId}
              summaryvalue={this.flow.Name}
              classType="FullTitle"
            />
            <div class="CommandsContainer">
              <gxcf-button-delete
                class="CommandPosition"
                onConfirmDelete={event => this.TriggerDeleteFlow(event)}
                confirmationTitle="Delete flow"
                confirmationMessage={`Do you want to delete the flow '${this.flow.Name}'?`}
              />
              <gxcf-button-edit class="CommandPosition" />
              <gxcf-select
                class="CustomSelectBoxing CommandPosition"
                selectid={this.SelectId}
                selectcaption={this.flow.GetSummaryConversationalObject()}
                selectIconType={this.flow.ConversationalObjectType}
                selectType={SelectTypes.Compact}
                onClick={event => this.TriggerSelectConversationalObject(event)}
              />
            </div>
            {this.GetTriggers()}
          </div>
        </div>
        <hr class="Separator"></hr>
        <div class="FullFlowContentUserInputs">
          <div class="ElementsHeader">
            <span class="LeftTab ElementsHeaderText">
              User Inputs ({this.flow.UserInputs.length})
            </span>
            <gxcf-hint hintId={HintId.UserInput} class="Hint" />
          </div>
          {this.RenderizeUserInputs()}
          <gxcf-add-object
            class="LeftTab"
            onClick={event => this.TriggerOnAddUserInput(event)}
            addText="Add another user input"
          />
        </div>
        <hr class="Separator"></hr>
        <div class="FullFlowContentResponses">
          <div class="ElementsHeader">
            <span class="ElementsHeaderText">
              Responses ({this.flow.Responses.length})
            </span>
            <gxcf-hint hintId={HintId.Responses} class="Hint" />
          </div>
          {this.RenderizeResponse()}
          <gxcf-add-object
            onClick={event => this.TriggerOnAddResponse(event)}
            addText="Add another possible response"
          />
        </div>
      </div>
    );
  }
}
