import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  Listen,
  State
} from "@stencil/core";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { HintId } from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { CollectionType } from "../../global/conversational-editor/instance-definition/elements/iconversational-element";

@Component({
  tag: "gxcf-flow-full",
  styleUrl: "flow-full.scss",
  shadow: false
})
export class FlowFull {
  @Prop() flow: FlowElement;
  @State() refresh = true;

  @Event() onCollapseFlow: EventEmitter;
  TriggerOnCollapseFlow(event): void {
    this.onCollapseFlow.emit(event);
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

  private RenderizeUserInputs(): HTMLElement[] {
    const userInputs: HTMLElement[] = [];
    this.flow.UserInputs.forEach(function(userInput) {
      userInputs.push(
        <gxcf-user-input-container userInput={userInput} flow={this.flow} />
      );
    }, this);
    return userInputs;
  }

  private RenderizeResponse(): HTMLElement[] {
    const responses: HTMLElement[] = [];
    this.flow.Responses.forEach(function(response) {
      responses.push(<gxcf-response-collapsed response={response} />);
    });
    return responses;
  }

  @Listen("selectConversationalObject")
  HandleSelectConversationalObject(event: CustomEvent): void {
    EventHandler.SelectConversationalObject(event).then(retFlow => {
      this.flow = retFlow;
      this.refresh = !this.refresh;
    });
  }

  render() {
    this.flow.UserInputComponent = this;
    return (
      <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
        <div class="FullFlowContent">
          <div class="TabFullFlowContent">
            <gxcf-summary-title
              summaryid={this.SummaryId}
              summaryvalue={this.flow.Name}
              classType="FullTitle"
            />
            <gxcf-collection
              collection={this.flow.TriggerMessages}
              collectionHeader={this.CollectionHeader}
              collectionHintId={HintId.TriggerMessages}
              collectionAddText="Add another sample trigger message"
              collectionType={CollectionType.TriggerMessages}
              itemParent={this.flow}
            />
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
              Responses ({this.flow.UserInputs.length})
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
