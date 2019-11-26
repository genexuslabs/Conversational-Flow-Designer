import { MoveType } from "../../global/conversational-editor/helpers/helpers";
import { App } from "../../global/conversational-editor/app";

enum DraggableComponents {
  Flow,
  UserInput,
  Response
}

enum DragOverComponents {
  Flow,
  DropZone
}

enum DropZoneStatus {
  On,
  Off
}

export class ConversationalDesignerDragDrop {
  private draggingElement: HTMLElement;
  private draggingElementType: DraggableComponents;
  private draggingElementId: string;
  private currentTargetElement: HTMLElement;
  private currentTargetElementId: string;
  private element: HTMLGxcfConversationalDesignerElement;
  private readonly idAttribute: string = "data-gxcf-element-id";

  constructor(element: HTMLGxcfConversationalDesignerElement) {
    this.element = element;
  }

  public initialize() {
    this.element.addEventListener("dragstart", this.handleDragStart.bind(this));

    this.element.addEventListener("dragleave", this.handleDragLeave.bind(this));

    this.element.addEventListener("dropOnDropZone", this.handleDrop.bind(this));

    this.element.addEventListener("dragover", this.handleOver.bind(this));

    this.element.addEventListener("dragend", this.handleDragEnd.bind(this));
  }

  private handleDragStart(event: DragEvent) {
    const dataTransfer = event.dataTransfer;
    this.draggingElement = this.getElement(event);
    this.setElementId();
    this.setDraggingElementType();
    dataTransfer.dropEffect = "copy";
    dataTransfer.setData("text/plain", this.draggingElementId);
  }

  private handleDragLeave(event: DragEvent) {
    if (this.draggingElementType == DraggableComponents.Flow)
      this.handleDrageLeaveFlow(event);
  }

  private handleDragEnd(event: DragEvent) {
    console.log(event);
    this.reset();
  }

  private handleDrop(event: DragEvent) {
    this.setDropZoneStatus(DropZoneStatus.Off);
    event.preventDefault();
    const path: EventTarget[] = event.composedPath();
    const dropTarget: HTMLElement = path[0] as HTMLElement;
    const dropZoneElement: HTMLGxcfDropZoneElement = dropTarget as HTMLGxcfDropZoneElement;

    if (dropZoneElement.moveType == MoveType.Up)
      App.GetApp().Instance.MoveFlows(
        this.draggingElementId,
        this.currentTargetElementId,
        MoveType.Up
      );
    else
      App.GetApp().Instance.MoveFlows(
        this.draggingElementId,
        this.currentTargetElementId,
        MoveType.Down
      );

    this.element.instance = Object.assign({}, App.GetApp().Instance);
    this.reset();
  }

  private handleOver(event: DragEvent) {
    if (!this.draggingElement) return;

    event.preventDefault();

    if (this.draggingElementType == DraggableComponents.Flow)
      this.handleOverFlow(event);
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

  private getCurrentTarget(event: DragEvent): HTMLElement {
    return event.target as HTMLElement;
  }

  private getCurrentTargetId(element: HTMLElement): string {
    return element.getAttribute(this.idAttribute);
  }

  private handleOverFlow(event: DragEvent): void {
    if (!this.draggingElement) return;

    event.preventDefault();

    this.currentTargetElement = this.getCurrentTarget(event);
    const lastCurrentTargetElementId: string = this.currentTargetElementId;
    this.currentTargetElementId = this.getCurrentTargetId(
      this.currentTargetElement
    );

    if (
      this.draggingElementId != this.currentTargetElementId &&
      this.currentTargetElementId != lastCurrentTargetElementId
    )
      this.showDropZones();
  }

  private showDropZones(): void {
    this.setDropZoneStatus(DropZoneStatus.On);
  }

  private handleDrageLeaveFlow(event: DragEvent) {
    if (!this.draggingElement) return;
    console.log(event);
    this.setDropZoneStatus(DropZoneStatus.Off);
  }

  private setDropZoneStatus(status: DropZoneStatus): void {
    const shadow = this.currentTargetElement.shadowRoot;
    if (shadow != null) {
      shadow.childNodes[0].childNodes.forEach(function(node) {
        const hNode: HTMLElement = node as HTMLElement;
        if (hNode.tagName.toLowerCase() == "gxcf-drop-zone") {
          const dropZoneElement: HTMLGxcfDropZoneElement = hNode as HTMLGxcfDropZoneElement;
          if (status == DropZoneStatus.On) dropZoneElement.Show();
          else dropZoneElement.Hide();
        }
      });
    }
  }

  public reset(): void {
    this.draggingElement = null;
    this.draggingElementId = null;
    this.draggingElementType = null;
  }
}
