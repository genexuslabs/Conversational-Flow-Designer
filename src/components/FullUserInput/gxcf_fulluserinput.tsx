import { Component, Prop, h, EventEmitter, Event, State, Listen } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { HintId } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { CollectionType } from "../../global/ConversationalEditor/instanceDefinition/Elements/IConversationalElement";

@Component({
  tag: "gxcf-fulluserinput",
  styleUrl: "gxcf_fulluserinput.scss",
  shadow: false
})
export class GXCF_FullUserInput {
  @Prop() userInput: UserInputElement;
  @Prop() flow:FlowElement
  @State() enableAdvancedMode: boolean = false;
  @State() refresh:boolean = false;

  @Event() onCollapseUserInput: EventEmitter;
  TriggerOnCollapseUserInput(event){    
    this.onCollapseUserInput.emit(event);
  }

  @Event() onModifyUserInputName: EventEmitter;
  TriggerOnModifyUserInputName(event){    
    this.onModifyUserInputName.emit(event);
  }

  TriggerOnChangeValidationProcedure(event){    
    console.log(event);
    EventHandler.SelectValidationProcedure(this.flow, this.userInput).then(uInput =>
    {
      this.userInput = uInput;
      this.refresh = !this.refresh;
    });
  }

  SwitchAdvancedMode(event){
    console.log(event);
    this.enableAdvancedMode = !this.enableAdvancedMode;
  }

  private RenderBasicMode():any
  {
    return (
      <details open><summary class="UserInputPart"><span class="UserInputPartSummaryText">Ask messages</span></summary>
        <gxcf-hint hintId={HintId.AskMessages} class="UserInputHints"/>
        <gxcf-collection collection={this.userInput.RequiredMessages} collectionAddText="Add another ask message" itemParent={this.userInput} collectionType={ CollectionType.AskMessages }></gxcf-collection>
      </details>
    );
  }

  private RenderAdvancedMode():any
  {
    return (
      <div>
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Condition to be required</span></summary>
          <gxcf-hint hintId={HintId.Required} class="UserInputHints"/>
          <div class="ContainerRequiredConditon">
            <span class="LabelRequiredConditon">If...</span>
            <input class="InputRequiredCondition" placeholder="always" value={this.userInput.RequiredCondition}/>
          </div>
        </details>
        {this.RenderBasicMode()}
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Validate User Input</span></summary>
          <div>
            <gxcf-hint hintId={HintId.ErrorMessages} class="UserInputHints"/>
            <gxcf-collection collection={this.userInput.ErrorMessages} collectionAddText="Add another error message" itemParent={this.userInput} collectionType={ CollectionType.OnErrorMessages } collectionHeader="Entity or Data Type Error messages"></gxcf-collection>
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint hintId={HintId.TryLimit} class="UserInputHints"/>
            <span>Try Limit</span>            
            <input class="UserInputLine" placeholder="0 - No limits" value={this.userInput.TryLimit}/>
            <hr class="Separator"></hr>
          </div>
          <div class="ContainerForUserInput">
            <gxcf-hint hintId={HintId.ValidateUserInput} class="UserInputHints"/>
            <span>Validation Procedure</span>       
            <input class="UserInputLine SelectVP" placeholder="Select a Validation Procedure" value={this.userInput.ValidationProcedure} onClick={ (event) => this.TriggerOnChangeValidationProcedure(event)}/>     
          </div>
        </details>
        <details><summary class="UserInputPart"><span class="UserInputPartSummaryText">Redirection</span></summary>
        <gxcf-hint hintId={HintId.Redirection} class="UserInputHints"/>
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
          <input type="text" class="UserInputTitle" value={this.userInput.Variable} onChange={ (event) => this.TriggerOnModifyUserInputName(event)}/>
          <gxcf-uparrow class="ExpandUserInputDownArrow" onClick={ (event) => this.TriggerOnCollapseUserInput(event)}></gxcf-uparrow>
          <p class="DataType">Datatype: {this.userInput.DataType}</p>   
          <img class={switchClass} onClick={ (event) => this.SwitchAdvancedMode(event) }/><span class="TextMode">Advanced mode {advancedEditionStatus}</span>
          { editionMode }
        </div>
      );
  }
}