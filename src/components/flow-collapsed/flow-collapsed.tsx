import {
  Component,
  Prop,
  Event,
  EventEmitter,
  h,
  Element,
  Method
} from "@stencil/core";
import { StringCollectionHelper } from "../common/string-collection-helper";
import { GXCFModel } from "../common/model";

@Component({
  tag: "gxcf-flow-collapsed",
  shadow: true
})
export class FlowCollapsed {
  @Prop() flow: GXCFModel.FlowElement;

  @Element() element: HTMLElement;

  @Method()
  async setTitleFocus() {
    this.element
      .querySelector("gxg-box")
      .querySelector("gxg-spacer-layout")
      .querySelector("gxg-form-text")
      .focus();
  }

  @Event() modifyFlowName: EventEmitter;
  triggerChangeFlowName(event) {
    this.modifyFlowName.emit.call(this, {
      currentFlowName: this.flow.Name,
      newFlowName: event.detail
    });
  }

  @Event() setTriggers: EventEmitter;
  triggerSetTriggers(index: number, value: string, remove: boolean): void {
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

  getFirstTrigger() {
    if (this.flow.Triggers.length > 0 && this.flow.Triggers[0] !== "")
      return (
        <gxg-form-text
          value={this.flow.Triggers[0]}
          onChange={event => this.triggerSetTriggers(0, event.detail, false)}
          textStyle="quote"
          minimal
        />
      );
  }

  render() {
    return (
      <div>
        <gxg-spacer-layout
          space="xs"
          orientation="horizontal"
          justify-content="flex-start"
        >
          <gxcf-dot
            on={this.flow.Triggers.length > 0}
            style={{
              marginTop:
                "calc(var(--small-icon-height) + (var(--small-icon-height)/2)"
            }}
          />
          <gxg-form-text
            value={this.flow.Name}
            onChange={event => this.triggerChangeFlowName(event)}
            textStyle="title-01"
            minimal
          />
        </gxg-spacer-layout>
        {this.getFirstTrigger()}
      </div>
    );
  }
}
