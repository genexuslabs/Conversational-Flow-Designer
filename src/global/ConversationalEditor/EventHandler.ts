import { App } from "./App.js";
import { FlowElement } from "./instanceDefinition/Elements/FlowElement.js";
import { GXCF_DropZone } from "../../components/DropZone/gxcf_dropzone.js";
import { DragDropHelpers, MoveType, Controls, ComponentsAttributes } from "./helpers/Helpers.js";
import { UserInputElement } from "./instanceDefinition/Elements/UserInputElement.js";

export var sourceId:string="";

export class EventHandler
{
    private static GetFlowId(element:HTMLElement):string
    {
        let moveNext:boolean = true;
        while (element.parentElement != null && moveNext)
        {
            element = element.parentElement;
            if (element.hasAttribute(ComponentsAttributes.FlowId))
                moveNext = false;
        }
            
        if (element.hasAttribute(ComponentsAttributes.FlowId))
            return element.getAttribute(ComponentsAttributes.FlowId);
        
        return "";
    }

    public static async SelectConversationalObject(customEvent:CustomEvent):Promise<FlowElement>
    {
        let event:MouseEvent = <MouseEvent>EventHandler.GetEvent(customEvent);
        let eventElement:HTMLElement = EventHandler.GetTargetElement(event);
        if (eventElement)
            console.log("Select conversational object for: "+eventElement.id);  
        
        var flow:FlowElement = null;

        if (window.external.SelectConversationalObject)
        {            
            let flowId:string = EventHandler.GetFlowId(eventElement);
            let flowName:string = App.GetApp().Instance.GetFlowName(flowId);     
            await window.external.SelectConversationalObject(flowName).then(sFlow => 
            {
                let jsonFlow = JSON.parse(sFlow);
                flow = App.GetApp().Instance.LoadFlow(flowName, jsonFlow);
                return flow;
            });                      
        }
        return flow;
    }    

    public static GetFormattedMessages(lMessages:string[]):string
    {
        let messages:string = "";
        lMessages.forEach(function(msg){
            messages += msg+";";
        });   
        return messages;
    }

    public static OnFlowDragStart:Function = (customEvent:CustomEvent)=>
    {
        let event:DragEvent = <DragEvent>EventHandler.GetEvent(customEvent);

        if (event.target != null && event.dataTransfer != null)
        {
            let target:HTMLElement = <HTMLElement>event.target;
            event.dataTransfer.setData("text", target.id);
            sourceId = target.id;
        }
    }

    private static GetEvent(event:CustomEvent){
        event.preventDefault;
        return <DragEvent>event.detail;
    }
    
    public static OnDragOverFlow:Function = (customEvent:CustomEvent)=>
    {
        let event:DragEvent = <DragEvent>EventHandler.GetEvent(customEvent);
        event.preventDefault();
        if (event.dataTransfer && event.target)
        {                
            let target:HTMLElement = <HTMLElement>event.target;            
            if (target.hasAttribute(ComponentsAttributes.ElementType))
            {
                if (target.getAttribute(ComponentsAttributes.ElementType) == ComponentsAttributes.ElmentTypeValue && target.id != sourceId)
                {
                    let sourceId:string = event.dataTransfer.getData("text");                                                                            
                    if (target.id != sourceId)
                    {
                        let parent:HTMLElement = <HTMLElement>target.parentElement;
    
                        if (parent.nextElementSibling)
                            GXCF_DropZone.Show(<HTMLElement>parent.nextElementSibling);
                        if (parent.previousElementSibling)
                            GXCF_DropZone.Show(<HTMLElement>parent.previousElementSibling);
    
                        EventHandler.DisableDrop(<HTMLElement>parent.nextElementSibling, <HTMLElement>parent.previousElementSibling);
                    }
                }  
            }
                            
            event.dataTransfer.dropEffect = DragDropHelpers.NoneEffect;
        }        
    }
    
    public static OnLeaveDropZone(customEvent:CustomEvent):void
    {
        let event:DragEvent = <DragEvent>EventHandler.GetEvent(customEvent);
        event.preventDefault();
        
        let dropZone:HTMLElement = EventHandler.GetDropZone(event);
        
        GXCF_DropZone.InActive(dropZone);
    }

    public static OnDragOverDropZone(customEvent:CustomEvent):void
    {
        let event:DragEvent = <DragEvent>EventHandler.GetEvent(customEvent);
        event.preventDefault();

        if (event.dataTransfer)
            event.dataTransfer.dropEffect = DragDropHelpers.MoveEffect;

        let dropZone:HTMLElement = EventHandler.GetDropZone(event);

        GXCF_DropZone.Active(dropZone);
    }

    public static OnDropOverDropZone(customEvent:CustomEvent):void
    {
        let event:DragEvent = <DragEvent>EventHandler.GetEvent(customEvent);

        event.preventDefault();    
        if (event.dataTransfer != null && event.target != null)
        {
            let sourceId = event.dataTransfer.getData("text");
            let element:HTMLElement = <HTMLElement>document.getElementById(sourceId);
            let target:HTMLElement = <HTMLElement>event.target

            let flowId:string = <string>target.getAttribute("data-objectReferenceId");        
            let targetElement:HTMLElement = <HTMLElement>document.getElementById(flowId);
            
            let moveElement:HTMLElement = element.parentElement.parentElement;
            let moveTarget:HTMLElement = targetElement.parentElement.parentElement;
            let moveType:MoveType = MoveType.Up;
            if (target.getAttribute("data-moveType") == DragDropHelpers.MoveDown)
            {
                moveType = MoveType.Down;
                moveTarget.after(moveElement);
            }            
            else
                moveTarget.before(moveElement);
            
            let sourceName:string = App.GetApp().Instance.GetFlowName(element.id);
            let targetName:string = App.GetApp().Instance.GetFlowName(flowId);  
                
            App.GetApp().Instance.MoveFlows(sourceName, targetName, moveType);
        }
    }

    private static GetDropZone(event:DragEvent):HTMLElement
    {
        let dropZone:HTMLElement = <HTMLElement>event.target;
        if (dropZone.tagName != "SPAN")
            dropZone = <HTMLElement>dropZone.firstChild;

        return dropZone;
    }

    private static GetTargetElement(event:Event):HTMLElement
    {
        return <HTMLElement>event.target;
    }

    private static DisableDrop(dropUP:HTMLElement, dropDown:HTMLElement):void
    {
        let flowElements:HTMLCollection = EventHandler.GetDropZones();
        let index:number = 0;
        
        while (index < flowElements.length)
        {
            if (flowElements[index] != dropUP && flowElements[index] != dropDown)
            {
                GXCF_DropZone.Hide(<HTMLElement>flowElements[index]);
            }  
            index++;
        }
    }

    public static DisableDropZones(event:DragEvent)
    {
        let flowElements:HTMLCollection = EventHandler.GetDropZones();
        let index:number = 0;
        console.log(event);
        while (index < flowElements.length)
        {            
            GXCF_DropZone.Hide(<HTMLElement>flowElements[index]);
            index++;
        }
    }

    private static GetDropZones():HTMLCollection
    {
        return document.getElementsByTagName(GXCF_DropZone.Tag);
    }

    public static AddFlowElement():FlowElement[]
    {
        let flow:FlowElement = new FlowElement("New Flow");
        App.GetApp().Instance.AddFlow(flow);        
        if (window.external.AddFlow != undefined)
        {
            window.external.AddFlow();
        }

        return App.GetApp().Instance.Flows;
    }  

    public static GetValue(customEvent:CustomEvent):any
    {
        let event = EventHandler.GetEvent(customEvent);
        if (event.currentTarget)
        {
            let element:HTMLInputElement = <HTMLInputElement>event.currentTarget;
            return element.value;
        }
        return null;
    }
}