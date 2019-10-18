import { RenderingOptions } from "../../helpers/Helpers";

export class FlowElement
{        
    public Name:string = "";
    public ConversationalObject:string = "";
    public TriggerMessages:string[] = [];    
    public Id:string = "";    
    public RenderType:RenderingOptions = RenderingOptions.Summary;

    constructor(name:string)
    {        
       this.Name = name;
       this.Id = `GXCF_Id${this.FormatName()}`;
    }

    public FormatName():string
    {
        return this.Name.replace(" ", "").replace(" ", "");
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
    
    public SetTrigger(index: number, newValue: string):void
    {
        if (this.TriggerMessages.length >= index)
            this.TriggerMessages[index] = newValue;
    }         
}