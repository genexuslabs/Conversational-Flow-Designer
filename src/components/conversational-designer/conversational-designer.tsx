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

  @Element() element: HTMLElement;
  @Event() moveFlow: EventEmitter;
  private dragDropHandler: ConversationalDesignerDragDrop;
  private flows: Array<string>;

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
          id={flowElement.Name.replace(" ", "")}
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
    let moveType: MoveType = null;
    if (event.key === "ArrowUp") {
      moveType = MoveType.Up;
    } else if (event.key === "ArrowDown") {
      moveType = MoveType.Down;
    }

    if (moveType != null) {
      const index = this.flows.indexOf(this.renderFull);
      if (moveType == MoveType.Up && index - 1 >= 0)
        this.setSelectedFlow(this.flows[index - 1]);
      else if (moveType == MoveType.Down && this.flows.length >= index + 1)
        this.setSelectedFlow(this.flows[index + 1]);
      else if (moveType == MoveType.Up) {
        this.element
          .querySelector("gxcf-search")
          .shadowRoot.querySelector("input")
          .select();
      }
    }
  }

  setSelectedFlow(flowName: string): void {
    console.log(this.element);
    console.log(flowName);
    const container: HTMLElement = this.element
      .querySelector("#" + flowName.replace(" ", ""))
      .shadowRoot.querySelector("gxcf-flow-collapsed") as HTMLElement;
    console.log(container);

    const moveToElement: HTMLElement = container.shadowRoot.querySelector(
      "div"
    ) as HTMLElement;

    console.log(moveToElement);

    moveToElement.click();
    moveToElement.focus();
  }

  componentDidRender(): void {
    document.onkeydown = event => this.handleKeyDown(event);
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
        </div>
      );
    } else {
      return <div class="MainTable"></div>;
    }
  }
}
