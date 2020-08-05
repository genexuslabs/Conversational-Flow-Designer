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
  private firstLoad = true;

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  componentDidLoad() {
    this.firstLoad = false;
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
    if (!this.firstLoad) {
      const value: string = EventsHelper.GetValueFromGxgSelect(event);
      this.changeResponseStyle.emit.call(this, {
        flowName: this.flow.Name,
        responseIndex: response.Index,
        style: value
      });
    }
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
      index: response,
      redirectTo: event.detail.value
    });
  }

  handleEditResponseMessage(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    const value = EventsHelper.GetValue(event);
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.triggerSetResponseMessages(response, +index, value, false);
  }

  handleDeleteResponseMessage(
    event: CustomEvent,
    response: GXCFModel.ResponseElement
  ): void {
    const index = EventsHelper.GetCollectionIndexFromDetail(event);
    this.triggerSetResponseMessages(response, +index, "", true);
  }

  renderStyleSelector(response: GXCFModel.ResponseElement): HTMLElement {
    return (
      <gxg-select
        label={this.componentLocale.responseStyleLabel}
        onChange={event => this.triggerChangeResponseStyle(event, response)}
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
      elements.concat([
        <gxcf-hint class="HintBlock" hintId={HintId.ShowResponseAs} />,
        this.renderizeComponentType(response)
      ]);
      elements.concat([
        <gxcf-hint class="HintBlock" hintId={HintId.SDComponent} />,
        <span>{this.componentLocale.sdComponent}</span>,
        <gxcf-select
          selectcaption={response.SDComponentName}
          selectIconType="SDPanel"
          selectType={SelectTypes.Extended}
          onClick={() => this.triggerChangeSDComponent(response)}
        />
      ]);
      elements.concat([
        <gxcf-hint class="HintBlock" hintId={HintId.WebComponent} />,
        <span>{this.componentLocale.wenComponent}</span>,
        <gxcf-select
          selectcaption={response.WebComponentName}
          selectIconType="WebComponent"
          selectType={SelectTypes.Extended}
          onClick={() => this.triggerChangeWebComponent(response)}
        />
      ]);
    } else if (response.Style == ResponseStyles.RedirectTo) {
      elements.concat([
        <gxcf-hint class="HintBlock" hintId={HintId.Redirection} />,
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
        />
      ]);
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
          <gxcf-hint class="HintBlock" hintId={HintId.ResponseStyle} />
          {this.renderStyleSelector(response)}
          {this.renderStyleContent(response)}
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
