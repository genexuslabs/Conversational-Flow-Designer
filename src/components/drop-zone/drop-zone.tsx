import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-drop-zone",
  styleUrl: "drop-zone.scss",
  shadow: false
})
export class DropZone {
  @Prop() moveType: string;
  @Prop() show: boolean;
  @Prop() objectReferenceId: string;

  @Event() dropOnDropZone: EventEmitter;
  TriggerDropOnDropZone(event): void {
    this.dropOnDropZone.emit(event);
  }

  @Event() onDragOverDropZone: EventEmitter;
  TriggerOnDragOverDropZone(event): void {
    this.onDragOverDropZone.emit(event);
  }

  @Event() onDragLeaveDropZone: EventEmitter;
  TriggerOnDragLeaveDropZone(event): void {
    this.onDragLeaveDropZone.emit(event);
  }

  public static Show(element: HTMLElement): void {
    element.firstElementChild.className = "ShowZone";
  }

  public static Hide(element: HTMLElement): void {
    element.firstElementChild.className = "HideZone";
  }

  public static Active(element: HTMLElement): void {
    element.className = "ActiveDropZone";
  }

  public static InActive(element: HTMLElement): void {
    element.className = "ShowZone";
  }

  public static readonly Tag: string = "gxcf-drop-zone";

  render() {
    let className = "HideZone";

    if (this.show) className = "ShowZone";

    return (
      <span
        data-moveType={this.moveType}
        data-elementType="moveFlow"
        data-objectReferenceId={this.objectReferenceId}
        class={className}
        onDrop={event => this.TriggerDropOnDropZone(event)}
        onDragOver={event => this.TriggerOnDragOverDropZone(event)}
        onDragLeave={event => this.TriggerOnDragLeaveDropZone(event)}
      >
        {" "}
        +{" "}
      </span>
    );
  }
}
