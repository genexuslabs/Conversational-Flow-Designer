import { RenderingOptions } from "../../helpers/helpers";
import { FlowElement } from "./flow-element";

export class ResponseElement {
  public Style: string;
  public Messages: string[];
  public ComponentType: string;
  public WebComponent: string;
  public SDComponent: string;
  public Condition: string;
  public RedirectTo: string;
  public RenderType: RenderingOptions;
  public Index: number;
  public Parent: FlowElement;

  public constructor(
    style: string,
    messages: string[],
    componentType: string,
    webComponent: string,
    sdComponent: string,
    condition: string,
    redirectTo: string,
    renderType: RenderingOptions,
    index: number,
    parent: FlowElement
  ) {
    this.Style = style;
    this.Messages = messages;
    this.ComponentType = componentType;
    this.WebComponent = webComponent;
    this.SDComponent = sdComponent;
    this.Condition = condition;
    this.RedirectTo = redirectTo;
    this.RenderType = renderType;
    this.Index = index;
    this.Parent = parent;
  }

  public GetFristResponseMessage(): string {
    if (this.Messages.length > 0) return this.Messages[0];
    return "";
  }

  public SetRenderType(renderType: RenderingOptions) {
    this.RenderType = renderType;
  }

  public EditMessage(message: string, index: number): void {
    this.Messages[index] = message;
    console.log("Edit message");
    this.SetMessages();
  }

  public DeleteMessage(index: number): void {
    if (this.Messages.length > index) {
      this.Messages.splice(index, 0);
      this.SetMessages();
    }
  }

  private SetMessages(): void {
    let responseMessages = "";
    this.Messages.forEach(function(msg) {
      responseMessages += msg + ";";
    });
    console.log("Call external");
    if (window.external.SetResponseMessages)
      window.external.SetResponseMessages(
        this.Parent.Name,
        this.Index,
        responseMessages
      );
  }

  public SetStyle(value: string) {
    this.Style = value;
    if (window.external.SetStyle)
      window.external.SetStyle(this.Parent.Name, this.Index, value);
  }

  public SetCondition(value: string) {
    this.Condition = value;
    if (window.external.SetResponseCondition)
      window.external.SetResponseCondition(
        this.Parent.Name,
        this.Index,
        this.Condition
      );
  }

  public SetRedirectTo(value: string) {
    this.RedirectTo = value;
    if (window.external.SetResponseRedirectTo)
      window.external.SetResponseRedirectTo(
        this.Parent.Name,
        this.Index,
        this.RedirectTo
      );
  }

  public SetComponentType(value: string) {
    this.ComponentType = value;
    if (window.external.SetComponentType)
      window.external.SetComponentType(
        this.Parent.Name,
        this.Index,
        this.ComponentType
      );
  }
}
