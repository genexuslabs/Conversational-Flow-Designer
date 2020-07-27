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

  TriggerMoveFlow(pMoveType: string): void {
    this.moveFlow.emit.call(this, {
      source: this.draggingElementId,
      target: this.currentTargetElementId,
      moveType: pMoveType
    });
  }

  constructor(
    element: HTMLGxcfConversationalDesignerElement,
    moveFlow: EventEmitter
  ) {
    this.element = element;
    this.moveFlow = moveFlow;
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

  private handleDrop(event: DragEvent) {
    console.log("Drop!");
    event.preventDefault();
    console.log("Dragging:");
    console.log(event);
    const dragging: HTMLGxcfFlowCollapsedElement = (event.target as HTMLElement).getElementsByTagName(
      "gxcf-flow-collapsed"
    )[0];
    const target: HTMLGxcfFlowCollapsedElement = this.draggingElement.getElementsByTagName(
      "gxcf-flow-collapsed"
    )[0];

    const auxFlow = dragging.flow;
    dragging.flow = target.flow;
    target.flow = auxFlow;
    this.moveFlow.emit.call(this, {
      source: dragging.id,
      target: target.id,
      moveType: MoveType.Down
    });

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
