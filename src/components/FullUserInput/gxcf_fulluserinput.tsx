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
  @State() enableAdvancedMode: boolean = false;
  
  @Event() onCollapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event){    
    this.onCollapseUserInput.emit(event);
  }

  SwitchAdvancedMode(event){
    console.log(event);
    this.enableAdvancedMode = !this.enableAdvancedMode;
  }

  private RenderBasicMode():any
  {
    return (
      <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Ask messages</span><gxcf-hint hintId={HintId.AskMessages} class="UserInputHints"/></summary>
        <gxcf-collection collection={this.userInput.RequiredMessages} collectionAddText="Add another ask message"></gxcf-collection>
      </details>
    );
  }

  private RenderAdvancedMode():any
  {
    return (
      <div>
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Condition to be required</span><gxcf-hint hintId={HintId.Required} class="UserInputHints"/></summary>
          <p>Test</p>
        </details>
        {this.RenderBasicMode()}
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Validate User Input</span><gxcf-hint hintId={HintId.ValidateUserInput} class="UserInputHints"/></summary>
        </details>
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Redirection</span><gxcf-hint hintId={HintId.Redirection} class="UserInputHints"/></summary>
        </details>
      </div>
    );
  }

  render() {
      let editionMode:any;
      let advancedEditionStatus:string;
      let switchClass:string;
      if (this.enableAdvancedMode)
      {
        switchClass = "SwitchIconOn";
        editionMode = this.RenderAdvancedMode();
        advancedEditionStatus = "ON";
      }        
      else
      {
        switchClass = "SwitchIconOff";
        advancedEditionStatus = "OFF";
        editionMode = this.RenderBasicMode();
      }        

      return (
        <div class="FullUserInput">
          <input type="text" class="UserInputTitle" value={this.userInput.Variable} />
          <gxcf-uparrow class="ExpandUserInputDownArrow" onClick={ (event) => this.TriggerOnCollapseUserInput(event)}></gxcf-uparrow>
          <p class="DataType">Datatype: {this.userInput.DataType}</p>   
          <img class={switchClass} onClick={ (event) => this.SwitchAdvancedMode(event) }/><span class="TextMode">Advanced mode {advancedEditionStatus}</span>
          { editionMode }
        </div>
      );
  }
}