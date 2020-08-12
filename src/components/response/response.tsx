import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import {
  HintId,
  ResponseStyles,
  ComponentTypes,
  SelectTypes
} from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { Locale } from "../common/locale";
import { StringCollectionHelper } from "../common/string-collection-helper";

@Component({
  tag: "gxcf-response",
  shadow: true,
  assetsDirs: ["assets/gxcf-response-lang"]
})
export class Response {
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @Element() element: HTMLElement;
  private componentLocale: any;

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  @Event() deleteResponse: EventEmitter;
  triggerDeleteResponse(responseIndex): void {
    this.deleteResponse.emit.call(this, {
      flowName: this.flow.Name,
      index: responseIndex
    });
  }

  @Event() setResponseMessages: EventEmitter;
  triggerSetResponseMessages(
    response: GXCFModel.ResponseElement,
    index: number,
    value: string,
    remove: boolean
  ): void {
    this.setResponseMessages.emit.call(this, {
      flowName: this.flow.Name,
      responseIndex: response.Index,
      responseMessages: StringCollectionHelper.FormatCollection(
        response.Format,
        index,
        value,
        remove
      )
    });
  }

  @Event() changeResponseCondition: EventEmitter;
  triggerChangeResponseCondition(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    event.preventDefault();
    const value: string = EventsHelper.GetConditionValue(event);
    this.changeResponseCondition.emit.call(this, {
      flowName: this.flow.Name,
      index: response.Index,
      condition: value
    });
  }

  @Event() changeResponseStyle: EventEmitter;
  triggerChangeResponseStyle(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    const value: string = EventsHelper.GetValueFromGxgSelect(event);
    this.changeResponseStyle.emit.call(this, {
      flowName: this.flow.Name,
      responseIndex: response.Index,
      style: value
    });
  }

  @Event() changeComponentType: EventEmitter;
  triggerChangeComponentType(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ) {
    event.preventDefault();
    const value: string = EventsHelper.GetValueFromGxgSelect(event);
    this.changeComponentType.emit.call(this, {
      flowName: this.flow.Name,
      index: response.Index,
      componentType: value
    });
  }

  @Event() changeSDComponent: EventEmitter;
  triggerChangeSDComponent(response: GXCFModel.ResponseElement) {
    this.changeSDComponent.emit.call(this, {
      flowName: this.flow.Name,
      index: response.Index
    });
  }

  @Event() changeWebComponent: EventEmitter;
  triggerChangeWebComponent(response: GXCFModel.ResponseElement): void {
    this.changeWebComponent.emit.call(this, {
      flowName: this.flow.Name,
      index: response.Index
    });
  }

  @Event() changeResponseRedirectTo: EventEmitter;
  triggerChangeResponseRedirectTo(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    event.preventDefault();
    this.changeResponseRedirectTo.emit.call(this, {
      flowName: this.flow.Name,
      index: response.Index,
      redirectTo: event.detail.value
    });
  }

  @Event() switchResponseParameter: EventEmitter;
  triggerSwitchResponseParameter(responseParameter: string): void {
    this.switchResponseParameter.emit.call(this, {
      flowName: this.flow.Name,
      responseParameter: responseParameter
    });
  }

  handleEditResponseMessage(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    this.triggerSetResponseMessages(
      response,
      event.detail.index,
      event.detail.value,
      false
    );
  }

  handleDeleteResponseMessage(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    this.triggerSetResponseMessages(response, event.detail, "", true);
  }

  renderStyleSelector(response: GXCFModel.ResponseElement): HTMLElement {
    return (
      <gxg-select
        label={this.componentLocale.responseStyleLabel}
        onChange={event => this.triggerChangeResponseStyle(event, response)}
        style={{ width: "100%" }}
      >
        <gxg-option
          value={ResponseStyles.RedirectTo}
          selected={response.Style == ResponseStyles.RedirectTo}
        >
          {ResponseStyles.PrettyRedirectTo}
        </gxg-option>
        <gxg-option
          value={ResponseStyles.ComponentView}
          selected={response.Style == ResponseStyles.ComponentView}
        >
          {ResponseStyles.PrettyComponentView}
        </gxg-option>
        <gxg-option
          value={ResponseStyles.TextMessage}
          selected={response.Style == ResponseStyles.TextMessage}
        >
          {ResponseStyles.PrettyTextMessage}
        </gxg-option>
      </gxg-select>
    );
  }

  renderizeComponentType(response: GXCFModel.ResponseElement): HTMLElement {
    return (
      <gxg-select
        onChange={(event: CustomEvent) =>
          this.triggerChangeComponentType(event, response)
        }
        label={this.componentLocale.showResponseLabel}
        style={{ width: "100%" }}
      >
        <gxg-option
          value={ComponentTypes.CallPanel}
          selected={response.ComponentType == ComponentTypes.CallPanel}
        >
          {ComponentTypes.CallPanel}
        </gxg-option>
        <gxg-option
          value={ComponentTypes.Component}
          selected={response.ComponentType == ComponentTypes.Component}
        >
          {ComponentTypes.Component}
        </gxg-option>
      </gxg-select>
    );
  }

  renderStyleContent(response: GXCFModel.ResponseElement): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    if (response.Style == ResponseStyles.ComponentView) {
      elements.push(
        <gxg-spacer-layout orientation="horizontal" space="xs">
          {this.renderizeComponentType(response)}
          <gxcf-hint class="HintBlock" hintId={HintId.ShowResponseAs} />
        </gxg-spacer-layout>
      );
      elements.push(
        <gxg-spacer-layout orientation="vertical" space="xs">
          <span>{this.componentLocale.sdComponent}</span>
          <gxg-spacer-layout orientation="horizontal" space="xs">
            <gxcf-select
              selectcaption={response.SDComponentName}
              selectIconType="SDPanel"
              selectType={SelectTypes.Extended}
              onClick={() => this.triggerChangeSDComponent(response)}
            />
            <gxcf-hint class="HintBlock" hintId={HintId.SDComponent} />
          </gxg-spacer-layout>
        </gxg-spacer-layout>
      );
      elements.push(
        <gxg-spacer-layout orientation="vertical" space="xs">
          <span>{this.componentLocale.webComponent}</span>
          <gxg-spacer-layout orientation="horizontal" space="xs">
            <gxcf-select
              selectcaption={response.WebComponentName}
              selectIconType="WebComponent"
              selectType={SelectTypes.Extended}
              onClick={() => this.triggerChangeWebComponent(response)}
            />
            <gxcf-hint class="HintBlock" hintId={HintId.WebComponent} />
          </gxg-spacer-layout>
        </gxg-spacer-layout>
      );
    } else if (response.Style == ResponseStyles.RedirectTo) {
      elements.push(
        <gxg-spacer-layout orientation="horizontal" space="xs">
          <gxcf-redirection
            requireCondition={false}
            redirectionProperty={{
              RedirectCondition: "",
              RedirectTo: response.RedirectTo,
              Index: 0
            }}
            flows={this.instance.Flows}
            onChangeRedirectTo={event =>
              this.triggerChangeResponseRedirectTo(event, response)
            }
            label={this.componentLocale.redirectTo}
            style={{ width: "100%" }}
          />
          <gxcf-hint class="HintBlock" hintId={HintId.Redirection} />
        </gxg-spacer-layout>
      );
    }

    return elements;
  }

  renderResponseParameters(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    if (this.flow.View.Attributes) {
      if (this.flow.View.Attributes.length > 0)
        elements.push(<span>{this.componentLocale.responseParameters}</span>);

      this.flow.View.Attributes.forEach(variable => {
        elements.push(
          <gxg-toggle
            label={variable.Variable}
            size="small"
            on={true}
            onClick={() =>
              this.triggerSwitchResponseParameter(variable.Variable)
            }
          />
        );
      });
    }

    return elements;
  }

  renderResponseSubtitle(response: GXCFModel.ResponseElement) {
    const elements: HTMLElement[] = [];
    const showMsg = response.Format.length > 0 ? response.Format[0] : "";
    if (response.Condition != "") {
      elements.push(<span class="gxg-label">if...</span>);
      elements.push(<span class="gxg-text">{response.Condition}</span>);
      elements.push(<br />);
      elements.push(<span>&emsp;</span>);
    }
    elements.push(<span>{showMsg}</span>);
    return elements;
  }

  renderResponses() {
    const elements: HTMLElement[] = [];
    this.flow.View.Templates.forEach(function(response) {
      elements.push(
        <gxg-accordion-item
          item-title={response.ResponseName}
          mode="boxed"
          padding="xs"
          itemId={response.Index + ""}
        >
          <div slot="subtitle">{this.renderResponseSubtitle(response)}</div>
          <gxcf-button-delete
            onConfirmDelete={() => this.triggerDeleteResponse(response.Index)}
            confirmationTitle={this.componentLocale.deleteResponse}
            confirmationMessage={Locale.format(
              this.componentLocale.askDeleteResponse,
              [
                response.ResponseName
                  ? response.ResponseName
                  : response.Index + ""
              ]
            )}
            slot="meta"
          />
          <gxcf-collection
            collection={response.Format}
            collectionHeader={this.componentLocale.responseMessages}
            collectionAddText={this.componentLocale.addAlternativeMessage}
            collectionHintId={HintId.ResponseMessage}
            defaultNewItemValue={this.componentLocale.sampleResponseMessage}
            onEditItem={event => {
              this.handleEditResponseMessage(event, response);
            }}
            onDeleteItem={event => {
              this.handleDeleteResponseMessage(event, response);
            }}
          />
          <span class="gxg-title-03">{this.componentLocale.condition}</span>
          <gxcf-hint hintId={HintId.ResponseCondition} />
          <gxcf-condition
            currentCondition={response.Condition}
            onConditionChange={event =>
              this.triggerChangeResponseCondition(event, response)
            }
          />
          <gxg-separator type="dashed" margin="m" />
          <gxg-spacer-layout orientation="horizontal">
            {this.renderStyleSelector(response)}
            <gxcf-hint class="HintBlock" hintId={HintId.ResponseStyle} />
          </gxg-spacer-layout>
          {this.renderStyleContent(response)}
          <gxg-separator type="dashed" margin="m" />
          {this.renderResponseParameters()}
        </gxg-accordion-item>
      );
    }, this);
    return elements;
  }

  render() {
    return (
      <gxg-accordion single-item-open mode="boxed" padding="m">
        {this.renderResponses()}
      </gxg-accordion>
    );
  }
}
