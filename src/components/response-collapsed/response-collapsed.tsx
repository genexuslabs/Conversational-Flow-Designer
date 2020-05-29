import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { EventsHelper } from "../common/events-helper";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-response-collapsed",
  styleUrl: "response-collapsed.scss",
  shadow: true,
  assetsDirs: ["assets/gxcf-response-collapsed-lang"]
})
export class CollapsedResponse {
  @Prop() response: GXCFModel.ResponseElement;
  @Element() element: HTMLElement;

  private componentLocale: any;

  @Event() expandResponse: EventEmitter;
  TriggerOnExpandResponse(event): void {
    this.expandResponse.emit(event);
  }

  @Event() changeResponseName: EventEmitter;
  TriggerChangeResponseName(event): void {
    this.changeResponseName.emit(event);
  }

  @Event() setResponseMessagesInternal: EventEmitter;
  TriggerSetResponseMessagesInternal(
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

  @Event() clickOnInput;
  TriggerOnClickResponseInputName(event: MouseEvent): void {
    this.clickOnInput.emit.call(this, {
      source: event.target as HTMLInputElement
    });
  }

  HandleEditFirstResponseMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValueFromInput(event);
    this.TriggerSetResponseMessagesInternal(0, value, false);
  }

  private GetDownArrow(): HTMLElement {
    return (
      <gxg-icon
        size="regular"
        type="chevron-down"
        color="onbackground"
        class="CollapsedResponseDownArrow"
        onClick={event => this.TriggerOnExpandResponse(event)}
      />
    );
  }

  private GetHeader(): HTMLElement[] {
    const title: HTMLElement[] = new Array<HTMLElement>();
    title.push(
      <input
        type="text"
        class="CollapsedResponseTitle gxg-title-01"
        value={this.response.ResponseName}
        placeholder={this.componentLocale.responseNamePlaceHolder}
        onChange={event => this.TriggerChangeResponseName(event)}
        onClick={event => this.TriggerOnClickResponseInputName(event)}
      />
    );
    title.push(this.GetDownArrow());
    if (this.response.Condition != "") {
      title.push(
        <div class="ConditionHeader">
          <span class="gxg-label">if...</span>
          <span class="gxg-text">{this.response.Condition}</span>
        </div>
      );
    }
    return title;
  }

  private GetFirstResponseMessageClass(): string {
    let tab = "FirstResponseMessageNoTab";
    if (this.response.Condition != "") tab = "FirstResponseMessageTab";
    return `FirstResponseMessage ${tab} gxg-quote`;
  }

  GetFristResponseMessage(): string {
    if (this.response.Format.length > 0) return this.response.Format[0];
    return "";
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  render() {
    return (
      <div class="CollapsedResponse">
        <gxcf-dot class="DotPosition" />
        {this.GetHeader()}
        <input
          type="text"
          class={this.GetFirstResponseMessageClass()}
          value={this.GetFristResponseMessage()}
          placeholder={this.componentLocale.firsResponsePlaceHolder}
          onChange={(event: CustomEvent) =>
            this.HandleEditFirstResponseMessage(event)
          }
        />
      </div>
    );
  }
}
