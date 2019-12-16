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
import { Controls, RenderingOptions } from "../common/helpers";
import { ConversationalDesignerDragDrop } from "./conversational-designer-drag-drop";

@Component({
  tag: "gxcf-conversational-designer",
  styleUrl: "conversational-designer.scss",
  shadow: false
})
export class ConversationalDesginer {
  @State() search: string;
  @State() flows: GXCFModel.FlowElement[];
  @State() openEditor = false;
  @Prop() instance: GXCFModel.Instance;
  @State() renderFull = "";

  @Element() element: HTMLElement;
  @Event() moveFlow: EventEmitter;
  private dragDropHandler: ConversationalDesignerDragDrop;

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
    this.renderFull = event.detail.flowName;
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
    let index = 0;
    this.GetFlows().forEach(function(flowElement) {
      let renderType: RenderingOptions = RenderingOptions.Collapsed;
      console.log(this.renderFull);
      if (
        (index == 0 && this.renderFull == "") ||
        this.renderFull == flowElement.Name
      )
        renderType = RenderingOptions.Full;

      flows.push(
        <gxcf-flow-container
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
    });

    return flows;
  }

  componentWillLoad(): void {
    this.dragDropHandler = new ConversationalDesignerDragDrop(
      this.element as HTMLGxcfConversationalDesignerElement,
      this.moveFlow
    );
    this.dragDropHandler.initialize();
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
