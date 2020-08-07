import { EventEmitter } from "@stencil/core";
import { MoveType } from "../common/helpers";

enum DraggableComponents {
  Flow,
  UserInput,
  Response
}

export class ConversationalDesignerDragDrop {
  private draggingElement: HTMLElement;
  private draggingElementType: DraggableComponents;
  private draggingElementId: string;
  private currentTargetElement: HTMLElement;
  private currentTargetElementId: string;
  private element: HTMLGxcfConversationalDesignerElement;
  private readonly idAttribute: string = "data-gxcf-element-id";
  private moveFlow: EventEmitter;
  private setFlowCategory: EventEmitter;
  private accordionItem = "GXG-ACCORDION-ITEM";
  private dragBox = "GXG-DRAG-BOX";

  TriggerMoveFlow(pMoveType: string): void {
    this.moveFlow.emit.call(this, {
      source: this.draggingElementId,
      target: this.currentTargetElementId,
      moveType: pMoveType
    });
  }

  constructor(
    element: HTMLGxcfConversationalDesignerElement,
    moveFlow: EventEmitter,
    setFlowCategory: EventEmitter
  ) {
    this.element = element;
    this.moveFlow = moveFlow;
    this.setFlowCategory = setFlowCategory;
  }

  public initialize() {
    this.element.addEventListener("dragstart", this.handleDragStart.bind(this));

    this.element.addEventListener("drop", this.handleDrop.bind(this));

    this.element.addEventListener("dragend", this.handleDragEnd.bind(this));
  }

  private handleDragStart(event: DragEvent) {
    event.dataTransfer.effectAllowed = "move";
    this.draggingElement = this.getElement(event);
    this.setElementId();
    this.setDraggingElementType();
  }

  private handleDragEnd(event: DragEvent) {
    console.log(event);
    this.reset();
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();

    const source: HTMLGxcfFlowCollapsedElement = this.draggingElement.getElementsByTagName(
      "gxcf-flow-collapsed"
    )[0];

    const targetHTMLElement: HTMLElement = event.target as HTMLElement;
    if (targetHTMLElement.tagName == this.accordionItem) {
      const target: HTMLGxgAccordionItemElement = targetHTMLElement as HTMLGxgAccordionItemElement;
      const category = target.itemId;
      this.setFlowCategory.emit.call(this, {
        flowName: source.flow.Name,
        category: category
      });
    } else if (targetHTMLElement.tagName == this.dragBox) {
      const target: HTMLGxcfFlowCollapsedElement = (event.target as HTMLElement).getElementsByTagName(
        "gxcf-flow-collapsed"
      )[0];
      this.moveFlow.emit.call(this, {
        source: source.flow.Name,
        target: target.flow.Name,
        moveType: MoveType.Down
      });
    }

    this.reset();
  }

  private getElement(event: DragEvent): HTMLElement {
    return event.target as HTMLElement;
  }

  private setElementId(): void {
    if (this.draggingElement)
      this.draggingElementId = this.draggingElement.getAttribute(
        this.idAttribute
      );
  }

  private setDraggingElementType(): void {
    if (this.draggingElement) {
      if (this.draggingElement.tagName.toLowerCase() == "gxcf-flow-container")
        this.draggingElementType = DraggableComponents.Flow;
    }
  }

  public reset(): void {
    this.draggingElement = null;
    this.draggingElementId = null;
    this.draggingElementType = null;
  }
}
