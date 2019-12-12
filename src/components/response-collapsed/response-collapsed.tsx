import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { EventsHelper } from "../common/events-helper";

@Component({
  tag: "gxcf-response-collapsed",
  styleUrl: "response-collapsed.scss",
  shadow: true
})
export class CollapsedResponse {
  @Prop() response: GXCFModel.ResponseElement;
  @Element() element: HTMLElement;

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

  HandleEditFirstResponseMessage(event: CustomEvent): void {
    const value = EventsHelper.GetValueFromInput(event);
    this.TriggerSetResponseMessagesInternal(0, value, false);
  }

  private GetDownArrow(): HTMLElement {
    return (
      <gxcf-down-arrow
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
        class="CollapsedResponseTitle"
        value={this.response.ResponseName}
        placeholder="Response name..."
        onChange={event => this.TriggerChangeResponseName(event)}
      />
    );
    title.push(this.GetDownArrow());
    if (this.response.Condition != "") {
      title.push(
        <div class="ConditionHeader">
          <span class="IfTitle">if...</span>
          <span class="ConditionTitle">{this.response.Condition}</span>
        </div>
      );
    }
    return title;
  }

  private GetFirstResponseMessageClass(): string {
    let tab = "FirstResponseMessageNoTab";
    if (this.response.Condition != "") tab = "FirstResponseMessageTab";
    return `FirstResponseMessage ${tab}`;
  }

  componentDidLoad(): void {
    const responseTitle = this.element.shadowRoot.querySelector("input");
    if (responseTitle) responseTitle.focus();
  }

  GetFristResponseMessage(): string {
    if (this.response.Format.length > 0) return this.response.Format[0];
    return "";
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
          placeholder="First response message..."
          onChange={(event: CustomEvent) =>
            this.HandleEditFirstResponseMessage(event)
          }
        />
      </div>
    );
  }
}
