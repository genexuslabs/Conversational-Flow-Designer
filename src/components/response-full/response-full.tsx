import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import {
  HintId,
  ResponseStyles,
  ComponentTypes,
  SelectTypes
} from "../common/helpers";
import { EventsHelper } from "../common/events-helper";

@Component({
  tag: "gxcf-response-full",
  styleUrl: "response-full.scss",
  shadow: true
})
export class FullResponse {
  @Prop() response: GXCFModel.ResponseElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @Prop() responseIndex: number;

  @Event() collapseResponse: EventEmitter;
  TriggerCollapseResponse(event): void {
    this.collapseResponse.emit(event);
  }

  @Event() changeResponseName: EventEmitter;
  TriggerChangeResponseName(event): void {
    this.changeResponseName.emit(event);
  }

  @Event() setResponseMessagesInternal: EventEmitter;
  TriggerSetRespnseMessagesInternal(
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setResponseMessagesInternal.emit.call(this, {
      index: index,
      value: value,
      remove: remove
    });
  }

  HandleEditResponseMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValue(event);
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetRespnseMessagesInternal(+index, value, false);
  }

  HandleDeleteResponseMessage(event: CustomEvent): void {
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.TriggerSetRespnseMessagesInternal(+index, "", true);
  }

  @Event() changeResponseStyle: EventEmitter;
  TriggerChangeResponseStyle(event: CustomEvent): void {
    const value: string = EventsHelper.GetValueFromSelect(event);
    this.changeResponseStyle.emit.call(this, {
      flowName: this.flow.Name,
      responseIndex: this.responseIndex,
      style: value
    });
  }

  @Event() changeResponseCondition: EventEmitter;
  TriggerChangeResponseCondition(event: CustomEvent): void {
    event.preventDefault();
    const value: string = EventsHelper.GetValue(event);
    this.changeResponseCondition.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex,
      condition: value
    });
  }

  @Event() changeResponseRedirectTo: EventEmitter;
  TriggerChangeResponseRedirectTo(event: CustomEvent): void {
    event.preventDefault();
    this.changeResponseRedirectTo.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex,
      redirectTo: event.detail.value
    });
  }

  @Event() changeComponentType: EventEmitter;
  TriggerChangeComponentType(event: CustomEvent) {
    event.preventDefault();
    const value: string = EventsHelper.GetValueFromSelect(event);
    this.changeComponentType.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex,
      componentType: value
    });
  }

  @Event() changeWebComponent: EventEmitter;
  TriggerChangeWebComponent(): void {
    this.changeWebComponent.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex
    });
  }

  @Event() changeSDComponent: EventEmitter;
  TriggerChangeSDComponent() {
    this.changeSDComponent.emit.call(this, {
      flowName: this.flow.Name,
      index: this.responseIndex
    });
  }

  @Event() deleteResponseFull: EventEmitter;
  TriggerDeleteResponseFull(event): void {
    this.deleteResponseFull.emit(event);
  }

  private RenderStyleSelector(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    const componentViewSelected =
      this.response.Style == ResponseStyles.ComponentView;
    const redirectToSelected = this.response.Style == ResponseStyles.RedirectTo;
    const textMessageSelected =
      this.response.Style == ResponseStyles.TextMessage ||
      (!componentViewSelected && !redirectToSelected);

    const textElementOption = textMessageSelected ? (
      <option value={ResponseStyles.TextMessage} selected>
        {ResponseStyles.PrettyTextMessage}
      </option>
    ) : (
      <option value={ResponseStyles.TextMessage}>
        {ResponseStyles.PrettyTextMessage}
      </option>
    );
    const componentElementOption = componentViewSelected ? (
      <option value={ResponseStyles.ComponentView} selected>
        {ResponseStyles.PrettyComponentView}
      </option>
    ) : (
      <option value={ResponseStyles.ComponentView}>
        {ResponseStyles.PrettyComponentView}
      </option>
    );
    const redirectElementOption = redirectToSelected ? (
      <option value={ResponseStyles.RedirectTo} selected>
        {ResponseStyles.PrettyRedirectTo}
      </option>
    ) : (
      <option value={ResponseStyles.RedirectTo}>
        {ResponseStyles.PrettyRedirectTo}
      </option>
    );
    elements.push(
      <select
        class="ResponseSelect"
        onChange={(event: CustomEvent) =>
          this.TriggerChangeResponseStyle(event)
        }
      >
        {componentElementOption}
        {textElementOption}
        {redirectElementOption}
      </select>
    );
    return elements;
  }

  private RenderizeComponentType(): HTMLElement {
    const componentOption =
      this.response.ComponentType == ComponentTypes.Component ? (
        <option value={ComponentTypes.Component} selected>
          {ComponentTypes.Component}
        </option>
      ) : (
        <option value={ComponentTypes.Component}>
          {ComponentTypes.Component}
        </option>
      );
    const callPanelOption =
      this.response.ComponentType == ComponentTypes.CallPanel ? (
        <option value={ComponentTypes.CallPanel} selected>
          {ComponentTypes.CallPanel}
        </option>
      ) : (
        <option value={ComponentTypes.CallPanel}>
          {ComponentTypes.CallPanel}
        </option>
      );
    return (
      <select
        onChange={(event: CustomEvent) =>
          this.TriggerChangeComponentType(event)
        }
        class="ResponseSelect"
      >
        {componentOption}
        {callPanelOption}
      </select>
    );
  }

  private RenderStyleContent(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    if (this.response.Style == ResponseStyles.ComponentView) {
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.ShowResponseAs} />
          <span>Show Response as (SD Only)</span>
          {this.RenderizeComponentType()}
        </div>
      );
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.SDComponent} />
          <span>SD Component</span>
          <gxcf-select
            selectcaption={this.response.SDComponentName}
            selectIconType="SDPanel"
            selectType={SelectTypes.Full}
            onClick={() => this.TriggerChangeSDComponent()}
          />
        </div>
      );
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.WebComponent} />
          <span>Web Component</span>
          <gxcf-select
            selectcaption={this.response.WebComponentName}
            selectIconType="WebPanel"
            selectType={SelectTypes.Full}
            onClick={() => this.TriggerChangeWebComponent()}
          />
        </div>
      );
    } else if (this.response.Style == ResponseStyles.RedirectTo) {
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.Redirection} />
          <span>Redirect To</span>
          <gxcf-redirection
            requireCondition={false}
            redirectionProperty={{
              RedirectCondition: "",
              RedirectTo: this.response.RedirectTo,
              Index: 0
            }}
            flows={this.instance.Flows}
            onChangeRedirectTo={event =>
              this.TriggerChangeResponseRedirectTo(event)
            }
          />
        </div>
      );
    }

    return elements;
  }

  render() {
    return (
      <div class="FullResponse">
        <input
          type="text"
          class="FullResponseTitle"
          value={this.response.ResponseName}
          placeholder="Response name..."
          onChange={event => this.TriggerChangeResponseName(event)}
        />
        <gxcf-up-arrow
          class="FullResponseCommands"
          onClick={event => this.TriggerCollapseResponse(event)}
        />
        <gxcf-button-delete
          class="FullResponseCommands"
          onConfirmDelete={event => this.TriggerDeleteResponseFull(event)}
          confirmationTitle="Delete response"
          confirmationMessage={`Do you want to delete the response '${this.response.Index}'?`}
        />
        <gxcf-collection
          collection={this.response.Format}
          collectionHeader="Response Messages"
          collectionAddText="Add an alternative response message"
          collectionHintId={HintId.ResponseMessage}
          onEditItem={event => {
            this.HandleEditResponseMessage(event);
          }}
          onDeleteItem={event => {
            this.HandleDeleteResponseMessage(event);
          }}
        />
        <div class="ConditionMargin">
          <span class="ConditionLabel">Condition</span>
          <gxcf-hint class="HintBlock" hintId={HintId.ResponseCondition} />
        </div>
        <gxcf-condition
          class="ConditionMargin"
          currentCondition={this.response.Condition}
          onConditionChange={event =>
            this.TriggerChangeResponseCondition(event)
          }
        />
        <hr class="Separator"></hr>
        <div class="ConditionMargin">
          <span class="ConditionLabel">Response Style</span>
          <gxcf-hint class="HintBlock" hintId={HintId.ResponseStyle} />
        </div>
        {this.RenderStyleSelector()}
        {this.RenderStyleContent()}
      </div>
    );
  }
}
