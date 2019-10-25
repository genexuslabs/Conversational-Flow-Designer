import { Component, h, Listen, State } from "@stencil/core";
import { App } from "../../global/ConversationalEditor/App";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { Controls } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-conversationaldesigner",
  styleUrl: "gxcf_conversationaldesigner.scss",
  shadow: false
})
export class GXCF_ConversationalDesginer {

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

@Listen('openEditor')
HandleOpenEditor(){
  this.openEditor = true;
}

HandleAddFlowElement()
{  
  this.flows =  EventHandler.AddFlowElement();
  console.log(this.flows)
}

@State() flows:FlowElement[];
@State() openEditor:boolean;

private addFlow = 
  <div id="AddFlowElement" class="AddFlow" onClick={ () => this.HandleAddFlowElement() }>
    <gxcf-pluselement></gxcf-pluselement><span>Add another Flow</span>            
  </div>;

  render() {
    this.Initialize();
    console.log("Post initialize");
    
    if (!this.openEditor && App.GetApp().InstanceIsEmpty())
    {
      return (<gxcf-welcome></gxcf-welcome>)
    }
          
    return (
      <div class="MainTable">
        <div id={Controls.FlowsContainer} class="FlowsContainer">
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
      flows.push(<gxcf-flow flow = {flowElement} showDropZone={false}></gxcf-flow>);
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

    var mainInfoConsole = console.info;
    console.info = function(message) 
    {
        if (window.external.Log)
        {
            window.external.Log(message);
        }        
        mainInfoConsole.apply(console, [message]);
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
    
    var mainWarnConsole = console.warn;
    console.warn = function(message)
    {
        if (window.external.LogWarning)
        {
            window.external.LogWarning(message);
        }
        mainWarnConsole.apply(console, [message]);
    }    

    var mainExcepetionConsole = console.exception;
    console.exception = function(message)
    {
      if (window.external.LogError)
        {
            window.external.LogError(message);
        }
        mainExcepetionConsole.apply(console, [message]);
    }

    window.ondragend = function(event:DragEvent){
      EventHandler.DisableDropZones(event);
    }
    App.GetApp()    
  }   
}