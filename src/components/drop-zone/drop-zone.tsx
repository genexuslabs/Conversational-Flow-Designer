import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
  Method
} from "@stencil/core";

class DropZoneStyles {
  public static readonly Show: string = "ShowZone";
  public static readonly Active: string = "ActiveDropZone";
  public static readonly Hide: string = "HideZone";
}

@Component({
  tag: "gxcf-drop-zone",
  styleUrl: "drop-zone.scss",
  shadow: true
})
export class DropZone {
  @Prop() moveType: string;
  @Prop() show: boolean;
  @Prop() objectReferenceId: string;
  @Element() element: HTMLElement;

  @Event() dropOnDropZone: EventEmitter;
  TriggerDropOnDropZone(event: DragEvent): void {
    this.dropOnDropZone.emit(event);
  }

  HandleDragOverDropZone(event): void {
    console.log(event);
    this.Active();
  }

  HandleDragLeaveDropZone(event): void {
    console.log(event);
    this.InActive();
  }

  public Active(): void {
    const shadow = this.element.shadowRoot;
    shadow.firstElementChild.className = DropZoneStyles.Active;
  }

  public InActive(): void {
    this.Show();
  }

  @Method()
  public async Show() {
    const shadow = this.element.shadowRoot;
    shadow.firstElementChild.className = DropZoneStyles.Show;
  }

  @Method()
  public async Hide() {
    const shadow = this.element.shadowRoot;
    shadow.firstElementChild.className = DropZoneStyles.Hide;
  }

  render() {
    let className = DropZoneStyles.Hide;

    if (this.show) className = DropZoneStyles.Show;

    return (
      <span
        data-moveType={this.moveType}
        data-elementType="moveFlow"
        data-objectReferenceId={this.objectReferenceId}
        class={className}
        onDrop={event => this.TriggerDropOnDropZone(event)}
        onDragOver={event => this.HandleDragOverDropZone(event)}
        onDragLeave={event => this.HandleDragLeaveDropZone(event)}
      >
        {" "}
        +{" "}
      </span>
    );
  }
}
