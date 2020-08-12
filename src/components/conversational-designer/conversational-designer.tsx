import {
  Component,
  h,
  Listen,
  State,
  Element,
  Prop,
  Event,
  EventEmitter,
  getAssetPath
} from "@stencil/core";
import { EventsHelper } from "../common/events-helper";
import {
  RenderingOptions,
  MoveType,
  FlowElementHelpers
} from "../common/helpers";
import { ConversationalDesignerDragDrop } from "./conversational-designer-drag-drop";
import { Position, PositionElement } from "../common/position";
import { Locale } from "../common/locale";
import "@genexus/gemini";

@Component({
  tag: "gxcf-conversational-designer",
  styleUrl: "conversational-designer.scss",
  shadow: false,
  assetsDirs: ["assets/gxcf-conversational-designer-lang"]
})
export class ConversationalDesginer {
  @State() search: string;
  @State() openEditor = false;
  @State() showPublic = true;
  @State() showPrivate = true;
  @Prop() instance: GXCFModel.Instance;
  @State() renderFull = "";
  @State() showPopUp = false;

  @Element() element: HTMLElement;
  @Event() moveFlow: EventEmitter;
  @Event() setFlowCategory: EventEmitter;
  private dragDropHandler: ConversationalDesignerDragDrop;
  private flows: GXCFModel.FlowElement[];
  private popUp: HTMLElement;
  private componentLocale: any;

  private enableShowPublic() {
    this.showPublic = true;
    this.showPrivate = false;
  }

  private enableShowPrivate() {
    this.showPrivate = true;
    this.showPublic = false;
  }

  private enableShowAll() {
    this.showPrivate = true;
    this.showPublic = true;
  }

  HandleOpenEditor(): void {
    this.openEditor = true;
  }

  handleSearch(event: CustomEvent): void {
    this.search = event.detail;
  }

  @Listen("clickOnInput")
  HandleClickOnInput(event: CustomEvent): void {
    const element: HTMLInputElement = event.detail.source;
    element.select();
  }

  @Listen("setSelectedFlow")
  handleSetSelectedFlow(event): void {
    this.instance.CurrentFlowName = event.detail;
    this.triggerSelectCurrentFlow(this.instance.CurrentFlowName);
    this.renderFull = this.instance.CurrentFlowName;
  }

  @Event() addFlow: EventEmitter;
  TriggerAddFlow(event): void {
    this.addFlow.emit(event);
  }

  handleClickFlowCollapsed(flowName): void {
    this.instance.CurrentFlowName = flowName;
    this.renderFull = flowName;
    Position.SetFlow(flowName);
    this.triggerSelectCurrentFlow(flowName);
  }

  private setAddFlow() {
    return (
      <gxg-button
        type="secondary-text-icon"
        icon="add"
        onClick={event => this.TriggerAddFlow(event)}
      >
        {this.componentLocale.addFlow}
      </gxg-button>
    );
  }

  allowDropOverAccordion(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
  }

  askForDeleteFlow(event, flowElement: GXCFModel.FlowElement) {
    this.setSelectedFlow(flowElement, MoveType.Down);
    this.askForDeleteElement(event);
  }

  private renderizeFlow(flowElement: GXCFModel.FlowElement): HTMLElement {
    const active: boolean = this.instance.CurrentFlowName === flowElement.Name;
    const flowId = flowElement.Name.replace(/\s/g, "");
    return (
      <gxg-drag-box
        padding="xs"
        deletable
        id={"drag-box-" + flowId}
        active={active}
        onClick={() => this.handleClickFlowCollapsed(flowElement.Name)}
        onDeleted={event => this.askForDeleteFlow(event, flowElement)}
      >
        <gxcf-flow-collapsed
          id={flowId}
          data-flowid={flowElement.Id}
          flow={flowElement}
          renderingType={
            active ? RenderingOptions.Full : RenderingOptions.Collapsed
          }
        />
      </gxg-drag-box>
    );
  }

  private renderizeFlowsFromArray(
    flows: Array<GXCFModel.FlowElement>
  ): HTMLElement[] {
    const flowsHTML: HTMLElement[] = [];
    flows.forEach(function(flowElement) {
      if (
        (flowElement.Triggers.length == 0 && this.showPrivate) ||
        (flowElement.Triggers.length > 0 && this.showPublic)
      )
        flowsHTML.push(this.renderizeFlow(flowElement));
    }, this);
    return flowsHTML;
  }

  private renderizeCategories(): HTMLElement[] {
    let elements: HTMLElement[] = [];
    this.flows = [];
    const woCategoryFlows: Array<GXCFModel.FlowElement> = new Array<
      GXCFModel.FlowElement
    >();
    const categorizedFlows: {
      [category: string]: Array<GXCFModel.FlowElement>;
    } = {};
    this.GetFlows().forEach(function(flowElement) {
      if (flowElement.Category != null && flowElement.Category != "") {
        if (categorizedFlows[flowElement.Category] == null)
          categorizedFlows[flowElement.Category] = new Array<
            GXCFModel.FlowElement
          >();
        categorizedFlows[flowElement.Category].push(flowElement);
      } else woCategoryFlows.push(flowElement);
    });
    console.log(woCategoryFlows);
    for (const key in categorizedFlows) {
      this.flows = this.flows.concat(categorizedFlows[key]);
      const innerFlows: HTMLElement[] = this.renderizeFlowsFromArray(
        categorizedFlows[key]
      );
      if (innerFlows.length > 0) {
        elements.push(
          <gxg-accordion-item
            itemId={key}
            itemTitle={key}
            padding="l"
            onDragOver={event => this.allowDropOverAccordion(event)}
          >
            <gxg-drag-container
              class="FlowsContainer"
              onItemDrop={event => this.handleDropFlow(event)}
            >
              {innerFlows}
            </gxg-drag-container>
          </gxg-accordion-item>
        );
      }
    }
    this.flows = this.flows.concat(woCategoryFlows);
    const woCategoryFlowsElements = (
      <gxg-drag-container
        class="FlowsContainer"
        onItemDrop={event => this.handleDropFlow(event)}
      >
        {this.renderizeFlowsFromArray(woCategoryFlows)}
      </gxg-drag-container>
    );
    elements = elements.concat(woCategoryFlowsElements);
    return elements;
  }

  private RenderizeFlows(): HTMLElement {
    const elements = this.renderizeCategories();
    const element = <gxg-accordion>{elements}</gxg-accordion>;
    return element;
  }

  private renderizeActiveFlow(): HTMLElement {
    let retFlow: HTMLElement;
    const activeFlow: GXCFModel.FlowElement = this.getActiveFlow();
    if (activeFlow != null) {
      retFlow = (
        <gxcf-flow-full
          data-flowid={activeFlow.Id}
          flow={activeFlow}
          instance={this.instance}
          onDeleteFullFlow={() => this.triggerDeleteFlow(activeFlow.Name)}
        />
      );
    }
    return retFlow;
  }

  private getActiveFlow(): GXCFModel.FlowElement {
    const flows = this.GetFlows();
    if (flows.length > 0) {
      let ret = flows[0];
      flows.forEach(function(flowElement) {
        if (this.instance.CurrentFlowName == flowElement.Name)
          ret = flowElement;
      }, this);
      return ret;
    }
    return null;
  }

  private setPopUp(): HTMLElement {
    console.log("setPopUp");
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

  async componentWillLoad(): Promise<void> {
    Locale.commonAssetsPath = getAssetPath("");
    this.componentLocale = await Locale.getComponentStrings(this.element);
    this.dragDropHandler = new ConversationalDesignerDragDrop(
      this.element as HTMLGxcfConversationalDesignerElement,
      this.moveFlow,
      this.setFlowCategory
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
    else if (event.key === "Delete") this.askForDeleteElement(event);
    else if (event.key === "Enter") this.handleEnterKey(event);

    if (moveType != null) {
      console.log(this.instance.CurrentFlowName);
      let index = 0;
      console.log(this.flows);
      this.flows.forEach(flow => {
        if (flow.Name == this.instance.CurrentFlowName) {
          index = this.flows.indexOf(flow);
          return;
        }
      }, this);
      if (moveType == MoveType.Up && index - 1 >= 0)
        this.setSelectedFlow(this.flows[index - 1], moveType);
      else if (moveType == MoveType.Down && this.flows.length >= index + 1)
        this.setSelectedFlow(this.flows[index + 1], moveType);
      else if (moveType == MoveType.Up) this.setFocusOnSearch();
    }
  }
  handleEnterKey(event: KeyboardEvent) {
    const element: HTMLElement = event.srcElement as HTMLElement;
    console.log("Before blur");
    console.log(event);
    element.blur();
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

  @Event() selectRoot: EventEmitter;
  triggerSelectRoot(): void {
    this.selectRoot.emit();
  }

  @Event() selectFlow: EventEmitter;
  triggerSelectCurrentFlow(flowName: string): void {
    this.selectFlow.emit.call(this, {
      flowName: flowName
    });
  }

  closePopUp(): void {
    this.popUp = null;
    this.showPopUp = false;
  }

  askForDeleteElement(event) {
    event.preventDefault();
    const tagName = (event.target as HTMLElement).tagName;
    if (tagName == "BODY" || tagName == "GXG-DRAG-BOX") {
      if (Position.GetPosition() == PositionElement.Flow) {
        console.log("Delete Flow: " + Position.GetFlow());
        this.popUp = (
          <gxcf-confirmation
            visible={true}
            confirmationTitle={this.componentLocale.deleteFlow}
            confirmationMessage={Locale.format(
              this.componentLocale.deleteFlowConfirmation,
              [Position.GetFlow()]
            )}
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
            visible={true}
            confirmationTitle={this.componentLocale.deleteUserInput}
            confirmationMessage={Locale.format(
              this.componentLocale.deleteUserInputConfirmation,
              [Position.GetUserInput()]
            )}
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
            visible={true}
            confirmationTitle={this.componentLocale.deleteResponse}
            confirmationMessage={Locale.format(
              this.componentLocale.deleteResponseConfirmation,
              [Position.GetResponse() + ""]
            )}
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
      console.log("PopUp");
      console.log(this.popUp);
      if (this.popUp != null) this.showPopUp = true;
    }
  }

  getSearch(): HTMLInputElement {
    return this.getSpacer()
      .querySelector("gxg-form-text")
      .shadowRoot.querySelector("div")
      .querySelector("div")
      .querySelector("input");
  }

  blurSearch(): void {
    this.getSearch().blur();
  }

  setFocusOnSearch(): void {
    this.getSearch().select();
  }

  clickOnSelectedFlow(
    moveType: MoveType,
    element: HTMLElement,
    dragContainer: HTMLGxgDragContainerElement
  ): void {
    element.click();

    const viewport = dragContainer.getBoundingClientRect().height;
    let offset = element.getBoundingClientRect().top;
    const elementHeight = element.getBoundingClientRect().height;
    if (offset < elementHeight) offset = 0;

    if (moveType == MoveType.Down && offset + elementHeight > viewport) {
      let scrollDownTo = elementHeight;
      if (dragContainer.scrollHeight <= dragContainer.scrollTop + elementHeight)
        scrollDownTo = dragContainer.scrollHeight;
      dragContainer.scrollBy({
        top: scrollDownTo,
        behavior: "smooth"
      });
    } else if (moveType == MoveType.Up)
      dragContainer.scrollBy({
        top: -elementHeight,
        behavior: "smooth"
      });
  }

  private getDragBoxItem(element, flowId) {
    return element.querySelector(flowId) as HTMLElement;
  }

  setSelectedFlow(flow: GXCFModel.FlowElement, moveType: MoveType): void {
    if (flow) {
      this.instance.CurrentFlowName = flow.Name;
      const mainAccordion = this.getMainAccordion();
      const dragBoxId = "#drag-box-" + flow.Name.replace(/\s/g, "");
      mainAccordion
        .querySelectorAll("gxg-drag-container")
        .forEach(function(dragContainer) {
          const element: HTMLElement = this.getDragBoxItem(
            dragContainer,
            dragBoxId
          );

          if (element != null) {
            dragContainer.parentElement.click();
            this.clickOnSelectedFlow(moveType, element, dragContainer);
            return;
          }
        }, this);

      this.blurSearch();
    }
  }

  getSpacer(): HTMLElement {
    return this.element
      .querySelector("gxg-stack")
      .querySelector("gxg-columns")
      .querySelector("gxg-column")
      .querySelector("gxg-spacer-layout");
  }

  getMainAccordion(): HTMLElement {
    return this.getSpacer().querySelector("gxg-accordion");
  }

  componentDidLoad(): void {
    this.triggerSelectRoot();
  }

  componentDidRender(): void {
    document.onkeydown = event => this.handleKeyDown(event);
    const search = this.element.querySelector("gxcf-search");
    if (search) search.shadowRoot.querySelector("input").focus();
  }

  handleDropFlow(event: any): void {
    event.preventDefault();
  }

  render() {
    console.log(this.instance);
    if (this.instance) {
      return (
        <gxg-stack>
          <gxg-columns space="m" alignY="top">
            <gxg-column width="1/3">
              <gxg-spacer-layout
                space="xs"
                orientation="vertical"
                justify-content="flex-start"
              >
                <gxg-columns>
                  <gxg-column width="1/3">
                    <gxg-button
                      type="outlined"
                      fullWidth
                      onClick={() => this.triggerSelectRoot()}
                    >
                      {this.componentLocale.properties}
                    </gxg-button>
                  </gxg-column>
                </gxg-columns>

                <gxg-columns space="s" alignY="center">
                  <gxg-column width="fluid">
                    <gxg-form-text
                      placeholder={this.componentLocale.searchPlaceHolder}
                      icon="search"
                      icon-position="left"
                      role="textbox"
                      onChange={event => this.handleSearch(event)}
                    />
                  </gxg-column>
                  <gxg-column width="content">
                    <gxg-button-group default-selected-btn-id="all" outlined>
                      <button
                        id="all"
                        value="all"
                        onClick={() => this.enableShowAll()}
                      >
                        {this.componentLocale.all}
                      </button>
                      <button
                        id="public"
                        value="public"
                        onClick={() => this.enableShowPublic()}
                      >
                        {this.componentLocale.public}
                      </button>
                      <button
                        id="private"
                        value="private"
                        onClick={() => this.enableShowPrivate()}
                      >
                        {this.componentLocale.private}
                      </button>
                    </gxg-button-group>
                  </gxg-column>
                </gxg-columns>
                {this.RenderizeFlows()}
                {this.setAddFlow()}
              </gxg-spacer-layout>
            </gxg-column>
            <gxg-column>{this.renderizeActiveFlow()}</gxg-column>
          </gxg-columns>
          {this.setPopUp()}
          <gxcf-confirmation visible={false} />
        </gxg-stack>
      );
    }
  }
}
