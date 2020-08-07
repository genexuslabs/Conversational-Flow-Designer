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

  handleUInputContainerClick(userInput): void {
    Position.SetUserInput(this.flow.Name, userInput);
  }

  handleResponseContainerClick(response): void {
    Position.SetResponse(this.flow.Name, response);
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
    this.TriggerSetTriggers(event.detail.index, event.detail.value, false);
  }

  HandleDeleteTriggerMessage(event: CustomEvent): void {
    this.TriggerSetTriggers(event.detail, "", true);
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

  @Event() setSelectedFlow: EventEmitter;
  triggerSetSelectedFlow(flowName: string) {
    this.setSelectedFlow.emit(flowName);
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
    return this.componentLocale.emptyTriggers;
  }

  private GetSummaryConversationalObject(): string {
    if (
      this.flow.ConversationalObjectName != null &&
      this.flow.ConversationalObjectName != ""
    ) {
      return this.flow.ConversationalObjectName;
    }
    return "Conversational Object";
  }

  private GetTriggers(): HTMLElement {
    return (
      <div class="TriggersContainer TriggersContainerBody">
        <gxcf-collection
          collection={this.flow.Triggers}
          collectionHeader={this.CollectionHeader}
          collectionHintId={HintId.TriggerMessages}
          collectionAddText={this.componentLocale.addTriggerMessage}
          collectionSummary={this.GetSummaryTriggerMessage()}
          onEditItem={event => this.HandleEditTriggerMessage(event)}
          onDeleteItem={event => this.HandleDeleteTriggerMessage(event)}
          defaultNewItemValue={this.flow.Name}
        />
      </div>
    );
  }

  getPill(flowName: string, iconFilled: boolean) {
    return (
      <gxg-pill
        onClick={() => this.triggerSetSelectedFlow(flowName)}
        icon={iconFilled ? "pill-filled" : "pill-outlined"}
        type="button"
      >
        {flowName}
      </gxg-pill>
    );
  }

  getPillsForFlow(flow: GXCFModel.FlowElement, from: boolean) {
    const elements: HTMLElement[] = [];
    const flowPills: string[] = [];

    flow.Fields.forEach(function(userInput) {
      userInput.Redirections.forEach(function(redirection) {
        if (redirection.RedirectTo != "") {
          if (from && redirection.RedirectTo == this.flow.Name) {
            return elements.push(this.getPill(flow.Name));
          }
          if (!from && !flowPills.includes(redirection.RedirectTo)) {
            elements.push(this.getPill(redirection.RedirectTo, false));
            flowPills.push(redirection.RedirectTo);
          }
        }
      }, this);
    }, this);

    flow.View.Templates.forEach(function(response) {
      if (response.RedirectTo != "") {
        if (from && response.RedirectTo == this.flow.Name) {
          return elements.push(this.getPill(flow.Name));
        }
        if (!from && !flowPills.includes(response.RedirectTo)) {
          elements.push(this.getPill(response.RedirectTo, true));
          flowPills.push(response.RedirectTo);
        }
      }
    }, this);

    return elements;
  }

  redirectionsFromOtherFlows() {
    let elements: HTMLElement[] = [];
    this.instance.Flows.forEach(function(flow) {
      const innerElements: HTMLElement[] = this.getPillsForFlow(flow, true);
      elements = elements.concat(innerElements);
    }, this);
    if (elements.length > 0)
      elements.splice(0, 0, <gxg-text>{this.componentLocale.from}</gxg-text>);
    return elements;
  }

  redirectionsToOtherFlows() {
    const elements: HTMLElement[] = this.getPillsForFlow(this.flow, false);
    if (elements.length > 0)
      elements.splice(0, 0, <gxg-text>{this.componentLocale.to}</gxg-text>);
    return elements;
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
    let index = 0;
    this.flow.View.Templates.forEach(temp => {
      temp.Index = index;
      index++;
    });
  }

  render() {
    let selectType: SelectTypes = SelectTypes.Compact;
    if (!this.flow.ConversationalObjectName) selectType = SelectTypes.Full;
    return (
      <gxg-spacer-layout orientation="vertical" space="xs">
        <gxg-spacer-layout orientation="horizontal" space="xs">
          {this.redirectionsFromOtherFlows()}
        </gxg-spacer-layout>
        <gxg-box class="FlowFull" border="gray-03">
          <gxcf-summary-title
            summaryid={this.SummaryId}
            summaryvalue={this.flow.Name}
            fullWidth={true}
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
          <gxg-separator margin="xs" type="dashed" />
          <gxg-spacer-layout
            space="xs"
            orientation="vertical"
            justify-content="flex-start"
          >
            <div>
              <span class="ElementsHeaderText gxg-title-03">
                {Locale.format(this.componentLocale.userInputsCount, [
                  this.flow.Fields.length + ""
                ])}
              </span>
              <gxcf-hint hintId={HintId.UserInput} class="Hint" />
            </div>
            <gxcf-user-input flow={this.flow} instance={this.instance} />
            <gxg-button
              type="secondary-text-icon"
              icon="add"
              onClick={() => this.TriggerOnAddUserInput()}
            >
              {this.componentLocale.addUserInput}
            </gxg-button>
            <gxg-separator margin="xs" type="dashed" />
            <div>
              <span class="ElementsHeaderText gxg-title-03">
                {Locale.format(this.componentLocale.responsesCount, [
                  this.flow.View.Templates.length + ""
                ])}
              </span>
              <gxcf-hint hintId={HintId.Responses} class="Hint" />
            </div>
            <gxcf-response flow={this.flow} instance={this.instance} />
            <gxg-button
              type="secondary-text-icon"
              icon="add"
              onClick={() => this.TriggerOnAddResponse()}
            >
              {this.componentLocale.addResponse}
            </gxg-button>
          </gxg-spacer-layout>
        </gxg-box>
        <gxg-spacer-layout orientation="horizontal" space="xs">
          {this.redirectionsToOtherFlows()}
        </gxg-spacer-layout>
      </gxg-spacer-layout>
    );
  }
}
