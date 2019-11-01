import { Component, Prop, h, EventEmitter, Event, Listen, State } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { HintId } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { CollectionType } from "../../global/ConversationalEditor/instanceDefinition/Elements/IConversationalElement";

@Component({
  tag: "gxcf-flowfull",
  styleUrl: "gxcf_flowfull.scss",
  shadow: false
})
export class GXCF_FlowFull {
    @Prop() flow:FlowElement;
    @State() refresh:boolean = true;

    @Event() onCollapseFlow: EventEmitter;
    TriggerOnCollapseFlow(event){
        this.onCollapseFlow.emit(event);
    }

    TriggerOnAddUserInput(event){    
        console.log(event);
        this.flow.NewUserInput();
        this.refresh = !this.refresh;
    }

    TriggerOnAddResponse(event){    
        console.log(event);
        this.flow.NewResponse();
        this.refresh = !this.refresh;
    }

    get SummaryId():string
    {
        return `GXCFSum_${this.flow.Id}`;
    }

    get ArrowId():string
    {
        return `GXCFArrow_${this.flow.Id}`;
    }

    get SelectId():string
    {
        return `GXCFSelectId_${this.flow.Id}`;
    }

    get DescriptionId():string
    {
        return `GXCFDescriptionId_${this.flow.Id}`;
    }

    get CollectionHeader():string
    {
        return `Sample trigger messages (${this.flow.TriggerMessages.length.toString()})`;
    }

    private RenderizeUserInputs():any[]{
        let userInputs:any[] = [];
        this.flow.UserInputs.forEach(function(userInput){
            userInputs.push(
                <gxcf-userinput userInput={userInput} flow={this.flow} ></gxcf-userinput>
            );
        }, this);
        return userInputs;
    } 

    private RenderizeResponse():any[]
    {
        let responses:any[] = []
        this.flow.Responses.forEach(function(response){
            responses.push(
                <gxcf-collapsedresponse response={response}></gxcf-collapsedresponse>
            );
        });
        return responses;
    }

    @Listen('selectConversationalObject')
    HandleSelectConversationalObject(event:CustomEvent)
    {
        EventHandler.SelectConversationalObject(event).then( retFlow => {
        this.flow = retFlow;
        this.refresh = !this.refresh;
        });
    }

    render() {
        this.flow.UserInputComponent = this;
        return (
        <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
            <div class="FullFlowContent">
                <div class="TabFullFlowContent">
                    <gxcf-summarytitle summaryid={this.SummaryId} summaryvalue={this.flow.Name} classType="FullTitle"></gxcf-summarytitle>            
                    <gxcf-collection collection={ this.flow.TriggerMessages } collectionHeader={this.CollectionHeader} collectionHintId={HintId.TriggerMessages} collectionAddText="Add another sample trigger message" collectionType={ CollectionType.TriggerMessages } itemParent={ this.flow }></gxcf-collection>                
                </div>
            </div>            
            <hr class="Separator"></hr>
            <div class="FullFlowContentUserInputs">
                <div class="ElementsHeader">
                    <span class="LeftTab ElementsHeaderText">User Inputs ({this.flow.UserInputs.length})</span>
                    <gxcf-hint hintId={HintId.UserInput} class="Hint"/>
                </div>
                { this.RenderizeUserInputs() }
                <div class="AddFlowElement LeftTab" onClick={ (event) => this.TriggerOnAddUserInput(event)}>
                    <gxcf-addelement></gxcf-addelement>
                    <span class="AddElementText">Add another user input</span>
                </div>
            </div>
            <hr class="Separator"></hr>
            <div class="FullFlowContentResponses">
                <div class="ElementsHeader">
                    <span class="ElementsHeaderText">Responses ({this.flow.UserInputs.length})</span>
                    <gxcf-hint hintId={ HintId.Responses } class="Hint"/>
                </div>
                { this.RenderizeResponse() }
                <div class="AddFlowElement" onClick={ (event) => this.TriggerOnAddResponse(event)}>
                    <gxcf-addelement></gxcf-addelement>
                    <span class="AddElementText">Add another possible response</span>
                </div>
            </div>
        </div>
        );
      }
}