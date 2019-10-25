export class ResponseElement
{
    public Style:string;
    public Messages:string[];
    public ComponentType:string;
    public WebComponent:string;
    public SDComponent:string;
    public Condition:string;
    public RedirectTo:string;

    public constructor(style:string, messages:string[], componentType:string, webComponent:string, sdComponent:string, condition:string, redirectTo:string)
    {
        this.Style = style;
        this.Messages = messages;
        this.ComponentType = componentType;
        this.WebComponent = webComponent;
        this.SDComponent = sdComponent;
        this.Condition = condition;
        this.RedirectTo = redirectTo;
    } 
    
    public GetFristResponseMessage():string
    {
        if (this.Messages.length > 0)
            return this.Messages[0];
        return "";
    }
}