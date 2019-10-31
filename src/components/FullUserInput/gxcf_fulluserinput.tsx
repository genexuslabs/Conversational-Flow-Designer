import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { HintId } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-fulluserinput",
  styleUrl: "gxcf_fulluserinput.scss",
  shadow: false
})
export class GXCF_FullUserInput {
  @Prop() userInput: UserInputElement;

  @Event() onCollapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event){    
    this.onCollapseUserInput.emit(event);
  }


  render() {
      return (
        <div class="FullUserInput">
          <input type="text" class="UserInputTitle" value={this.userInput.Variable} />
          <gxcf-uparrow class="ExpandUserInputDownArrow" onClick={ (event) => this.TriggerOnCollapseUserInput(event)}></gxcf-uparrow>
          <p class="DataType">Datatype: {this.userInput.DataType}</p>   
          <img class="SwitchIconOn"/><span class="TextMode">Advanced mode ON</span>
          <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Condition to be required</span><gxcf-hint hintId={HintId.Required} class="UserInputHints"/></summary>
          <p>Test</p>
          </details>
          <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Ask messages</span><gxcf-hint hintId={HintId.AskMessages} class="UserInputHints"/></summary>
            <gxcf-collection collection={this.userInput.RequiredMessages} collectionAddText="Add another ask message"></gxcf-collection>
          </details>
          <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Validate User Input</span><gxcf-hint hintId={HintId.ValidateUserInput} class="UserInputHints"/></summary>
          </details>
          <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Redirection</span><gxcf-hint hintId={HintId.Redirection} class="UserInputHints"/></summary>
          </details>
        </div>
      );
  }
}