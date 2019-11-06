import { RenderingOptions } from "../../helpers/helpers";
import { UserInputElement } from "./user-input-element";
import { ResponseElement } from "./response-element";
import { CustomJSON } from "../instance";
import {
  ConversationalElement,
  CollectionType
} from "./iconversational-element";
import { EventHandler } from "../../event-handler";
import { RedirectionProperty } from "./redirection-property";
import { Flow } from "../../../../components/flow-container/flow-container";
import { FlowFull } from "../../../../components/flow-full/flow-full";

export class FlowElement implements ConversationalElement {
  public Name = "";
  public ConversationalObject = "";
  public TriggerMessages: string[] = [];
  public Id = "";
  public RenderType: RenderingOptions = RenderingOptions.Summary;
  public UserInputs: UserInputElement[];
  public Responses: ResponseElement[];
  public Component: Flow;
  public UserInputComponent: FlowFull;

  constructor(name: string) {
    this.Name = name;
    this.Id = `GXCF_Id${this.FormatName()}`;
    this.UserInputs = new Array<UserInputElement>();
    this.Responses = new Array<ResponseElement>();
  }

  public FormatName(): string {
    return this.Name.replace(" ", "").replace(" ", "");
  }

  public GetSummaryTriggerMessage(): string {
    if (this.TriggerMessages[0] != null) {
      return this.TriggerMessages[0];
    }
    return "";
  }

  public GetSummaryConversationalObject(): string {
    if (this.ConversationalObject != null && this.ConversationalObject != "") {
      return this.ConversationalObject.toUpperCase();
    }
    return "NONE";
  }

  public SetTrigger(index: number, newValue: string): void {
    this.TriggerMessages[index] = newValue;
    this.ExternalUpdateTriggerMessages();
  }

  public DeleteTrigger(index: number): void {
    if (this.TriggerMessages.length > index) {
      this.TriggerMessages.splice(index, 0);
      this.ExternalUpdateTriggerMessages();
    }
  }

  private ExternalUpdateTriggerMessages(): void {
    if (window.external.SetAskMessages) {
      const messages: string = EventHandler.GetFormattedMessages(
        this.TriggerMessages
      );
      window.external.SetTriggers(this.Name, messages);
    }
  }

  public AddUserInput(userInput: UserInputElement): void {
    this.UserInputs.push(userInput);
  }

  public AddResponse(response: ResponseElement): void {
    this.Responses.push(response);
  }

  public LoadFlow(jsonFlow: CustomJSON): void {
    this.Name = jsonFlow.Name;
    this.Id = `GXCF_Id${this.FormatName()}`;
    this.UserInputs = new Array<UserInputElement>();
    this.Responses = new Array<ResponseElement>();
    this.TriggerMessages = new Array<string>();
    this.ConversationalObject = jsonFlow.ConversationalObjectName;
    this.TriggerMessages = jsonFlow.Triggers;
    jsonFlow.Fields.forEach(function(field) {
      console.log(JSON.stringify(field));
      const redirections: RedirectionProperty[] = new Array<
        RedirectionProperty
      >();
      field.Redirections.forEach(function(redir) {
        redirections.push(
          new RedirectionProperty(redir.RedirectCondition, redir.RedirectTo)
        );
      });
      const userInput: UserInputElement = new UserInputElement(
        field.Variable,
        field.IsCollection,
        field.RequiredMessages,
        field.ErrorMessages,
        field.Entity,
        field.DataType,
        field.TryLimit,
        field.AskAgain,
        field.CleanInContext,
        field.ValidationProcedure,
        field.Required,
        field.RequiredCondition,
        this,
        redirections
      );
      this.AddUserInput(userInput);
    }, this);
    jsonFlow.View.Templates.forEach(function(template) {
      const response: ResponseElement = new ResponseElement(
        template.Style,
        template.Format,
        template.ComponentType,
        template.WebComponent,
        template.SDComponent,
        template.Condition,
        template.RedirectTo
      );
      this.AddResponse(response);
    }, this);
  }

  public SetRenderType(renderType: RenderingOptions): void {
    this.RenderType = renderType;
    this.Component.refresh = !this.Component.refresh;
  }

  public SetItem(
    index: number,
    value: string,
    collectionType: CollectionType
  ): void {
    if (collectionType == CollectionType.TriggerMessages)
      this.SetTrigger(index, value);
  }

  public DeleteItem(index: number, collectionType: CollectionType): void {
    if (collectionType == CollectionType.TriggerMessages)
      this.DeleteTrigger(index);
  }

  public SetName(name: string): void {
    const oldName = this.Name;
    this.Name = name;
    this.Component.refresh = !this.Component.refresh;
    if (window.external.ModifyFlowName)
      window.external.ModifyFlowName(oldName, this.Name);
  }

  public SetFirstTriggerMessage(msg: string): void {
    this.TriggerMessages[0] = msg;
    this.Component.refresh = !this.Component.refresh;
    const messages: string = EventHandler.GetFormattedMessages(
      this.TriggerMessages
    );
    if (window.external.SetTriggers)
      window.external.SetTriggers(this.Name, messages);
  }

  public NewUserInput(): void {
    const userInput: UserInputElement = new UserInputElement(
      "New Variable",
      false,
      [],
      [],
      "",
      "VarChar",
      0,
      false,
      false,
      "",
      "Required",
      "",
      this,
      new Array<RedirectionProperty>()
    );
    if (this.UserInputs == null)
      this.UserInputs = new Array<UserInputElement>();
    this.UserInputs.push(userInput);
    if (window.external.AddUserInput) window.external.AddUserInput(this.Name);
  }

  public NewResponse(): void {
    const response: ResponseElement = new ResponseElement(
      "text message",
      [],
      "",
      "",
      "",
      "",
      ""
    );
    if (this.Responses == null) this.Responses = new Array<ResponseElement>();
    this.Responses.push(response);
    if (window.external.AddResponse) window.external.AddResponse(this.Name);
  }
}