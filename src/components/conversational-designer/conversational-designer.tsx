import { Component, h, Listen, State, Element, Prop } from "@stencil/core";
import { App } from "../../global/conversational-editor/app";
import { EventHandler } from "../../global/conversational-editor/event-handler";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import {
  Controls,
  RenderingOptions
} from "../../global/conversational-editor/helpers/helpers";
import { ConversationalDesignerDragDrop } from "./conversational-designer-drag-drop";
import { Instance } from "../../global/conversational-editor/instance-definition/instance";

@Component({
  tag: "gxcf-conversational-designer",
  styleUrl: "conversational-designer.scss",
  shadow: false
})
export class ConversationalDesginer {
  @State() search: string;
  @State() flows: FlowElement[];
  @State() openEditor: boolean;
  @State() refresh: boolean;
  @Prop() instance: Instance;

  @Element() element: HTMLElement;

  private dragDropHandler: ConversationalDesignerDragDrop;

  @Listen("openEditor")
  HandleOpenEditor(): void {
    this.openEditor = true;
  }

  HandleAddFlowElement(): void {
    this.flows = EventHandler.AddFlowElement();
  }

  HandleSearch(event: CustomEvent): void {
    const value: string = EventHandler.GetValue(event);
    this.search = value;
  }

  HandleDeleteFlow(event: CustomEvent, flow: FlowElement): void {
    console.log("Delete flow " + event);
    App.GetApp().Instance.DeleteFlow(flow);
    this.refresh = !this.refresh;
  }

  private addFlow = (
    <gxcf-add-object
      class="AddFlow"
      onClick={() => this.HandleAddFlowElement()}
      addText="Add another flow"
    />
  );

  private RenderizeFlows(): HTMLElement[] {
    const flows: HTMLElement[] = [];
    let index = 0;
    App.GetApp()
      .Instance.GetFlows(this.search)
      .forEach(function(flowElement) {
        if (index == 0) flowElement.RenderType = RenderingOptions.Full;
        else flowElement.RenderType = RenderingOptions.Collapsed;
        flows.push(
          <gxcf-flow-container
            flow={flowElement}
            onDeleteFlow={event => this.HandleDeleteFlow(event, flowElement)}
            data-gxcf-element-id={flowElement.Name}
          />
        );
        index++;
      }, this);
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

    App.GetApp();

    this.dragDropHandler = new ConversationalDesignerDragDrop(this
      .element as HTMLGxcfConversationalDesignerElement);
    this.dragDropHandler.initialize();
  }

  render() {
    if (!this.openEditor && App.GetApp().InstanceIsEmpty()) {
      return <gxcf-designer-welcome />;
    }

    return (
      <div class="MainTable">
        <div class="SearchBar">
          <gxcf-search onSearch={event => this.HandleSearch(event)} />
        </div>
        <div id={Controls.FlowsContainer} class="FlowsContainer">
          {this.RenderizeFlows()}
        </div>
        {this.addFlow}
      </div>
    );
  }
}
