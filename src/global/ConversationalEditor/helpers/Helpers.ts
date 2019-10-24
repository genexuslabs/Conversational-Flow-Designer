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
}

export class PropertiesDefinition
{
    public static readonly TriggerMessagesTitle:string = "Trigger Messages";
    public static readonly TriggerMessagesDescription:string = "Specifies the trigger messages for this flow. You can type multiple messages using the ';' delimiter";

    public static GetTitle(hintId:HintId):string
    {
        if (hintId == HintId.TriggerMessages)
            return this.TriggerMessagesTitle;
        return "";
    }

    public static GetDescription(hintId:HintId):string
    {
        if (hintId == HintId.TriggerMessages)
            return this.TriggerMessagesDescription;
        return "";
    }

}