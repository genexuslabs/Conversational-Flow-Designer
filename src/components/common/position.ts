export class PositionElement {
  public static readonly Flow: string = "Flow";
  public static readonly UserInput: string = "UserInput";
  public static readonly Response: string = "Response";
}

export class Position {
  private static m_Position: Position;
  private Flow: string;
  private UserInput: string;
  private Response: number;
  private PositionElement: PositionElement;

  private Position() {
    //
  }

  private static GetInstance(): Position {
    // eslint-disable-next-line @typescript-eslint/camelcase
    if (this.m_Position == null) this.m_Position = new Position();
    return this.m_Position;
  }

  public static SetFlow(flowName: string): void {
    Position.GetInstance().Flow = flowName;
    Position.GetInstance().UserInput = "";
    Position.GetInstance().Response = null;
    Position.GetInstance().PositionElement = PositionElement.Flow;
  }

  public static SetUserInput(flowName: string, userInput: string): void {
    Position.GetInstance().Flow = flowName;
    Position.GetInstance().UserInput = userInput;
    Position.GetInstance().Response = null;
    Position.GetInstance().PositionElement = PositionElement.UserInput;
  }

  public static SetResponse(flowName: string, response: number): void {
    Position.GetInstance().Flow = flowName;
    Position.GetInstance().UserInput = "";
    Position.GetInstance().Response = response;
    Position.GetInstance().PositionElement = PositionElement.Response;
  }

  public static GetPosition(): PositionElement {
    return Position.GetInstance().PositionElement;
  }

  public static GetFlow(): string {
    return Position.GetInstance().Flow;
  }

  public static GetUserInput(): string {
    return Position.GetInstance().UserInput;
  }

  public static GetResponse(): number {
    return Position.GetInstance().Response;
  }
}
