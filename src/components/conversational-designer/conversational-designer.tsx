import { Component, h, Listen, State } from "@stencil/core";
import { App } from "../../global/ConversationalEditor/App";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { Controls } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "conversational-designer",
  styleUrl: "conversational-designer.scss",
  shadow: false
})
export class ConversationalDesginer {
  @Listen("onFlowDragStart")
  HandleOnFlowDragStart(event: CustomEvent): void {
    EventHandler.OnFlowDragStart(event);
  }

  @Listen("onDragOverFlow")
  HandleOnDragOverFlow(event: CustomEvent): void {
    EventHandler.OnDragOverFlow(event);
  }

  @Listen("dropOnDropZone")
  HandleDropOnDropZone(event: CustomEvent): void {
    EventHandler.OnDropOverDropZone(event);
  }

  @Listen("onDragOverDropZone")
  HandleOnDragOverDropZone(event: CustomEvent): void {
    EventHandler.OnDragOverDropZone(event);
  }

  @Listen("onDragLeaveDropZone")
  HandleOnDragLeaveDropZone(event: CustomEvent): void {
    EventHandler.OnLeaveDropZone(event);
  }

  @Listen("openEditor")
  HandleOpenEditor(): void {
    this.openEditor = true;
  }

  HandleAddFlowElement(): void {
    this.flows = EventHandler.AddFlowElement();
  }

  @State() flows: FlowElement[];
  @State() openEditor: boolean;

  private addFlow = (
    <div
      id="AddFlowElement"
      class="AddFlow"
      onClick={() => this.HandleAddFlowElement()}
    >
      <add-element></add-element>
      <span class="AddFlowElementText">Add another Flow</span>
    </div>
  );

  private RenderizeFlows(): HTMLElement[] {
    const flows: HTMLElement[] = [];

    App.GetApp().Instance.Flows.forEach(function(flowElement) {
      flows.push(
        <flow-container
          flow={flowElement}
          showDropZone={false}
        ></flow-container>
      );
    });
    return flows;
  }

  componentWillLoad(): void {
    const mainLogConsole = console.log;
    console.log = function(message) {
      if (window.external.Log) {
        window.external.Log(message);
      }
      mainLogConsole.apply(console, [message]);
    };

    const mainInfoConsole = console.info;
    console.info = function(message) {
      if (window.external.Log) {
        window.external.Log(message);
      }
      mainInfoConsole.apply(console, [message]);
    };

    const mainErrorConsole = console.error;
    console.error = function(message) {
      if (window.external.LogError) {
        window.external.LogError(message);
      }
      mainErrorConsole.apply(console, [message]);
    };

    const mainWarnConsole = console.warn;
    console.warn = function(message) {
      if (window.external.LogWarning) {
        window.external.LogWarning(message);
      }
      mainWarnConsole.apply(console, [message]);
    };

    const mainExcepetionConsole = console.exception;
    console.exception = function(message) {
      if (window.external.LogError) {
        window.external.LogError(message);
      }
      mainExcepetionConsole.apply(console, [message]);
    };

    window.ondragend = function(event: DragEvent) {
      EventHandler.DisableDropZones(event);
    };
    App.GetApp();
  }

  render() {
    if (!this.openEditor && App.GetApp().InstanceIsEmpty()) {
      return <designer-welcome></designer-welcome>;
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
}
