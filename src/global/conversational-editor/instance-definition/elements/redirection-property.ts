import { ConversationalElement } from "./iconversational-element";

export class RedirectionProperty {
  public RedirectCondition: string;
  public RedirectTo: string;
  public Index: number;

  constructor(condition: string, to: string, index: number) {
    this.RedirectCondition = condition;
    this.RedirectTo = to;
    this.Index = index;
  }

  SetRedirectCondition(element: ConversationalElement, value: string) {
    this.RedirectCondition = value;
    if (window.external.SetRedirectionCondition)
      window.external.SetRedirectionCondition(
        element.GetParentName(),
        element.GetName(),
        value,
        this.Index
      );
  }

  SetRedirectTo(element: ConversationalElement, value: string) {
    this.RedirectTo = value;
    if (window.external.SetRedirectTo)
      window.external.SetRedirectTo(
        element.GetParentName(),
        element.GetName(),
        value,
        this.Index
      );
  }
}
