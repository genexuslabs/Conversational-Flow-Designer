import { RenderingOptions } from "../../helpers/helpers";
import { FlowElement } from "./flow-element";
import { ConversationalElement } from "./iconversational-element";
import { EventHandler } from "../../event-handler";
import { RedirectionProperty } from "./redirection-property";
import { UserInput } from "../../../../components/user-input-container/user-input-container";

export enum RequiredTypes {
  Always,
  Never,
  Condition
}

export class UserInputElement implements ConversationalElement {
  public Variable: string;
  public IsCollection: boolean;
  public RequiredMessages: string[];
  public ErrorMessages: string[];
  public Entity: string;
  public DataType: string;
  public TryLimit: number;
  public AskAgain: boolean;
  public CleanInContext: boolean;
  public ValidationProcedure: string;
  public Required: RequiredTypes;
  public RequiredCondition: string;
  public RenderType: RenderingOptions;
  public Component: UserInput;
  public Parent: FlowElement;
  public Redirections: RedirectionProperty[];

  public constructor(
    varName: string,
    isColl: boolean,
    reqMsgs: string[],
    errorMsgs: string[],
    entity: string,
    dataType: string,
    tryLimit: number,
    askAgain: boolean,
    clean: boolean,
    validationProc: string,
    reqType: string,
    reqCondition: string,
    parent: FlowElement,
    redirections: RedirectionProperty[]
  ) {
    this.Variable = varName;
    this.IsCollection = isColl;
    this.RequiredMessages = reqMsgs;
    this.ErrorMessages = errorMsgs;
    this.Entity = entity;
    this.DataType = dataType;
    this.TryLimit = tryLimit;
    this.AskAgain = askAgain;
    this.CleanInContext = clean;
    this.ValidationProcedure = validationProc;
    this.Required = RequiredTypes[reqType];
    this.RequiredCondition = reqCondition;
    this.RenderType = RenderingOptions.Collapsed;
    this.Parent = parent;
    this.Redirections = redirections;
  }

  public GetFirstAskMessage(): string {
    if (this.RequiredMessages.length > 0) return this.RequiredMessages[0];
    return "";
  }

  public SetRenderType(renderType: RenderingOptions): void {
    this.RenderType = renderType;
  }

  public SetAskMessage(index: number, value: string): void {
    this.RequiredMessages[index] = value;
    this.ExternalUpdateAskMessages();
  }

  public SetOnErrorMessage(index: number, value: string): void {
    this.ErrorMessages[index] = value;
    this.ExternalUpdateErrorMessages();
  }

  public DeleteAskMessage(index: number): void {
    if (this.RequiredMessages.length > index) {
      this.RequiredMessages.splice(index, 0);
      this.ExternalUpdateAskMessages();
    }
  }

  public DeleteOnErrorMessage(index: number): void {
    if (this.ErrorMessages.length > index) {
      this.ErrorMessages.splice(index, 0);
      this.ExternalUpdateErrorMessages();
    }
  }

  private ExternalUpdateAskMessages(): void {
    if (window.external.SetAskMessages) {
      const messages: string = EventHandler.GetFormattedMessages(
        this.RequiredMessages
      );
      window.external.SetAskMessages(this.Parent.Name, this.Variable, messages);
    }
  }

  private ExternalUpdateErrorMessages(): void {
    if (window.external.SetErrorMessages) {
      const messages: string = EventHandler.GetFormattedMessages(
        this.ErrorMessages
      );
      window.external.SetErrorMessages(
        this.Parent.Name,
        this.Variable,
        messages
      );
    }
  }

  public SetName(name: string): void {
    const oldName = this.Variable;
    this.Variable = name;
    if (window.external.ModifyUserInputName)
      window.external.ModifyUserInputName(
        this.Parent.Name,
        oldName,
        this.Variable
      );
  }

  public SetFirstAskMessage(value: string): void {
    this.SetAskMessage(0, value);
  }

  public SetValidationProcedure(validationProcedure: string): void {
    this.ValidationProcedure = validationProcedure;
  }

  public AddNewRedirection() {
    if (this.Redirections == null)
      this.Redirections = new Array<RedirectionProperty>();
    this.Redirections.push(
      new RedirectionProperty("", "", this.Redirections.length)
    );
    if (window.external.AddNewRedirection)
      window.external.AddNewRedirection(this.Parent.Name, this.Variable);
  }

  public SetRedirectCondition(value: string, index: any) {
    if (this.Redirections.length > index) {
      this.Redirections[index].RedirectCondition = value;
      if (window.external.SetRedirectionCondition)
        window.external.SetRedirectionCondition(
          this.Parent.Name,
          this.Variable,
          value,
          index
        );
    }
  }

  public SetTryLimit(value: number) {
    this.TryLimit = value;
    if (window.external.SetTryLimit)
      window.external.SetTryLimit(
        this.Parent.Name,
        this.Variable,
        value.toString()
      );
  }

  GetParentName(): string {
    return this.Parent.Name;
  }
  GetName(): string {
    return this.Variable;
  }
}
