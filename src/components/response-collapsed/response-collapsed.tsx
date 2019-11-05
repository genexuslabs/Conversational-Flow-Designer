import { Component, Prop, h } from "@stencil/core";
import { ResponseElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/ResponseElement";

@Component({
  tag: "response-collapsed",
  styleUrl: "response-collapsed.scss",
  shadow: false
})
export class CollapsedResponse {
  @Prop() response: ResponseElement;

  render() {
    return (
      <div class="CollapsedResponse">
        <input
          type="text"
          class="CollapsedResponseTitle"
          value={this.response.Style}
        />
        <down-arrow class="CollapsedResponseDownArrow" />
        <input
          type="text"
          class="FirstResponseMessage"
          value={this.response.GetFristResponseMessage()}
        />
      </div>
    );
  }
}
