class FlowElement extends ComponentElement
{    
    public ConversationalObject:string = "";
    public TriggerMessages:string[] = [];
    public Id:string = `Id${this.FormatName()}`;

    constructor(name:string)
    {
        super(name);
    }

    public GetSummaryTriggerMessage():string
    {
        if (this.TriggerMessages[0] != null)
        {
            return this.TriggerMessages[0];
        }
        return "";
    }

    public GetSummaryConversationalObject():string
    {
        if (this.ConversationalObject != null && this.ConversationalObject != "")
        {
            return this.ConversationalObject.toUpperCase();
        }
        return "NONE";
    }            
}