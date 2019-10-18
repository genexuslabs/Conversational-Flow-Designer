import { Component, Prop, h, EventEmitter, Event, State, Listen } from "@stencil/core";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { RenderingOptions, HintId } from "../../global/ConversationalEditor/helpers/Helpers";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { GXCF_Collection } from "../Collection/gxcf_collection";

@Component({
  tag: "gxcf-flowfull",
  styleUrl: "gxcf_flowfull.scss",
  shadow: false
})
export class GXCF_FlowFull {
    @Prop() flow:FlowElement;

    @Event() onCollapseFlow: EventEmitter;
    TriggerOnCollapseFlow(event){
        this.flow.RenderType = RenderingOptions.Summary;
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

    render() {
        return (
        <div id={this.flow.Id} data-elementType="flow" class="FlowFull">
            <div class="FullFlowContent">
                <gxcf-summarytitle summaryid={this.SummaryId} summaryvalue={this.flow.Name} class="FlowTitle"></gxcf-summarytitle>            
                <gxcf-uparrow arrowid={this.ArrowId} onClick={ (event) => this.TriggerOnCollapseFlow(event)} class="FlowUpArrow"></gxcf-uparrow>
                <gxcf-collection collection={ this.flow.TriggerMessages } collectionHeader={this.CollectionHeader} collectionHintId={HintId.TriggerMessages} collectionHintDescription="What's a trigger message?"></gxcf-collection>
            </div>
            <hr class="Separator"></hr>
        </div>
        );
      }
}