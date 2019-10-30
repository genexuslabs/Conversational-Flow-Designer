import { RenderingOptions } from "../../helpers/Helpers";
import { UserInputElement} from "./UserInputElement";
import { ResponseElement } from "./ResponseElement";
import { CustomJSON } from "../Instance";

export class FlowElement
{            
    public Name:string = "";
    public ConversationalObject:string = "";
    public TriggerMessages:string[] = [];    
    public Id:string = "";    
    public RenderType:RenderingOptions = RenderingOptions.Summary;
    public UserInputs: UserInputElement[];
    public Responses: ResponseElement[];
    public Component:any;
    public UserInputComponent:any;

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

    public AddUserInput(userInput:UserInputElement):void
    {
        this.UserInputs.push(userInput);
    }

    public AddResponse(response:ResponseElement):void
    {
        this.Responses.push(response);
    }

    public LoadFlow(jsonFlow:CustomJSON)
    {
        this.Name = jsonFlow.Name;
        this.Id = `GXCF_Id${this.FormatName()}`;
        this.UserInputs = new Array<UserInputElement>();
        this.Responses = new Array<ResponseElement>();
        this.TriggerMessages = new Array<string>();
        this.ConversationalObject = jsonFlow.ConversationalObjectName;  
        this.TriggerMessages = jsonFlow.Triggers; 
        jsonFlow.Fields.forEach(function(field)
        {
            let userInput:UserInputElement = new UserInputElement(field.Variable, field.IsCollection, field.RequiredMessages, field.ErrorMessages, field.Entity, field.DataType, field.TryLimit, field.AskAgain, field.CleanInContext, field.ValidationProcedure, field.Required, field.RequiredCondition);
            this.AddUserInput(userInput);
        }, this);
        jsonFlow.View.Templates.forEach(function(template)
        {
            console.log(JSON.stringify(template)); 
            let response:ResponseElement = new ResponseElement(template.Style, template.Format, template.ComponentType, template.WebComponent, template.SDComponent, template.Condition, template.RedirectTo);
            this.AddResponse(response);
        }, this);        
    }

    public SetRenderType(renderType: RenderingOptions)
    {
        this.RenderType = renderType;
        this.Component.refresh = !this.Component.refresh;
        
    }
}