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

export class MoveType {
  public static readonly Up: string = "Up";
  public static readonly Down: string = "Down";
}

export enum SelectTypes {
  Compact,
  Full,
  Extended
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
  public static readonly ResponseMessageLabel: string = " ?";

  public static readonly ResponseConditionTitle: string = "Response Condition";
  public static readonly ResponseConditionLabel: string = " ?";

  public static readonly ResponseStyleTitle: string = "Response Style";
  public static readonly ResponseStyleLabel: string = " ?";

  public static readonly TriggerMessagesTitle: string = "Trigger Messages";
  public static readonly TriggerMessagesLabel: string = " ?";

  public static readonly ResponseTitle: string = "Response";
  public static readonly ResponseDescription: string =
    "Any Flow of a Conversational instance has a Response. In the Response node, you can model the behavior after the Flow finishes its execution. \n The Response node can be left empty (which means that the Flow doesn't give any feedback to the end user after it finishes), or it can have Response Parameters and/or Messages children nodes.";
  public static readonly ResponseLabel: string = " ?";

  public static readonly UserInputTitle: string = "User Input";
  public static readonly UserInputDescription: string =
    "The User Input represents the input parameters of the Flow of a Conversational instance. \n That is, the different parameters that the chatbot will ask the user when it detects the intent related to the flow.";
  public static readonly UserInputLabel: string = " ?";

  public static readonly ConversationalObjectTitle: string =
    "Conversational Object";
  public static readonly UConversationalObjectLabel: string = " ?";

  public static readonly RequiredTitle: string = "Required";
  public static readonly RequiredLabel: string = " ?";

  public static readonly AskMessagesTitle: string = "Ask Messages";
  public static readonly AskMessagesLabel: string = " ?";

  public static readonly ValidateUserInputTitle: string = "Validate User Input";
  public static readonly ValidateUserInputLabel: string = " ?";

  public static readonly RedirectionTitle: string = "Redirection";
  public static readonly RedirectionLabel: string = " ?";

  public static readonly ErrorMessagesTitle: string = "On Error Messages";
  public static readonly ErrorMessagesLabel: string = " ?";

  public static readonly TryLimitTitle: string = "Try Limit";
  public static readonly TryLimitLabel: string = " ?";

  public static readonly ShowResponseAsTitle: string = "Show Response As";
  public static readonly ShowResponseAsLabel: string = " ?";

  public static readonly WebComponentTitle: string = "Web Compoennt";
  public static readonly WebComponentLabel: string = " ?";

  public static readonly SDComponentTitle: string = "SD Compoennt";
  public static readonly SDComponentLabel: string = " ?";

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
    if (hintId == HintId.Responses) return this.ResponseDescription;
    if (hintId == HintId.UserInput) return this.UserInputDescription;
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

  public static GetHelpPage(hintId: HintId): number {
    if (hintId == HintId.TriggerMessages) return 39067;
    if (hintId == HintId.Responses) return 39781;
    if (hintId == HintId.UserInput) return 38959;
    if (hintId == HintId.ConversationalObject) return 38189;
    if (hintId == HintId.Required) return 43692;
    if (hintId == HintId.AskMessages) return 40217;
    if (hintId == HintId.ValidateUserInput) return 42594;
    if (hintId == HintId.Redirection) return 39003;
    if (hintId == HintId.ErrorMessages) return 38958;
    if (hintId == HintId.TryLimit) return 40216;
    if (hintId == HintId.ResponseMessage) return 39033;
    if (hintId == HintId.ResponseCondition) return 39491;
    if (hintId == HintId.ResponseStyle) return 39492;
    if (hintId == HintId.ShowResponseAs) return 39494;
    if (hintId == HintId.WebComponent) return 39885;
    if (hintId == HintId.SDComponent) return 39878;
    return 37102;
  }

  static GetURL(hintId: string): string {
    if (hintId) {
      return (
        "https://wiki.genexus.com/commwiki/servlet/wiki?" +
        this.GetHelpPage(hintId)
      );
    }
  }
}
