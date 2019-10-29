import { Component, Prop, h, EventEmitter, Event, Listen, State } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { RenderingOptions, HintId } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { App } from "../../global/ConversationalEditor/App";

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
        this.flow = App.GetApp().Instance.SetFlowRenderType(this.flow, RenderingOptions.Summary);
        this.onCollapseFlow.emit(event);
    }
    
    @Listen('editItem')
    HandleEditItem(event:Event)
    {
        let element:any = event.srcElement;            
        EventHandler.EditTrigger(element.currentItemIndex, element.currentItemValue, this.flow);
    }
    
    @Listen('deleteItem')
    HandleDeleteItem(event:Event)
    {
        let element:any = event.srcElement;            
        EventHandler.DeleteTrigger(element.currentItemIndex, this.flow);
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
        console.log("Flow: "+JSON.stringify(this.flow))
        this.flow.UserInputs.forEach(function(userInput){
            userInputs.push(
                <gxcf-collapseduserinput userInput={userInput}></gxcf-collapseduserinput>
            );
        });
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
        console.log("Render");
        return (
        <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
            <div class="FullFlowContent">
                <gxcf-summarytitle summaryid={this.SummaryId} summaryvalue={this.flow.Name} classType="FullTitle"></gxcf-summarytitle>            
                <gxcf-uparrow arrowid={this.ArrowId} onClick={ (event) => this.TriggerOnCollapseFlow(event)} class="FlowUpArrow"></gxcf-uparrow>
                <gxcf-collection collection={ this.flow.TriggerMessages } collectionHeader={this.CollectionHeader} collectionHintId={HintId.TriggerMessages}></gxcf-collection>                
            </div>
            <hr class="Separator"></hr>
            <div class="FullFlowContentUserInputs">
                <div class="ElementsHeader">
                    <span class="LeftTab">User Inputs ({this.flow.UserInputs.length})</span>
                    <gxcf-hint hintId={HintId.UserInput} class="Hint"/>
                </div>
                { this.RenderizeUserInputs() }
                <div class="AddFlowElement LeftTab">
                    <gxcf-pluselement></gxcf-pluselement>
                    <span class="AddElementText">Add another user input request</span>
                </div>
            </div>
            <hr class="Separator"></hr>
            <div class="FullFlowContent">
                <div class="ElementsHeader">
                    <span>Responses ({this.flow.UserInputs.length})</span>
                    <gxcf-hint hintId={ HintId.Responses } class="Hint"/>
                </div>
                { this.RenderizeResponse() }
                <div class="AddFlowElement">
                    <gxcf-pluselement></gxcf-pluselement>
                    <span class="AddElementText">Add another possible response</span>
                </div>
            </div>
            <gxcf-conversationalobject conversationalObject={this.flow.ConversationalObject}></gxcf-conversationalobject>
        </div>
        );
      }
}