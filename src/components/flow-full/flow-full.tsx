import {
  Component,
  Prop,
  h,
  EventEmitter,
  Event,
  State,
  Element
} from "@stencil/core";
import { HintId, ResponseStyles, SelectTypes } from "../common/helpers";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { Position } from "../common/position";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-flow-full",
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

  @Event() modifyFlowName: EventEmitter;
  triggerChangeFlowName(event) {
    this.modifyFlowName.emit.call(this, {
      currentFlowName: this.flow.Name,
      newFlowName: event.detail
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
      <gxcf-collection
        collection={this.flow.Triggers}
        collectionHeader={this.CollectionHeader}
        collectionHintId={HintId.TriggerMessages}
        collectionAddText={this.componentLocale.addTriggerMessage}
        collectionSummary={this.GetSummaryTriggerMessage()}
        onEditItem={event => this.HandleEditTriggerMessage(event)}
        onDeleteItem={event => this.HandleDeleteTriggerMessage(event)}
        defaultNewItemValue={this.flow.Name}
        mode="boxed"
      />
    );
  }

  getFlow(flowName: string): GXCFModel.FlowElement {
    for (const flow of this.instance.Flows) {
      if (flow.Name == flowName) return flow;
    }
    return null;
  }

  getPill(flowElement: GXCFModel.FlowElement) {
    if (flowElement) {
      let slot = flowElement.Name;
      const maxLength = 20;
      if (flowElement.Name.length > maxLength)
        slot = (
          <gxg-tooltip label={flowElement.Name} position="bottom">
            {flowElement.Name.substring(0, maxLength - 4) + "..."}
          </gxg-tooltip>
        );
      return (
        <gxg-pill
          onClick={() => this.triggerSetSelectedFlow(flowElement.Name)}
          icon={
            flowElement.Triggers.length > 0
              ? "general/pill-filled"
              : "general/pill-outlined"
          }
          type="button"
        >
          {slot}
        </gxg-pill>
      );
    }
  }

  getPillsForFlow(flow: GXCFModel.FlowElement, from: boolean) {
    const elements: HTMLElement[] = [];
    const flowPills: string[] = [];

    flow.Fields.forEach(function(userInput) {
      userInput.Redirections.forEach(function(redirection) {
        if (redirection.RedirectTo != "") {
          if (from && redirection.RedirectTo == this.flow.Name) {
            return elements.push(this.getPill(flow));
          }
          if (!from && !flowPills.includes(redirection.RedirectTo)) {
            const rFlow: GXCFModel.FlowElement = this.getFlow(
              redirection.RedirectTo
            );
            if (rFlow != null) {
              elements.push(this.getPill(rFlow, false));
              flowPills.push(redirection.RedirectTo);
            }
          }
        }
      }, this);
    }, this);

    flow.View.Templates.forEach(function(response) {
      if (
        response.RedirectTo != "" &&
        response.Style == ResponseStyles.RedirectTo
      ) {
        if (from && response.RedirectTo == this.flow.Name) {
          return elements.push(this.getPill(flow));
        }
        if (!from && !flowPills.includes(response.RedirectTo)) {
          const rFlow = this.getFlow(response.RedirectTo);
          elements.push(this.getPill(rFlow, true));
          flowPills.push(response.RedirectTo);
        }
      }
    }, this);

    return elements;
  }

  formatPillElements(elements: HTMLElement[], text: string) {
    if (elements.length > 0) {
      return [
        <gxg-columns alignY="center" space="xs">
          <gxg-column width="content">
            <gxg-icon size="small" type="navigation/flow-arrow" />
          </gxg-column>
          <gxg-column width="content">
            <gxg-title type="title-01">{text}</gxg-title>
          </gxg-column>
          <gxg-column
            width="fluid"
            style={{ paddingTop: "var(--spacing-comp-02)" }}
          >
            <gxg-spacer-layout orientation="horizontal" space="s">
              {elements}
            </gxg-spacer-layout>
          </gxg-column>
        </gxg-columns>
      ];
    }
    return elements;
  }

  redirectionsFromOtherFlows() {
    let elements: HTMLElement[] = [];
    this.instance.Flows.forEach(function(flow) {
      const innerElements: HTMLElement[] = this.getPillsForFlow(flow, true);
      elements = elements.concat(innerElements);
    }, this);
    return this.formatPillElements(elements, this.componentLocale.from);
  }

  redirectionsToOtherFlows() {
    const elements: HTMLElement[] = this.getPillsForFlow(this.flow, false);
    return this.formatPillElements(elements, this.componentLocale.to);
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
        <gxg-scroll maxHeight="90vh">
          <gxg-box border="gray-03">
            <gxg-columns alignY="center">
              <gxg-column width="fluid">
                <gxg-form-text
                  value={this.flow.Name}
                  onChange={event => this.triggerChangeFlowName(event)}
                  minimal
                  textStyle="title-01"
                />
              </gxg-column>
              <gxg-column width="content">
                <gxcf-select
                  selectid={this.SelectId}
                  selectcaption={this.GetSummaryConversationalObject()}
                  selectIconType={this.flow.ConversationalObjectType}
                  selectType={selectType}
                  onClick={event =>
                    this.TriggerSelectConversationalObject(event)
                  }
                />
              </gxg-column>
              <gxg-column width="content">
                <gxcf-button-delete
                  onConfirmDelete={event => this.TriggerDeleteFlow(event)}
                  confirmationTitle={this.componentLocale.deleteFlow}
                  confirmationMessage={Locale.format(
                    this.componentLocale.deleteFlowConfirmation,
                    [this.flow.Name]
                  )}
                />
              </gxg-column>
            </gxg-columns>

            <div>{this.GetTriggers()}</div>

            <gxg-separator margin="s" type="dashed" />
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
                <gxcf-hint hintId={HintId.UserInput} />
              </div>
              <gxcf-user-input flow={this.flow} instance={this.instance} />
              <gxg-button
                type="secondary-text-icon"
                icon="general/add"
                onClick={() => this.TriggerOnAddUserInput()}
              >
                {this.componentLocale.addUserInput}
              </gxg-button>
              <gxg-separator margin="s" type="dashed" />
              <div>
                <span class="ElementsHeaderText gxg-title-03">
                  {Locale.format(this.componentLocale.responsesCount, [
                    this.flow.View.Templates.length + ""
                  ])}
                </span>
                <gxcf-hint hintId={HintId.Responses} />
              </div>
              <gxcf-response flow={this.flow} instance={this.instance} />
              <gxg-button
                type="secondary-text-icon"
                icon="general/add"
                onClick={() => this.TriggerOnAddResponse()}
              >
                {this.componentLocale.addResponse}
              </gxg-button>
            </gxg-spacer-layout>
          </gxg-box>
        </gxg-scroll>
        <gxg-spacer-layout orientation="horizontal" space="xs">
          {this.redirectionsToOtherFlows()}
        </gxg-spacer-layout>
      </gxg-spacer-layout>
    );
  }
}
