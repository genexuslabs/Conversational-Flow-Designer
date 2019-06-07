import { MoveType } from "../helpers/Helpers.js";
import { FlowElement } from "./Elements/FlowElement.js";

export class Instance
{                    
    public Flows:FlowElement[] = [];

    //Initialize
    constructor()
    {
        this.Initialize();
    }

    private Initialize():void
    {
        this.LoadDummy();        
    }

    private LoadDummy():void{
        let flow:FlowElement = new FlowElement("TestA");
        flow.TriggerMessages[0] = "testing"
        flow.ConversationalObject = "TestAProcedure"
        this.Flows[0] = flow;

        let flow2:FlowElement = new FlowElement("TestB");
        flow2.TriggerMessages[0] = "testingB"
        flow2.ConversationalObject = "TestBDataProvider"
        this.Flows[1] = flow2;
        
        let flow3:FlowElement = new FlowElement("TestC");
        flow3.TriggerMessages[0] = "testingC"
        flow3.ConversationalObject = "TestCTransaction"
        this.Flows[2] = flow3;

        //this.RenderizeFlows();
        console.log(this.Flows);
    }

    public InitializeInstance(instance: JSON) {
        let index:number = 0;
        console.log(JSON.stringify(instance));
        instance.Flows.forEach(function(initializeFlow){                
            let flow:FlowElement = new FlowElement(initializeFlow.Name)               
            flow.ConversationalObject = initializeFlow.ConversationalObjectName;          
            flow.TriggerMessages = initializeFlow.Triggers;                        
            //App.GetApp().Instance.Flows[index] = flow;                        
            console.log(index);
            index++;            
        });
    } 

    //Instance behavior                   
    public GetFlow(name:string):FlowElement
    {
        let flowElement:FlowElement = new FlowElement("");
        this.Flows.forEach(function(element)
        {
            if (element.FormatName() == name)
            {
                flowElement = element;
            }            
        });
        return flowElement;
    }

    public GetFlowName(id:string):string
    {
        let elementName:string = "";
        this.Flows.forEach(function(element)
        {            
            if (id == element.Id)
            {      
                elementName = element.Name;
            }
        });
        return elementName;
    }

    public ModifyFlowName(flowName: string, value: string) {
        this.Flows.forEach(function(element)
        {            
            if (flowName == element.Name)
            {        
                element.Name = value;
                if (window.external.ModifyFlowName)
                {
                    window.external.ModifyFlowName(flowName, value);
                }                
            }
        });
    }

    public ModifyFlowTriggerSummary(flowName: string, value: string) {
        this.Flows.forEach(function(element)
        {
            if (flowName == element.Name)
            {                
                element.TriggerMessages[0] = value;

                if (window.external.ModifyFirstTriggerMessage)
                {
                    window.external.ModifyFirstTriggerMessage(flowName, value);
                }                
            }
        });
    }  

    public MoveFlows(sourceName: string, targetName: string, moveType:MoveType) {
        let sourceFlow:FlowElement = new FlowElement("");

        let sourceIndex:number = 0;
        let targetIndex:number = 0;
        var index = 0;
        this.Flows.forEach(function(element)
        {
            if (element.Name == sourceName)
            {
                sourceFlow = element;
                sourceIndex = index;
            }
            else if (element.Name == targetName)
                targetIndex = index;
            index++;
        });
        
        if (moveType == MoveType.Up)
        {
            if (targetIndex == 0)
                this.Flows.unshift(sourceFlow);
            else
                this.Flows.splice(targetIndex, 0, sourceFlow)
        }
        else if (moveType == MoveType.Down){
            if (targetIndex == this.Flows.length)
                this.Flows.push(sourceFlow);
            else (targetIndex < this.Flows.length)
                this.Flows.splice(targetIndex+1, 0, sourceFlow);
        }

        if (sourceIndex == 0)
            this.Flows.splice(sourceIndex, 1);
        else{
            if (moveType == MoveType.Up)
                this.Flows.splice(sourceIndex+1, 1)
            else
                this.Flows.splice(sourceIndex, 1);
        }

        if (window.external.MoveFlow)
        {
            window.external.MoveFlow(sourceName, targetName, moveType.toString());
        }  
    }

    public SelectConversationalObject(flowName: string) {
        if (window.external.SelectConversationalObject)
        {
            window.external.SelectConversationalObject(flowName);
        }
    } 

    public SetConversationalObject(flowName: string, conversationalObject: string) {
        this.Flows.forEach(function(element){
            if (element.Name == flowName){
                element.ConversationalObject = conversationalObject;
              //  FlowRender.RefreshConversationalObject(element);
            }
        });
    }  

    public AddFlow(flow: FlowElement):void
    {
        this.Flows[this.Flows.length] = flow;
    }  
}

export interface JSON{
    Provider:string;
    Flows:JSON[];
    Name:string;
    Triggers:string[];
    ConversationalObjectName:string;
}