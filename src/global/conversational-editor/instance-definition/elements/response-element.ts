import { RenderingOptions } from "../../helpers/helpers";

export class ResponseElement {
  public Style: string;
  public Messages: string[];
  public ComponentType: string;
  public WebComponent: string;
  public SDComponent: string;
  public Condition: string;
  public RedirectTo: string;
  public RenderType: RenderingOptions;

  public constructor(
    style: string,
    messages: string[],
    componentType: string,
    webComponent: string,
    sdComponent: string,
    condition: string,
    redirectTo: string,
    renderType: RenderingOptions
  ) {
    this.Style = style;
    this.Messages = messages;
    this.ComponentType = componentType;
    this.WebComponent = webComponent;
    this.SDComponent = sdComponent;
    this.Condition = condition;
    this.RedirectTo = redirectTo;
    this.RenderType = renderType;
  }

  public GetFristResponseMessage(): string {
    if (this.Messages.length > 0) return this.Messages[0];
    return "";
  }

  public SetRenderType(renderType: RenderingOptions) {
    this.RenderType = renderType;
  }
}
