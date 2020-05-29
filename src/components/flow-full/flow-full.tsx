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
import { HintId, SelectTypes, RenderingOptions } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { Position } from "../common/position";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-flow-full",
  styleUrl: "flow-full.scss",
  shadow: true,
  assetsDirs: ["assets/gxcf-flow-full-lang"]
})
export class FlowFull {
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @State() expandTriggers = false;
  @Element() element: HTMLElement;

  private componentLocale: any;

  @Event() collapseFlow: EventEmitter;
  TriggerOnCollapseFlow(event): void {
    this.collapseFlow.emit(event);
  }

  @Event() addUserInput: EventEmitter;
  TriggerOnAddUserInput(): void {
    this.addUserInput.emit.call(this, {
      flowName: this.flow.Name
    });
  }

  @Event() addResponse: EventEmitter;
  TriggerOnAddResponse(): void {
    this.addResponse.emit.call(this, {
      flowName: this.flow.Name
    });
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
    return `Trigger Messages`;
  }

  @Listen("expandUserInputOut")
  HandleOnExpandUserInput(event: CustomEvent): void {
    event.preventDefault();
    const userInput: HTMLGxcfUserInputContainerElement = event.detail
      .source as HTMLGxcfUserInputContainerElement;
    userInput.renderType = RenderingOptions.Full;
  }

  @Listen("collapseUserInputOut")
  HandleCollapseUserInput(event: CustomEvent): void {
    event.preventDefault();
    const userInput: HTMLGxcfUserInputContainerElement = event.detail
      .source as HTMLGxcfUserInputContainerElement;
    userInput.renderType = RenderingOptions.Collapsed;
  }

  @Listen("expandResponseOut")
  HandleExpandResponse(event: CustomEvent) {
    event.preventDefault();
    const response: HTMLGxcfResponseContainerElement = event.detail
      .source as HTMLGxcfResponseContainerElement;
    response.renderType = RenderingOptions.Full;
  }

  @Listen("collapseResponseOut")
  HandleCollapseResponse(event: CustomEvent) {
    event.preventDefault();
    const response: HTMLGxcfResponseContainerElement = event.detail
      .source as HTMLGxcfResponseContainerElement;
    response.renderType = RenderingOptions.Collapsed;
  }

  handleUInputContainerClick(userInput): void {
    Position.SetUserInput(this.flow.Name, userInput);
  }

  private RenderizeUserInputs(): HTMLElement[] {
    const userInputs: HTMLElement[] = [];
    this.flow.Fields.forEach(function(userInput) {
      userInputs.push(
        <gxcf-user-input-container
          userInput={userInput}
          flow={this.flow}
          renderType={RenderingOptions.Collapsed}
          instance={this.instance}
          onClick={() => this.handleUInputContainerClick(userInput.Variable)}
        />
      );
    }, this);
    return userInputs;
  }

  handleResponseContainerClick(response): void {
    Position.SetResponse(this.flow.Name, response);
  }

  private RenderizeResponse(): HTMLElement[] {
    const responses: HTMLElement[] = [];

    this.flow.View.Templates.forEach(function(response) {
      responses.push(
        <gxcf-response-container
          response={response}
          renderType={RenderingOptions.Collapsed}
          responseIndex={this.flow.View.Templates.indexOf(response)}
          flow={this.flow}
          instance={this.instance}
          onClick={() => this.handleResponseContainerClick(response.Index)}
        />
      );
    }, this);
    return responses;
  }

  @Event() setTriggers: EventEmitter;
  TriggerSetTriggers(index: number, value: string, remove: boolean): void {
    this.setTriggers.emit.call(this, {
      flowName: this.flow.Name,
      triggerMessages: StringCollectionHelper.FormatCollection(
        this.flow.Triggers,
        index,
        value,
        remove
      )
    });
  }

  HandleEditTriggerMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    const index = EventsHelper.GetCollectionIndexFromDetail(event);

    this.TriggerSetTriggers(+index, value, false);
  }

  HandleDeleteTriggerMessage(event: CustomEvent): void {
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetTriggers(+index, "", true);
  }

  @Event() selectConversationalObject: EventEmitter;
  TriggerSelectConversationalObject(event): void {
    console.log(event);
    this.selectConversationalObject.emit.call(this, {
      flowName: this.flow.Name
    });
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

  private GetSummaryTriggerMessage(): string {
    if (this.flow.Triggers[0] != null) {
      return this.flow.Triggers[0];
    }
    return "";
  }

  private GetSummaryConversationalObject(): string {
    if (
      this.flow.ConversationalObjectName != null &&
      this.flow.ConversationalObjectName != ""
    ) {
      return this.flow.ConversationalObjectName.toUpperCase();
    }
    return "Conversational Object";
  }

  private GetTriggers(): HTMLElement {
    if (this.expandTriggers)
      return (
        <div class="TriggersContainer TriggersContainerBody">
          <div>
            <gxg-icon
              size="regular"
              type="chevron-up"
              class="TriggersArrow"
              onClick={event => this.HandleCollapseTriggers(event)}
            />
          </div>
          <gxcf-collection
            collection={this.flow.Triggers}
            collectionHeader={this.CollectionHeader}
            collectionHintId={HintId.TriggerMessages}
            collectionAddText={this.componentLocale.addTriggerMessage}
            onEditItem={event => this.HandleEditTriggerMessage(event)}
            onDeleteItem={event => this.HandleDeleteTriggerMessage(event)}
            defaultNewItemValue={this.flow.Name}
          />
        </div>
      );
    else
      return (
        <div class="TriggersContainer">
          <gxcf-dot class="DotPosition MinLeftTab" />
          <span class="ElementsHeaderText gxg-title-03">
            {Locale.format(this.componentLocale.triggerMessagesCount, [
              this.flow.Triggers.length + ""
            ])}
          </span>
          <gxcf-hint hintId={HintId.TriggerMessages} class="Hint" />
          <div class="TriggersContainer TriggersContainerBody">
            <gxg-icon
              size="regular"
              type="chevron-down"
              color="onbackground"
              class="TriggersArrow"
              onClick={event => this.HandleExpandTriggers(event)}
            />
            <div class="TriggersContainer">
              <p class="gxg-quote">{this.GetSummaryTriggerMessage()}</p>
            </div>
          </div>
        </div>
      );
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  render() {
    let selectType: SelectTypes = SelectTypes.Compact;
    if (!this.flow.ConversationalObjectName) selectType = SelectTypes.Full;
    return (
      <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
        <div class="FullFlowContent">
          <div class="TabFullFlowContent Content">
            <gxcf-summary-title
              summaryid={this.SummaryId}
              summaryvalue={this.flow.Name}
              classType="FullTitle"
            />
            <div class="CommandsContainer">
              <gxcf-button-delete
                class="CommandPosition"
                onConfirmDelete={event => this.TriggerDeleteFlow(event)}
                confirmationTitle={this.componentLocale.deleteFlow}
                confirmationMessage={Locale.format(
                  this.componentLocale.deleteFlowConfirmation,
                  [this.flow.Name]
                )}
              />
              <gxcf-select
                class="CustomSelectBoxing CommandPosition"
                selectid={this.SelectId}
                selectcaption={this.GetSummaryConversationalObject()}
                selectIconType={this.flow.ConversationalObjectType}
                selectType={selectType}
                onClick={event => this.TriggerSelectConversationalObject(event)}
              />
            </div>
            {this.GetTriggers()}
          </div>
        </div>
        <hr class="Separator"></hr>
        <div class="FullFlowContentUserInputs Content">
          <div class="ElementsHeader">
            <span class="LeftTab ElementsHeaderText gxg-title-03">
              {Locale.format(this.componentLocale.userInputsCount, [
                this.flow.Fields.length + ""
              ])}
            </span>
            <gxcf-hint hintId={HintId.UserInput} class="Hint" />
          </div>
          {this.RenderizeUserInputs()}
          <gxcf-add-object
            class="LeftTab"
            onClick={() => this.TriggerOnAddUserInput()}
            addText={this.componentLocale.addUserInput}
          />
        </div>
        <hr class="Separator"></hr>
        <div class="FullFlowContentResponses Content">
          <div class="ElementsHeader">
            <span class="ElementsHeaderText gxg-title-03">
              {Locale.format(this.componentLocale.responsesCount, [
                this.flow.View.Templates.length + ""
              ])}
            </span>
            <gxcf-hint hintId={HintId.Responses} class="Hint" />
          </div>
          {this.RenderizeResponse()}
          <gxcf-add-object
            onClick={() => this.TriggerOnAddResponse()}
            addText={this.componentLocale.addResponse}
          />
        </div>
      </div>
    );
  }
}
