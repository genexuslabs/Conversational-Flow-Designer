import { MoveType, RenderingOptions } from "../helpers/helpers.js";
import { FlowElement } from "./elements/flow-element.js";
import { App } from "../app.js";
import { UserInputElement } from "./elements/user-input-element.js";
import { ResponseElement } from "./elements/response-element.js";
import { RedirectionProperty } from "./elements/redirection-property.js";

export class Instance {
  public Flows: FlowElement[] = [];

  //Initialize
  constructor() {
    this.Initialize();
  }

  private Initialize(): void {
    if (window.external.GXIDE) {
      if (window.external.GetInstance) {
        window.external.GetInstance().then(result => {
          console.log("Promise Result: " + result);
          const jsonInstance = JSON.parse(result);
          this.InitializeInstance(jsonInstance);
        });
      }
    } else {
      this.LoadDummy();
    }
  }

  private LoadDummy(): void {
    const flow: FlowElement = new FlowElement("TestA");
    flow.TriggerMessages[0] = "testing";
    flow.TriggerMessages[1] = "testing1";
    flow.ConversationalObject = "TestAProcedure";
    const userInput: UserInputElement = new UserInputElement(
      "Test",
      false,
      ["Test message"],
      [],
      "Test1",
      "VarChar",
      0,
      false,
      false,
      "",
      "",
      "",
      flow,
      new Array<RedirectionProperty>()
    );
    flow.AddUserInput(userInput);
    const response: ResponseElement = new ResponseElement(
      "Test",
      ["Test"],
      "Test",
      "",
      "",
      "",
      ""
    );
    flow.AddResponse(response);
    this.Flows[0] = flow;

    const flow2: FlowElement = new FlowElement("TestB");
    flow2.TriggerMessages[0] = "testingB";
    flow2.ConversationalObject = "TestBDataProvider";
    this.Flows[1] = flow2;

    const flow3: FlowElement = new FlowElement("TestC");
    flow3.TriggerMessages[0] = "testingC";
    flow3.ConversationalObject = "TestCTransaction";
    this.Flows[2] = flow3;
    console.log(this.Flows);
  }

  public InitializeInstance(jsonInstance: CustomJSON): void {
    jsonInstance.Flows.forEach(function(initializeFlow) {
      const flow: FlowElement = new FlowElement(initializeFlow.Name);
      flow.LoadFlow(initializeFlow);
      App.GetApp().Instance.AddFlow(flow);
    });
    console.log(
      "Instance flows: " + App.GetApp().Instance.Flows.length.toString()
    );
  }

  //Instance behavior
  public GetFlow(name: string): FlowElement {
    let flowElement: FlowElement = new FlowElement("");
    this.Flows.forEach(function(element) {
      if (element.FormatName() == name) {
        flowElement = element;
      }
    });
    return flowElement;
  }

  public GetFlowName(id: string): string {
    console.log("Search Id: " + id);
    let elementName = "";
    this.Flows.forEach(function(element) {
      console.log("FlowsIds: " + element.Id);
      if (id == element.Id) {
        elementName = element.Name;
      }
    });
    return elementName;
  }

  public GetFlowById(id: string): FlowElement {
    console.log("Search Id: " + id);
    this.Flows.forEach(function(element) {
      console.log("FlowsIds: " + element.Id);
      if (id == element.Id) {
        return element;
      }
    });
    return null;
  }

  public MoveFlows(
    sourceName: string,
    targetName: string,
    moveType: MoveType
  ): void {
    let sourceFlow: FlowElement = new FlowElement("");

    let sourceIndex = 0;
    let targetIndex = 0;
    let index = 0;
    this.Flows.forEach(function(element) {
      if (element.Name == sourceName) {
        sourceFlow = element;
        sourceIndex = index;
      } else if (element.Name == targetName) targetIndex = index;
      index++;
    });

    if (moveType == MoveType.Up) {
      if (targetIndex == 0) this.Flows.unshift(sourceFlow);
      else this.Flows.splice(targetIndex, 0, sourceFlow);
    } else if (moveType == MoveType.Down) {
      if (targetIndex == this.Flows.length) this.Flows.push(sourceFlow);
      else targetIndex < this.Flows.length;
      this.Flows.splice(targetIndex + 1, 0, sourceFlow);
    }

    if (sourceIndex == 0) this.Flows.splice(sourceIndex, 1);
    else {
      if (moveType == MoveType.Up) this.Flows.splice(sourceIndex + 1, 1);
      else this.Flows.splice(sourceIndex, 1);
    }

    if (window.external.MoveFlow) {
      window.external.MoveFlow(sourceName, targetName, moveType.toString());
    }
  }

  public SelectConversationalObject(flowName: string): void {
    if (window.external.SelectConversationalObject) {
      window.external.SelectConversationalObject(flowName);
    }
  }

  public SetConversationalObjectForFlow(
    flowName: string,
    conversationalObject: string
  ): FlowElement {
    console.log("Set: " + conversationalObject);
    console.log("Name: " + flowName);
    let retElement: FlowElement;
    this.Flows.forEach(function(element) {
      if (element.Name == flowName) {
        element.ConversationalObject = conversationalObject;
        console.log("Saved: " + element.ConversationalObject);
        retElement = element;
      }
    });
    return retElement;
  }

  public AddFlow(flow: FlowElement): void {
    this.Flows[this.Flows.length] = flow;
  }

  public LoadFlow(flowName: string, flowJson: CustomJSON): FlowElement {
    let rFlow: FlowElement = null;
    this.Flows.forEach(function(flow) {
      if (flow.Name == flowName) {
        flow.LoadFlow(flowJson);
        rFlow = flow;
      }
    });
    return rFlow;
  }

  public SetFlowRenderType(
    flow: FlowElement,
    renderType: RenderingOptions
  ): FlowElement {
    this.Flows.forEach(function(iFlow) {
      if (iFlow.Name == flow.Name) {
        iFlow.SetRenderType(renderType);
        flow = iFlow;
      } else if (iFlow.RenderType == renderType) iFlow.SetRenderType(RenderingOptions.Summary);
    });
    return flow;
  }
}

export interface CustomJSON extends JSON {
  Provider: string;
  Flows: CustomJSON[];
  Name: string;
  Triggers: string[];
  ConversationalObjectName: string;
  Fields: CustomJSON[];
  Redirections: CustomJSON[];
  IsCollection: boolean;
  RequiredMessages: string[];
  ErrorMessages: string[];
  Entity: string;
  DataType: string;
  TryLimit: number;
  AskAgain: boolean;
  CleanInContext: boolean;
  ValidationProcedure: string;
  Required: string;
  RequiredCondition: string;
  Variable: string;
  Style: string;
  Format: string[];
  ComponentType: string;
  WebComponent: string;
  SDComponent: string;
  Condition: string;
  RedirectTo: string;
  View: CustomJSON;
  Templates: CustomJSON[];
  RedirectCondition: string;
}
