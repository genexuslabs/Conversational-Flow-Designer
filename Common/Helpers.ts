class DragDropHelpers{
    public static readonly NoneEffect:string = "none";
    public static readonly MoveEffect:string = "move";
    public static readonly MoveDown:string = "Down";
    public static readonly UpPrefix:string = "GXUp_";
    public static readonly DownPrefix:string = "GXDown_";
}

class FlowElementHelpers{
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