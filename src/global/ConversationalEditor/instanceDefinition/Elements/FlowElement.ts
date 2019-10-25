import { RenderingOptions } from "../../helpers/Helpers";
import { UserInputElement} from "./UserInputElement";
import { ResponseElement } from "./ResponseElement";

export class FlowElement
{        
    public Name:string = "";
    public ConversationalObject:string = "";
    public TriggerMessages:string[] = [];    
    public Id:string = "";    
    public RenderType:RenderingOptions = RenderingOptions.Summary;
    public UserInputs: UserInputElement[];
    public Responses: ResponseElement[];

    constructor(name:string)
    {        
       this.Name = name;
       this.Id = `GXCF_Id${this.FormatName()}`;
       this.UserInputs = new Array<UserInputElement>();
       this.Responses = new Array<ResponseElement>();
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

    public AddUserInput(userInput:UserInputElement)
    {
        this.UserInputs.push(userInput);
    }

    public AddResponse(response:ResponseElement)
    {
        this.Responses.push(response);
    }
}