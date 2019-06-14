import { Component, h, Listen, State } from "@stencil/core";
import { App } from "../ConversationalEditor/App";
import { EventHandler } from "../ConversationalEditor/EventHandler";
import { FlowElement } from "../ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { Controls } from "../ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-conversationaldesigner",
  styleUrl: "gxcf_conversationaldesigner.scss",
  shadow: false
})
export class GXCF_ConversationalDesginer {

@Listen('onExpandFlow')
HandleExpandFlow(event:CustomEvent)
{
  EventHandler.SummaryFlowExpand(event)    
}

@Listen('selectConversationalObject')
HandleSelectConversationalObject(event:CustomEvent)
{
  EventHandler.SelectConversationalObject(event)   
}

@Listen('onFlowDragStart')
HandleOnFlowDragStart(event:CustomEvent)
{
  EventHandler.OnFlowDragStart(event) 
}

@Listen('onDragOverFlow')
HandleOnDragOverFlow(event:CustomEvent)
{
  EventHandler.OnDragOverFlow(event)
}

@Listen('dropOnDropZone')
HandleDropOnDropZone(event:CustomEvent)
{
  EventHandler.OnDropOverDropZone(event);
}

@Listen('onDragOverDropZone')
HandleOnDragOverDropZone(event:CustomEvent)
{
  EventHandler.OnDragOverDropZone(event);
}

@Listen('onDragLeaveDropZone')
HandleOnDragLeaveDropZone(event:CustomEvent)
{
  EventHandler.OnLeaveDropZone(event);
}

@Listen('changingFlowName')
HandleChangingFlowName(event:CustomEvent)
{
  console.log(event);
}

@Listen('changingFlowTriggerSummary')
HandleChangingFlowTriggerSummary(event:CustomEvent)
{
  console.log(event);
}

HandleAddFlowElement()
{  
  this.flows =  EventHandler.AddFlowElement();
  console.log(this.flows)
}

@State() flows:FlowElement[];

private addFlow = 
  <div id="AddFlowElement" class="AddFlow" onClick={ () => this.HandleAddFlowElement() }>
    <gxcf-pluselement></gxcf-pluselement><span>Add another Flow</span>            
  </div>;

  render() {
    this.Initialize();    

    return (
      <div class="MainTable">
        <div id={Controls.FlowsContainer}>
          {this.RenderizeFlows()}
        </div>      
        {this.addFlow}
      </div>
    );    
  }
  
  private RenderizeFlows():any[]{
    let flows:any[] = [];
    
    App.GetApp().Instance.Flows.forEach(function(flowElement){      
      console.log(flowElement);
      flows.push(
      <gxcf-flow         
        flow = {flowElement}     
        flowRenderType="summary"
        showDropZone={false}   
      >        
      </gxcf-flow>)
    });
    return flows;
  }

  private Initialize():void{
    var mainLogConsole = console.log;
    console.log = function(message) 
    {
        if (window.external.Log)
        {
            window.external.Log(message);
        }        
        mainLogConsole.apply(console, [message]);
    }

    var mainErrorConsole = console.error;
    console.error = function(message)
    {
        if (window.external.LogError)
        {
            window.external.LogError(message);
        }
        mainErrorConsole.apply(console, [message]);
    }

    var mainWarnConsole = console.warn
    console.warn = function(message)
    {
        if (window.external.LogWarning)
        {
            window.external.LogWarning(message);
        }
        mainWarnConsole.apply(console, [message]);
    }    

    window.ondragend = function(event:DragEvent){
      EventHandler.DisableDropZones(event);
    }

    App.GetApp()    
  }   
}