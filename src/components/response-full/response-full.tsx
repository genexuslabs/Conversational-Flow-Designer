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

@Component({
  tag: "gxcf-response-full",
  styleUrl: "response-full.scss",
  shadow: true,
  assetsDirs: ["assets/gxcf-response-full-lang"]
})
export class FullResponse {
  @Prop() response: GXCFModel.ResponseElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @Prop() responseIndex: number;
  @Element() element: HTMLElement;

  private componentLocale: any;

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

  @Event() clickOnInput;
  TriggerOnClickResponseInputName(event: MouseEvent): void {
    this.clickOnInput.emit.call(this, {
      source: event.target as HTMLInputElement
    });
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  private RenderStyleSelector(): HTMLElement {
    return (
      <gxg-select
        label={this.componentLocale.responseStyleLabel}
        onChange={(event: CustomEvent) =>
          this.TriggerChangeResponseStyle(event)
        }
        fullWidth
      >
        <gxg-option
          value={ResponseStyles.RedirectTo}
          selected={this.response.Style == ResponseStyles.RedirectTo}
        >
          {ResponseStyles.PrettyRedirectTo}
        </gxg-option>
        <gxg-option
          value={ResponseStyles.ComponentView}
          selected={this.response.Style == ResponseStyles.ComponentView}
        >
          {ResponseStyles.PrettyComponentView}
        </gxg-option>
        <gxg-option
          value={ResponseStyles.TextMessage}
          selected={this.response.Style == ResponseStyles.TextMessage}
        >
          {ResponseStyles.PrettyTextMessage}
        </gxg-option>
      </gxg-select>
    );
  }

  private RenderizeComponentType(): HTMLElement {
    return (
      <gxg-select
        onChange={(event: CustomEvent) =>
          this.TriggerChangeComponentType(event)
        }
        label={this.componentLocale.showResponseLabel}
        fullWidth
        value={this.response.ComponentType}
      >
        <gxg-option
          value={ComponentTypes.CallPanel}
          selected={this.response.ComponentType == ComponentTypes.CallPanel}
        >
          {ComponentTypes.CallPanel}
        </gxg-option>
        <gxg-option
          value={ComponentTypes.Component}
          selected={this.response.ComponentType == ComponentTypes.Component}
        >
          {ComponentTypes.Component}
        </gxg-option>
      </gxg-select>
    );
  }

  private RenderStyleContent(): HTMLElement[] {
    const elements: Array<HTMLElement> = new Array<HTMLElement>();
    if (this.response.Style == ResponseStyles.ComponentView) {
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.ShowResponseAs} />
          {this.RenderizeComponentType()}
        </div>
      );
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.SDComponent} />
          <span>{this.componentLocale.sdComponent}</span>
          <gxcf-select
            selectcaption={this.response.SDComponentName}
            selectIconType="SDPanel"
            selectType={SelectTypes.Extended}
            onClick={() => this.TriggerChangeSDComponent()}
          />
        </div>
      );
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.WebComponent} />
          <span>{this.componentLocale.wenComponent}</span>
          <gxcf-select
            selectcaption={this.response.WebComponentName}
            selectIconType="WebComponent"
            selectType={SelectTypes.Extended}
            onClick={() => this.TriggerChangeWebComponent()}
          />
        </div>
      );
    } else if (this.response.Style == ResponseStyles.RedirectTo) {
      elements.push(
        <div class="ResponseProperty">
          <gxcf-hint class="HintBlock" hintId={HintId.Redirection} />
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
            label={this.componentLocale.redirectTo}
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
          class="FullResponseTitle gxg-title-01"
          value={this.response.ResponseName}
          placeholder={this.componentLocale.responseName}
          onChange={event => this.TriggerChangeResponseName(event)}
          onClick={event => this.TriggerOnClickResponseInputName(event)}
        />
        <gxg-icon
          size="regular"
          type="chevron-up"
          class="FullResponseCommands"
          onClick={event => this.TriggerCollapseResponse(event)}
        />
        <gxcf-button-delete
          class="FullResponseCommands"
          onConfirmDelete={event => this.TriggerDeleteResponseFull(event)}
          confirmationTitle={this.componentLocale.deleteResponse}
          confirmationMessage={Locale.format(
            this.componentLocale.askDeleteResponse,
            [this.response.Index + ""]
          )}
          type="close"
        />
        <gxcf-collection
          collection={this.response.Format}
          collectionHeader={this.componentLocale.responseMessages}
          collectionAddText={this.componentLocale.addAlternativeMessage}
          collectionHintId={HintId.ResponseMessage}
          defaultNewItemValue={this.componentLocale.sampleResponseMessage}
          onEditItem={event => {
            this.HandleEditResponseMessage(event);
          }}
          onDeleteItem={event => {
            this.HandleDeleteResponseMessage(event);
          }}
        />
        <div class="ConditionMargin">
          <span class="ConditionLabel gxg-title-03">
            {this.componentLocale.condition}
          </span>
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
          <gxcf-hint class="HintBlock" hintId={HintId.ResponseStyle} />
        </div>
        {this.RenderStyleSelector()}
        {this.RenderStyleContent()}
      </div>
    );
  }
}
