import { Component, Prop, h } from "@stencil/core";
import { ResponseElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/ResponseElement";

@Component({
  tag: "gxcf-collapsedresponse",
  styleUrl: "gxcf_collapsedresponse.scss",
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
        <gxcf-downarrow class="CollapsedResponseDownArrow"></gxcf-downarrow>
        <input
          type="text"
          class="FirstResponseMessage"
          value={this.response.GetFristResponseMessage()}
        />
      </div>
    );
  }
}
