import { Component, Prop, h, Event, EventEmitter, State } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";
import {
  HintId,
  ResponseStyles,
  ComponentTypes,
  SelectTypes
} from "../../global/conversational-editor/helpers/helpers";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { RedirectionProperty } from "../../global/conversational-editor/instance-definition/elements/redirection-property";

@Component({
  tag: "gxcf-response-full",
  styleUrl: "response-full.scss",
  shadow: true
})
export class FullResponse {
  @Prop() response: ResponseElement;
  @State() refresh: boolean;

  @Event() collapseResponse: EventEmitter;
  TriggerCollapseResponse(event): void {
    this.collapseResponse.emit(event);
  }

  HandleEditResponseMessage(event: CustomEvent): void {
    const value = EventHandler.GetValue(event);
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.response.EditMessage(value, +index);
  }

  HandleDeleteResponseMessage(event: CustomEvent): void {
    const index = EventHandler.GetCollectionIndexFromDetail(event);
    this.response.DeleteMessage(+index);
  }

  HandleChangeResponseStyle(event: CustomEvent): void {
    const value: string = EventHandler.GetValueFromSelect(event);
    this.response.SetStyle(value);
    this.refresh = !this.refresh;
  }

  HandleConditionChange(event: CustomEvent): void {
    const value: string = EventHandler.GetValue(event);
    this.response.SetCondition(value);
  }

  HandleRedirectToChange(event: CustomEvent): void {
    const value: string = EventHandler.GetValue(event);
    this.response.SetRedirectTo(value);
  }

  HandleChangeComponentType(event: CustomEvent): void {
    const value: string = EventHandler.GetValueFromSelect(event);
    this.response.SetComponentType(value);
  }

  HandleChangeWebComponent(event: MouseEvent): void {
    console.log(event);
    if (window.external.SetWebComponent) {
      window.external
        .SetWebComponent(this.response.Parent.Name, this.response.Index)
        .then(component => {
          this.response.WebComponent = component;
          this.refresh = !this.refresh;
        });
    }
  }

  HandleChangeSDComponent(event: MouseEvent) {
    console.log(event);
    if (window.external.SetSDComponent) {
      window.external
        .SetSDComponent(this.response.Parent.Name, this.response.Index)
        .then(component => {
          this.response.SDComponent = component;
          this.refresh = !this.refresh;
        });
    }
  }

  @Event() deleteResponseFull: EventEmitter;
  TriggerDeleteResponseFull(event: MouseEvent): void {
    this.deleteResponseFull.emit(event);
  }

  private RenderStyleSelector(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    const textElementOption =
      this.response.Style == ResponseStyles.TextMessage ? (
        <option value={ResponseStyles.TextMessage} selected>
          {ResponseStyles.PrettyTextMessage}
        </option>
      ) : (
        <option value={ResponseStyles.TextMessage}>
          {ResponseStyles.PrettyTextMessage}
        </option>
      );
    const componentElementOption =
      this.response.Style == ResponseStyles.ComponentView ? (
        <option value={ResponseStyles.ComponentView} selected>
          {ResponseStyles.PrettyComponentView}
        </option>
      ) : (
        <option value={ResponseStyles.ComponentView}>
          {ResponseStyles.PrettyComponentView}
        </option>
      );
    const redirectElementOption =
      this.response.Style == ResponseStyles.RedirectTo ? (
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
        onChange={(event: CustomEvent) => this.HandleChangeResponseStyle(event)}
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
        onChange={(event: CustomEvent) => this.HandleChangeComponentType(event)}
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
          <gxcf-hint hintId={HintId.ShowResponseAs} />
          <span>Show Response as (SD Only)</span>
          {this.RenderizeComponentType()}
        </div>
      );
      const sdComponent: string = this.response.ComponentType;
      console.log("The component: " + sdComponent);
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint hintId={HintId.SDComponent} />
          <span>SD Component</span>
          <gxcf-select
            selectcaption={this.response.GetSDComponentName()}
            selectIconType="SDPanel"
            selectType={SelectTypes.Full}
            onClick={event => this.HandleChangeSDComponent(event)}
          />
        </div>
      );
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint hintId={HintId.WebComponent} />
          <span>Web Component</span>
          <gxcf-select
            selectcaption={this.response.GetWebComponentName()}
            selectIconType="WebPanel"
            selectType={SelectTypes.Full}
            onClick={event => this.HandleChangeWebComponent(event)}
          />
        </div>
      );
    } else if (this.response.Style == ResponseStyles.RedirectTo) {
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint hintId={HintId.Redirection} />
          <span>Redirect To</span>
          <gxcf-redirection
            requireCondition={false}
            redirectionProperty={
              new RedirectionProperty("", this.response.RedirectTo, 0)
            }
            onChangeRedirectTo={event => this.HandleRedirectToChange(event)}
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
          value={this.response.Style}
        />
        <gxcf-up-arrow
          class="FullResponseCommands"
          onClick={event => this.TriggerCollapseResponse(event)}
        />
        <gxcf-button-delete
          class="FullResponseCommands"
          onClick={event => this.TriggerDeleteResponseFull(event)}
        />
        <gxcf-collection
          collection={this.response.Messages}
          collectionHeader={`Response Messages (${this.response.Messages.length})`}
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
          onConditionChange={event => this.HandleConditionChange(event)}
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
