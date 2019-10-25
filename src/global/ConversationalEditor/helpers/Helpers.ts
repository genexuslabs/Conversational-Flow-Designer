export class DragDropHelpers{
    public static readonly NoneEffect:string = "none";
    public static readonly MoveEffect:string = "move";
    public static readonly MoveDown:string = "Down";
}

export class FlowElementHelpers{
    public static readonly ConversationalObjectPrefix:string = "ConversationalObject";
    public static readonly InputPrefix:string = "Input";
    public static readonly InputTriggerPrefix:string = "InputTrigger";
    public static readonly ConversationalObjectText:string = "CONVERSATIONAL OBJECT: ";

    public static GetConversationalObjectHTMLId(flowName:string):string{
        return `${this.ConversationalObjectPrefix}${flowName}`;
    }

    public static GetFlowInputNameHTMLId(flowName:string):string{
        return `${this.InputPrefix}${flowName}`; 
    }

    public static GetFlowInputTriggerHTMLId(flowName:string):string{
        return `${this.InputTriggerPrefix}${flowName}`
    }

    public static GetConversationalObjectText(conversationalObject:string):string{
        return  `${this.ConversationalObjectText}${conversationalObject}`; 
    }
}

export class ComponentsAttributes
{
    public static readonly FlowId:string = "data-flowid";
    public static readonly ElementType:string = "data-elementType";
    public static readonly ElmentTypeValue:string = "flow";
}

export class Controls{
    public static readonly FlowsContainer:string = "FlowsContainer";
}

export enum MoveType{
    Up,
    Down
}

export enum RenderingOptions
{
    Summary,
    Tall,
    Full
}

export class HintId
{
    public static TriggerMessages:string = "TriggerMessages";
    public static Responses:string = "Responses";
    public static UserInput:string = "UserInput";
    public static ConversationalObject: string = "ConversationalObject";
}

export class PropertiesDefinition
{
    public static readonly TriggerMessagesTitle:string = "Trigger Messages";
    public static readonly TriggerMessagesDescription:string = "Specifies the trigger messages for this flow. You can type multiple messages using the ';' delimiter";
    public static readonly TriggerMessagesLabel:string = "What's a Trigger Message?"

    public static readonly ResponseTitle:string = "Response";
    public static readonly ResponseDescription:string = "Any Flow of a Conversational instance has a Response. In the Response node, you can model the behavior after the Flow finishes its execution. \n The Response node can be left empty (which means that the Flow doesn't give any feedback to the end user after it finishes), or it can have Response Parameters and/or Messages children nodes.";
    public static readonly ResponseLabel:string = "What's a Response?"

    public static readonly UserInputTitle:string = "User Input";
    public static readonly UserInputDescription:string = "The User Input represents the input parameters of the Flow of a Conversational instance. \n That is, the different parameters that the chatbot will ask the user when it detects the intent related to the flow.";
    public static readonly UserInputLabel:string = "What's a User Input?"

    public static readonly ConversationalObjectTitle:string = "Conversational Object";
    public static readonly ConversationalObjectDescription:string = "GeneXus object that will resolve the flow’s action. In the case of web objects, it has to be a Web Component. It's called automatically after the User inputs are entered. If the Message of the Flow has a Component view Style, and the SD Component or Web Component property is set, you have to call the Conversational Flows object from the Start Event of the corresponding component.";
    public static readonly UConversationalObjectLabel:string = "What's a Conversational Object?"

    public static GetTitle(hintId:HintId):string
    {
        if (hintId == HintId.TriggerMessages)
            return this.TriggerMessagesTitle;
        if (hintId == HintId.Responses)
            return this.ResponseTitle;
        if (hintId == HintId.UserInput)
            return this.UserInputTitle;
            if (hintId == HintId.ConversationalObject)
            return this.ConversationalObjectTitle;
        return "";
    }

    public static GetDescription(hintId:HintId):string
    {
        if (hintId == HintId.TriggerMessages)
            return this.TriggerMessagesDescription;
        if (hintId == HintId.Responses)
            return this.ResponseDescription;
        if (hintId == HintId.UserInput)
            return this.UserInputDescription;
        if (hintId == HintId.ConversationalObject)
            return this.ConversationalObjectDescription;
        return "";
    }

    public static GetLabel(hintId:HintId):string
    {
        if (hintId == HintId.TriggerMessages)
            return this.TriggerMessagesLabel;
        if (hintId == HintId.Responses)
            return this.ResponseLabel;
        if (hintId == HintId.UserInput)
            return this.UserInputLabel;
        if (hintId == HintId.ConversationalObject)
            return this.UConversationalObjectLabel;
        return "";
    }
}