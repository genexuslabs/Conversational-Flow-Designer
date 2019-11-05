export class RedirectionProperty {
  public RedirectCondition: string;
  public RedirectTo: string;

  constructor(condition: string, to: string) {
    this.RedirectCondition = condition;
    this.RedirectTo = to;
  }
}
