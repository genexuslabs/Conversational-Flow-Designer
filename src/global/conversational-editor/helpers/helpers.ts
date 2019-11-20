export class DragDropHelpers {
  public static readonly NoneEffect: string = "none";
  public static readonly MoveEffect: string = "move";
  public static readonly MoveDown: string = "Down";
}

export class FlowElementHelpers {
  public static readonly ConversationalObjectPrefix: string =
    "ConversationalObject";
  public static readonly InputPrefix: string = "Input";
  public static readonly InputTriggerPrefix: string = "InputTrigger";
  public static readonly ConversationalObjectText: string =
    "CONVERSATIONAL OBJECT: ";

  public static GetConversationalObjectHTMLId(flowName: string): string {
    return `${this.ConversationalObjectPrefix}${flowName}`;
  }

  public static GetFlowInputNameHTMLId(flowName: string): string {
    return `${this.InputPrefix}${flowName}`;
  }

  public static GetFlowInputTriggerHTMLId(flowName: string): string {
    return `${this.InputTriggerPrefix}${flowName}`;
  }

  public static GetConversationalObjectText(
    conversationalObject: string
  ): string {
    return `${this.ConversationalObjectText}${conversationalObject}`;
  }
}

export class ComponentsAttributes {
  public static readonly FlowId: string = "data-flowid";
  public static readonly ElementType: string = "data-elementType";
  public static readonly ElmentTypeValue: string = "flow";
}

export class Controls {
  public static readonly FlowsContainer: string = "FlowsContainer";
}

export enum MoveType {
  Up,
  Down
}

export enum RenderingOptions {
  Collapsed,
  Tall,
  Full
}

export enum SelectTypes {
  Compact,
  Full
}

export class ResponseStyles {
  public static TextMessage = "text message";
  public static ComponentView = "component view";
  public static RedirectTo = "redirect to";

  public static PrettyTextMessage = "Text Message";
  public static PrettyComponentView = "Component View";
  public static PrettyRedirectTo = "Redirect To";
}

export class ComponentTypes {
  public static Component = "Component";
  public static CallPanel = "Call Panel";
}

export class HintId {
  public static TriggerMessages = "TriggerMessages";
  public static Responses = "Responses";
  public static UserInput = "UserInput";
  public static ConversationalObject = "ConversationalObject";
  public static Required = "Required";
  public static AskMessages = "AskMessages";
  public static ValidateUserInput = "ValidateUserInput";
  public static Redirection = "Redirection";
  public static ErrorMessages = "ErrorMessages";
  public static TryLimit = "TryLimit";
  public static ResponseMessage = "ResponseMessage";
  public static ResponseCondition = "ResponseCondition";
  public static ResponseStyle = "ResponseStyle";
  public static ShowResponseAs = "ShowResponseAs";
  public static SDComponent = "SDComponent";
  public static WebComponent = "WebComponent";
}

export class PropertiesDefinition {
  //For Test
  public static readonly ResponseMessageTitle: string = "Response Messages";
  public static readonly ResponseMessageDescription: string =
    "Response Messages";
  public static readonly ResponseMessageLabel: string =
    "What's a Response Message?";

  public static readonly ResponseConditionTitle: string = "Response Condition";
  public static readonly ResponseConditionDescription: string =
    "Response Condition";
  public static readonly ResponseConditionLabel: string =
    "What's a Response Condition?";

  public static readonly ResponseStyleTitle: string = "Response Style";
  public static readonly ResponseStyleDescription: string = "Response Style";
  public static readonly ResponseStyleLabel: string =
    "What's a Response Style?";

  public static readonly TriggerMessagesTitle: string = "Trigger Messages";
  public static readonly TriggerMessagesDescription: string =
    "Specifies the trigger messages for this flow. You can type multiple messages using the ';' delimiter";
  public static readonly TriggerMessagesLabel: string =
    "What's a Trigger Message?";

  public static readonly ResponseTitle: string = "Response";
  public static readonly ResponseDescription: string =
    "Any Flow of a Conversational instance has a Response. In the Response node, you can model the behavior after the Flow finishes its execution. \n The Response node can be left empty (which means that the Flow doesn't give any feedback to the end user after it finishes), or it can have Response Parameters and/or Messages children nodes.";
  public static readonly ResponseLabel: string = "What's a Response?";

  public static readonly UserInputTitle: string = "User Input";
  public static readonly UserInputDescription: string =
    "The User Input represents the input parameters of the Flow of a Conversational instance. \n That is, the different parameters that the chatbot will ask the user when it detects the intent related to the flow.";
  public static readonly UserInputLabel: string = "What's a User Input?";

  public static readonly ConversationalObjectTitle: string =
    "Conversational Object";
  public static readonly ConversationalObjectDescription: string =
    "GeneXus object that will resolve the flow’s action. In the case of web objects, it has to be a Web Component. It's called automatically after the User inputs are entered. If the Message of the Flow has a Component view Style, and the SD Component or Web Component property is set, you have to call the Conversational Flows object from the Start Event of the corresponding component.";
  public static readonly UConversationalObjectLabel: string =
    "What's a Conversational Object?";

  public static readonly RequiredTitle: string = "Required";
  public static readonly RequiredDescription: string =
    "The user input is required if the Required Condition property is true. Only for Watson.";
  public static readonly RequiredLabel: string =
    "What's the condition to be required?";

  public static readonly AskMessagesTitle: string = "Ask Messages";
  public static readonly AskMessagesDescription: string =
    "Specify the ask messages for this parameter. You can type multiple messages using the ‘;’ delimiter and you can reference any context parameter using the '&' character.";
  public static readonly AskMessagesLabel: string = "What're the ask messages?";

  public static readonly ValidateUserInputTitle: string = "Validate User Input";
  public static readonly ValidateUserInputDescription: string =
    "The Validation Procedure is available for any Chatbot User Input and is triggered as soon the user enters data for that user input.";
  public static readonly ValidateUserInputLabel: string =
    "What's validate user input?";

  public static readonly RedirectionTitle: string = "Redirection";
  public static readonly RedirectionDescription: string =
    "Select an existing flow to redirect the conversation when the current condition is true.";
  public static readonly RedirectionLabel: string = "What's a redirection?";

  public static readonly ErrorMessagesTitle: string = "On Error Messages";
  public static readonly ErrorMessagesDescription: string =
    "Specifies the On Error Messages for this parameter. You can type multiple messages using the ‘;’ delimiter and reference any context parameter using the '&' character.";
  public static readonly ErrorMessagesLabel: string =
    "What're the On Error Messages?";

  public static readonly TryLimitTitle: string = "Try Limit";
  public static readonly TryLimitDescription: string =
    "When Ask again property is set to TRUE, you can establish the number of times the user is asked to re-try.";
  public static readonly TryLimitLabel: string = "What's the Try Limit?";

  public static readonly ShowResponseAsTitle: string = "Show Response As";
  public static readonly ShowResponseAsDescription: string = "Show Response As";
  public static readonly ShowResponseAsLabel: string =
    "What's Show Response As?";

  public static readonly WebComponentTitle: string = "Web Compoennt";
  public static readonly WebComponentDescription: string = "Web Component";
  public static readonly WebComponentLabel: string =
    "What's the Web Component?";

  public static readonly SDComponentTitle: string = "SD Compoennt";
  public static readonly SDComponentDescription: string = "SD Component";
  public static readonly SDComponentLabel: string = "What's the SD Component?";

  public static GetTitle(hintId: HintId): string {
    if (hintId == HintId.TriggerMessages) return this.TriggerMessagesTitle;
    if (hintId == HintId.Responses) return this.ResponseTitle;
    if (hintId == HintId.UserInput) return this.UserInputTitle;
    if (hintId == HintId.ConversationalObject)
      return this.ConversationalObjectTitle;
    if (hintId == HintId.Required) return this.RequiredTitle;
    if (hintId == HintId.AskMessages) return this.AskMessagesTitle;
    if (hintId == HintId.ValidateUserInput) return this.ValidateUserInputTitle;
    if (hintId == HintId.Redirection) return this.RedirectionTitle;
    if (hintId == HintId.ErrorMessages) return this.ErrorMessagesTitle;
    if (hintId == HintId.TryLimit) return this.TryLimitTitle;
    if (hintId == HintId.ResponseMessage) return this.ResponseMessageTitle;
    if (hintId == HintId.ResponseCondition) return this.ResponseConditionTitle;
    if (hintId == HintId.ResponseStyle) return this.ResponseStyleTitle;
    if (hintId == HintId.ShowResponseAs) return this.ShowResponseAsTitle;
    if (hintId == HintId.WebComponent) return this.WebComponentTitle;
    if (hintId == HintId.SDComponent) return this.SDComponentTitle;
    return "";
  }

  public static GetDescription(hintId: HintId): string {
    if (hintId == HintId.TriggerMessages)
      return this.TriggerMessagesDescription;
    if (hintId == HintId.Responses) return this.ResponseDescription;
    if (hintId == HintId.UserInput) return this.UserInputDescription;
    if (hintId == HintId.ConversationalObject)
      return this.ConversationalObjectDescription;
    if (hintId == HintId.Required) return this.RequiredDescription;
    if (hintId == HintId.AskMessages) return this.AskMessagesDescription;
    if (hintId == HintId.ValidateUserInput)
      return this.ValidateUserInputDescription;
    if (hintId == HintId.ResponseMessage)
      return this.ResponseMessageDescription;
    if (hintId == HintId.ResponseCondition)
      return this.ResponseConditionDescription;
    if (hintId == HintId.ResponseStyle) return this.ResponseStyleDescription;
    if (hintId == HintId.ShowResponseAs) return this.ShowResponseAsDescription;
    if (hintId == HintId.WebComponent) return this.WebComponentDescription;
    if (hintId == HintId.SDComponent) return this.SDComponentDescription;
    return "";
  }

  public static GetLabel(hintId: HintId): string {
    if (hintId == HintId.TriggerMessages) return this.TriggerMessagesLabel;
    if (hintId == HintId.Responses) return this.ResponseLabel;
    if (hintId == HintId.UserInput) return this.UserInputLabel;
    if (hintId == HintId.ConversationalObject)
      return this.UConversationalObjectLabel;
    if (hintId == HintId.Required) return this.RequiredLabel;
    if (hintId == HintId.AskMessages) return this.AskMessagesLabel;
    if (hintId == HintId.ValidateUserInput) return this.ValidateUserInputLabel;
    if (hintId == HintId.Redirection) return this.RedirectionLabel;
    if (hintId == HintId.ErrorMessages) return this.ErrorMessagesLabel;
    if (hintId == HintId.TryLimit) return this.TryLimitLabel;
    if (hintId == HintId.ResponseMessage) return this.ResponseMessageLabel;
    if (hintId == HintId.ResponseCondition) return this.ResponseConditionLabel;
    if (hintId == HintId.ResponseStyle) return this.ResponseStyleLabel;
    if (hintId == HintId.ShowResponseAs) return this.ShowResponseAsLabel;
    if (hintId == HintId.WebComponent) return this.WebComponentLabel;
    if (hintId == HintId.SDComponent) return this.SDComponentLabel;
    return "";
  }
}
