import { MoveType, RenderingOptions } from "../helpers/helpers.js";
import { FlowElement } from "./elements/flow-element.js";
import { App } from "../app.js";
import { UserInputElement } from "./elements/user-input-element.js";
import { ResponseElement } from "./elements/response-element.js";
import { RedirectionProperty } from "./elements/redirection-property.js";

export class Instance {
  public Flows: FlowElement[] = [];
  public SourceFlow: FlowElement;

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
    const coType = "Procedure";
    const flow: FlowElement = new FlowElement("TestA");
    flow.TriggerMessages[0] = "testing";
    flow.TriggerMessages[1] = "testing1";
    flow.ConversationalObject = "TestAProcedure";
    flow.RenderType = RenderingOptions.Full;
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
    flow.ConversationalObjectType = coType;
    flow.AddUserInput(userInput);
    const response: ResponseElement = new ResponseElement(
      "Test Response",
      "Test",
      ["Test"],
      "Test",
      "",
      "",
      "",
      "",
      RenderingOptions.Collapsed,
      0,
      flow
    );
    flow.AddResponse(response);
    this.Flows[0] = flow;

    const flow2: FlowElement = new FlowElement("TestB");
    flow2.TriggerMessages[0] = "testingB";
    flow2.ConversationalObject = "TestBDataProvider";
    flow2.ConversationalObjectType = coType;
    this.Flows[1] = flow2;

    const flow3: FlowElement = new FlowElement("TestC");
    flow3.TriggerMessages[0] = "testingC";
    flow3.ConversationalObject = "TestCTransaction";
    flow3.ConversationalObjectType = coType;
    this.Flows[2] = flow3;
  }

  public InitializeInstance(jsonInstance: CustomJSON): void {
    const instance: Instance = App.GetApp().Instance;
    jsonInstance.Flows.forEach(function(initializeFlow) {
      const flow: FlowElement = new FlowElement(initializeFlow.Name);
      flow.LoadFlow(initializeFlow);
      if (instance.Flows.length == 0) flow.RenderType = RenderingOptions.Full;
      instance.AddFlow(flow);
    });
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
    let elementName = "";
    this.Flows.forEach(function(element) {
      if (id == element.Id) {
        elementName = element.Name;
      }
    });
    return elementName;
  }

  public GetFlowById(id: string): FlowElement {
    this.Flows.forEach(function(element) {
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
    let retElement: FlowElement;
    this.Flows.forEach(function(element) {
      if (element.Name == flowName) {
        element.ConversationalObject = conversationalObject;
        retElement = element;
      }
    });
    return retElement;
  }

  public AddFlow(flow: FlowElement): void {
    this.Flows[this.Flows.length] = flow;
  }

  public LoadFlow(flowName: string, flowJson: CustomJSON): FlowElement {
    let index = 0;
    let flowIndex = 0;
    if (this.Flows.length == 0) return null;
    let renderType: RenderingOptions = RenderingOptions.Collapsed;
    this.Flows.forEach(function(flow) {
      if (flow.Name == flowName) {
        renderType = flow.RenderType;
        flowIndex = index;
      }
      index++;
    });

    const newFlow = new FlowElement(flowName);
    newFlow.LoadFlow(flowJson);
    newFlow.RenderType = renderType;
    this.Flows[flowIndex] = newFlow;
    return newFlow;
  }

  public SetFlowRenderType(
    flow: FlowElement,
    renderType: RenderingOptions
  ): void {
    this.Flows.forEach(function(iFlow) {
      if (iFlow.Name == flow.Name) {
        iFlow.SetRenderType(renderType);
      } else if (iFlow.RenderType == renderType) iFlow.SetRenderType(RenderingOptions.Collapsed);
    });
  }

  public GetFlows(search: string): Array<FlowElement> {
    if (search == "" || search == null) return this.Flows;

    const flows: Array<FlowElement> = new Array<FlowElement>();
    this.Flows.forEach(function(flow) {
      if (flow.Name.toLowerCase().includes(search.toLowerCase())) {
        flows.push(flow);
      }
    });

    return flows;
  }

  public DeleteFlow(flow: FlowElement) {
    const index: number = this.Flows.indexOf(flow);
    this.Flows.splice(index, 1);
    if (window.external.DeleteFlow) window.external.DeleteFlow(flow.Name);
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
  ConversationalObjectType: string;
  ResponseName: string;
}
