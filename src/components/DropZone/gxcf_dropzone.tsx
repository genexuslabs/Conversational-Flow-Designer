import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-dropzone",
  styleUrl: "gxcf_dropzone.scss",
  shadow: false
})
export class GXCF_DropZone {
  @Prop() moveType: string;
  @Prop() show:boolean;
  @Prop() objectReferenceId:string;

  @Event() dropOnDropZone: EventEmitter
  TriggerDropOnDropZone(event){
    this.dropOnDropZone.emit(event);
  }

  @Event() onDragOverDropZone: EventEmitter
  TriggerOnDragOverDropZone(event){
    this.onDragOverDropZone.emit(event);
  }

  @Event() onDragLeaveDropZone: EventEmitter
  TriggerOnDragLeaveDropZone(event){
    this.onDragLeaveDropZone.emit(event);
  }

  render() {
    let className:string = "HideZone";

    if (this.show)
      className = "ShowZone";

    return (<span 
      data-moveType={this.moveType} 
      data-elementType="moveFlow" 
      data-objectReferenceId={this.objectReferenceId}
      class={className} 
      onDrop={ (event) => this.TriggerDropOnDropZone(event) } 
      onDragOver={ (event) => this.TriggerOnDragOverDropZone(event) } 
      onDragLeave={ (event) => this.TriggerOnDragLeaveDropZone(event) }
      >    +   </span>);
  }

  public static Show(element:HTMLElement):void
  {
    element.firstElementChild.className = "ShowZone";
  }

  public static Hide(element:HTMLElement):void
  {
    element.firstElementChild.className =  "HideZone";
  }

  public static Active(element:HTMLElement):void
  {
    element.className = "ActiveDropZone";
  }

  public static InActive(element:HTMLElement):void
  {
    element.className = "ShowZone";
  }

  public static readonly Tag:string = "GXCF-DROPZONE";
}