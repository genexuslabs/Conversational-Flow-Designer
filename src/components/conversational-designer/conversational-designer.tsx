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
import { RenderingOptions, MoveType } from "../common/helpers";
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
  private dragDropHandler: ConversationalDesignerDragDrop;
  private flows: Array<string>;
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

  HandleSearch(event: CustomEvent): void {
    const value: string = EventsHelper.GetValueFromInput(event);
    console.log("Search: ");
    console.log(event);
    this.search = value;
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

  handleClickFlowCollapsed(flowName): void {
    this.instance.CurrentFlowName = flowName;
    this.renderFull = flowName;
    Position.SetFlow(flowName);
    this.triggerSelectCurrentFlow(flowName);
  }

  private setAddFlow() {
    return (
      <gxcf-add-object
        class="AddFlow"
        onClick={event => this.TriggerAddFlow(event)}
        addText={this.componentLocale.addFlow}
      />
    );
  }

  private renderizeFlow(flowElement: GXCFModel.FlowElement): HTMLElement {
    return (
      <gxg-drag-box padding="xs">
        <gxcf-flow-collapsed
          id={flowElement.Name.replace(/\s/g, "")}
          data-flowid={flowElement.Id}
          flow={flowElement}
          onClick={() => this.handleClickFlowCollapsed(flowElement.Name)}
          renderingType={
            this.instance.CurrentFlowName == flowElement.Name
              ? RenderingOptions.Full
              : RenderingOptions.Collapsed
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
    this.flows = new Array<string>();
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
      const innerFlows: HTMLElement[] = this.renderizeFlowsFromArray(
        categorizedFlows[key]
      );
      if (innerFlows.length > 0) {
        elements.push(
          <gxg-accordion-item itemId={key} itemTitle={key} padding="l">
            {innerFlows}
          </gxg-accordion-item>
        );
      }
    }
    const woCategoryFlowsElements = this.renderizeFlowsFromArray(
      woCategoryFlows
    );
    console.log(woCategoryFlowsElements);
    elements = elements.concat(woCategoryFlowsElements);
    console.log(elements);
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
    if (this.GetFlows().length > 0) {
      let ret = this.GetFlows()[0];
      this.GetFlows().forEach(function(flowElement) {
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
    else if (event.key === "Delete") this.askForDeleteElement(event);
    else if (event.key === "Enter") this.handleEnterKey(event);

    if (moveType != null) {
      const index = this.flows.indexOf(this.renderFull);
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

  askForDeleteElement(event: KeyboardEvent) {
    console.log(event);
    if ((event.target as HTMLElement).tagName == "BODY") {
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

  setSelectedFlow(flowName: string, moveType: MoveType): void {
    console.log("Set selected flow");
    if (flowName) {
      const dragContainer: HTMLGxgDragContainerElement = this.getSpacer().querySelector(
        "gxg-drag-container"
      );
      const element: HTMLElement = dragContainer.querySelector(
        "#" + flowName.replace(/\s/g, "")
      ) as HTMLElement;
      element.click();

      const viewport = dragContainer.getBoundingClientRect().height;
      let offset = element.getBoundingClientRect().top;
      const elementHeight = element.getBoundingClientRect().height;
      if (offset < elementHeight) offset = 0;

      if (moveType == MoveType.Down && offset + elementHeight > viewport) {
        let scrollDownTo = elementHeight;
        if (
          dragContainer.scrollHeight <=
          dragContainer.scrollTop + elementHeight
        )
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
      if (
        (this.instance.Flows == null || this.instance.Flows.length == 0) &&
        !this.openEditor
      )
        return (
          <gxcf-designer-welcome onOpenEditor={() => this.HandleOpenEditor()} />
        );

      return (
        <gxg-stack>
          <gxg-columns space="m" alignY="top">
            <gxg-column width="1/3">
              <gxg-spacer-layout
                space="xs"
                orientation="vertical"
                justify-content="flex-start"
              >
                <gxg-spacer-layout
                  space="xs"
                  orientation="horizontal"
                  justify-content="flex-start"
                >
                  <gxg-button type="outlined" fullWidth>
                    {this.componentLocale.variables}
                  </gxg-button>
                  <gxg-button type="outlined" fullWidth>
                    {this.componentLocale.entities}
                  </gxg-button>
                  <gxg-button
                    type="outlined"
                    fullWidth
                    onClick={() => this.triggerSelectRoot()}
                  >
                    {this.componentLocale.properties}
                  </gxg-button>
                </gxg-spacer-layout>

                <gxg-columns space="s" alignY="center">
                  <gxg-column width="fluid">
                    <gxg-form-text
                      placeholder={this.componentLocale.searchPlaceHolder}
                      icon="search"
                      icon-position="left"
                      role="textbox"
                      onInput={event => this.HandleSearch(event)}
                    />
                  </gxg-column>
                  <gxg-column width="content">
                    <gxg-button-group default-selected-btn-id="all">
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
                <gxg-drag-container
                  class="FlowsContainer"
                  onItemDrop={event => this.handleDropFlow(event)}
                >
                  {this.RenderizeFlows()}
                </gxg-drag-container>

                {this.setAddFlow()}
              </gxg-spacer-layout>
            </gxg-column>
            <gxg-column>{this.renderizeActiveFlow()}</gxg-column>
          </gxg-columns>
          {this.setPopUp()}
          <gxcf-confirmation visible={false} />
        </gxg-stack>
      );
    } else {
      return <div class="MainTable"></div>;
    }
  }
}
