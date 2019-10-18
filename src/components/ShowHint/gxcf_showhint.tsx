import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";
import { PropertiesDefinition } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-showhint",
  styleUrl: "gxcf_showhint.scss",
  shadow: false
})
export class GXCF_ShowHint {
  @Prop() hintId: string;

  @Event() showHint:EventEmitter;
  ShowHint(event)
  {
    this.showHint.emit(event);
  }

  render() {

    return (
        <div>
            <p>{PropertiesDefinition.GetTitle(this.hintId)}</p>
            <p>{PropertiesDefinition.GetDescription(this.hintId)}</p>
        </div>
    );
  }
}