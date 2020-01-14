import {
  Component,
  h,
  Listen,
  State,
  Element,
  Prop,
  Event,
  EventEmitter
} from "@stencil/core";
import { EventsHelper } from "../common/events-helper";
import { Controls, RenderingOptions, MoveType } from "../common/helpers";
import { ConversationalDesignerDragDrop } from "./conversational-designer-drag-drop";
import { Position, PositionElement } from "../common/position";

@Component({
  tag: "gxcf-conversational-designer",
  styleUrl: "conversational-designer.scss",
  shadow: false
})
export class ConversationalDesginer {
  @State() search: string;
  @State() openEditor = false;
  @Prop() instance: GXCFModel.Instance;
  @State() renderFull = "";
  @State() showPopUp = false;

  @Element() element: HTMLElement;
  @Event() moveFlow: EventEmitter;
  private dragDropHandler: ConversationalDesignerDragDrop;
  private flows: Array<string>;
  private popUp: HTMLElement;

  HandleOpenEditor(): void {
    this.openEditor = true;
  }

  HandleSearch(event: CustomEvent): void {
    const value: string = EventsHelper.GetValue(event);
    this.search = value;
  }

  @Listen("expandFlow")
  HandleExpandFlow(event: CustomEvent): void {
    event.preventDefault();
    console.log("Expand: " + event.detail.flowName);
    this.instance.CurrentFlowName = event.detail.flowName;
    this.renderFull = event.detail.flowName;
  }

  @Listen("clickOnInput")
  HandleClickOnInput(event: CustomEvent): void {
    const element: HTMLInputElement = event.detail.source;
    element.select();
  }

  @Event() addFlow: EventEmitter;
  TriggerAddFlow(event): void {
    this.addFlow.emit(event);
  }

  private setAddFlow = (
    <gxcf-add-object
      class="AddFlow"
      onClick={event => this.TriggerAddFlow(event)}
      addText="Add another flow"
    />
  );

  private RenderizeFlows(): HTMLElement[] {
    const flows: HTMLElement[] = [];
    this.flows = new Array<string>();
    let index = 0;
    this.GetFlows().forEach(function(flowElement) {
      this.flows.push(flowElement.Name);
      let renderType: RenderingOptions = RenderingOptions.Collapsed;
      if (
        (index == 0 && !this.instance.CurrentFlowName) ||
        this.instance.CurrentFlowName == flowElement.Name
      )
        renderType = RenderingOptions.Full;

      flows.push(
        <gxcf-flow-container
          id={flowElement.Name.replace(/\s/g, "")}
          flow={flowElement}
          instance={this.instance}
          data-gxcf-element-id={flowElement.Name}
          renderType={renderType}
        />
      );
      index++;
    }, this);
    return flows;
  }

  private setPopUp(): HTMLElement {
    console.log(this.popUp);
    if (this.showPopUp) return this.popUp;
  }

  public GetFlows(): Array<GXCFModel.FlowElement> {
    if (this.search == "" || this.search == null) return this.instance.Flows;

    const flows: Array<GXCFModel.FlowElement> = new Array<
      GXCFModel.FlowElement
    >();
    this.instance.Flows.forEach(function(flow) {
      if (flow.Name.toLowerCase().includes(this.search.toLowerCase())) {
        flows.push(flow);
      }
    }, this);

    return flows;
  }

  componentWillLoad(): void {
    this.dragDropHandler = new ConversationalDesignerDragDrop(
      this.element as HTMLGxcfConversationalDesignerElement,
      this.moveFlow
    );
    this.dragDropHandler.initialize();
  }

  handleKeyDown(event: KeyboardEvent): void {
    console.log("Key: " + event.key);
    if (event.key === "Tab") console.log(event);

    let moveType: MoveType = null;
    if (event.key === "ArrowUp") moveType = MoveType.Up;
    else if (event.key === "ArrowDown") moveType = MoveType.Down;
    else if (event.ctrlKey && event.key === "f") this.setFocusOnSearch();
    else if (event.key === "Delete") this.askForFeleteElement(event);

    if (moveType != null) {
      const index = this.flows.indexOf(this.renderFull);
      if (moveType == MoveType.Up && index - 1 >= 0)
        this.setSelectedFlow(this.flows[index - 1]);
      else if (moveType == MoveType.Down && this.flows.length >= index + 1)
        this.setSelectedFlow(this.flows[index + 1]);
      else if (moveType == MoveType.Up) this.setFocusOnSearch();
    }
  }

  @Event() deleteFlow: EventEmitter;
  triggerDeleteFlow(flowName: string): void {
    this.deleteFlow.emit.call(this, {
      flowName: flowName
    });
    this.closePopUp();
  }

  @Event() deleteUserInput: EventEmitter;
  triggerDeleteUserInput(flowName: string, userInput: string): void {
    this.deleteUserInput.emit.call(this, {
      flowName: flowName,
      userInput: userInput
    });
    this.closePopUp();
  }

  @Event() deleteResponse: EventEmitter;
  triggerDeleteResponse(flowName: string, response: number): void {
    this.deleteResponse.emit.call(this, {
      flowName: flowName,
      index: response
    });
    this.closePopUp();
  }

  closePopUp(): void {
    this.popUp = null;
    this.showPopUp = false;
  }

  askForFeleteElement(event: KeyboardEvent) {
    console.log("To delete: ");
    console.log(event);
    if ((event.target as HTMLElement).tagName == "BODY") {
      if (Position.GetPosition() == PositionElement.Flow) {
        console.log("Delete Flow: " + Position.GetFlow());
        this.popUp = (
          <gxcf-confirmation
            confirmationTitle="Delete Flow"
            confirmationMessage={`Do you want to delete the flow '${Position.GetFlow()}'?`}
            onUserConfirmation={() =>
              this.triggerDeleteFlow(Position.GetFlow())
            }
            onUserCancellation={() => this.closePopUp()}
          />
        );
      } else if (Position.GetPosition() == PositionElement.UserInput) {
        console.log("Delete UserInput: " + Position.GetUserInput());
        this.popUp = (
          <gxcf-confirmation
            confirmationTitle="Delete user input"
            confirmationMessage={`Do you want to delete the user input '${Position.GetUserInput()}'?`}
            onUserConfirmation={() =>
              this.triggerDeleteUserInput(
                Position.GetFlow(),
                Position.GetUserInput()
              )
            }
            onUserCancellation={() => this.closePopUp()}
          />
        );
      } else if (Position.GetPosition() == PositionElement.Response) {
        console.log("Delete response: " + Position.GetResponse());
        this.popUp = (
          <gxcf-confirmation
            confirmationTitle="Delete response"
            confirmationMessage={`Do you want to delete the response '${Position.GetResponse()}'?`}
            onUserConfirmation={() =>
              this.triggerDeleteResponse(
                Position.GetFlow(),
                Position.GetResponse()
              )
            }
            onUserCancellation={() => this.closePopUp()}
          />
        );
      }

      if (this.popUp != null) this.showPopUp = true;
    }
  }

  setFocusOnSearch(): void {
    this.element
      .querySelector("gxcf-search")
      .shadowRoot.querySelector("input")
      .select();
  }

  setSelectedFlow(flowName: string): void {
    if (flowName) {
      const container: HTMLElement = this.element
        .querySelector("#" + flowName.replace(/\s/g, ""))
        .shadowRoot.querySelector("gxcf-flow-collapsed") as HTMLElement;
      console.log(container);

      const moveToElement: HTMLElement = container.shadowRoot.querySelector(
        "div"
      ) as HTMLElement;

      console.log(moveToElement);

      moveToElement.click();
    }
  }

  componentDidRender(): void {
    document.onkeydown = event => this.handleKeyDown(event);
    if (this.instance) {
      if (this.instance.CurrentFlowName) {
        const flowCollapsed = this.element
          .querySelector("#" + this.instance.CurrentFlowName.replace(/\s/g, ""))
          .shadowRoot.querySelector("gxcf-flow-collapsed");
        if (flowCollapsed) {
          flowCollapsed.shadowRoot
            .querySelector("gxcf-summary-title")
            .shadowRoot.querySelector("input")
            .select();
        }
      } else {
        const search = this.element.querySelector("gxcf-search");
        if (search) search.shadowRoot.querySelector("input").focus();
      }
    }
  }

  render() {
    console.log(this.instance);
    if (this.instance) {
      if (
        (this.instance.Flows == null || this.instance.Flows.length == 0) &&
        !this.openEditor
      )
        return (
          <gxcf-designer-welcome onOpenEditor={() => this.HandleOpenEditor()} />
        );

      return (
        <div class="MainTable">
          <div class="SearchBar">
            <gxcf-search onSearch={event => this.HandleSearch(event)} />
          </div>
          <div id={Controls.FlowsContainer} class="FlowsContainer">
            {this.RenderizeFlows()}
          </div>
          {this.setAddFlow}
          {this.setPopUp()}
        </div>
      );
    } else {
      return <div class="MainTable"></div>;
    }
  }
}
