import { RenderingOptions } from "../../helpers/Helpers";
import { FlowElement } from "./FlowElement";
import { IConversationalElement, CollectionType } from "./IConversationalElement";
import { EventHandler } from "../../EventHandler";

export class UserInputElement implements IConversationalElement
{                 
    public Variable:string;
    public IsCollection:boolean;
    public RequiredMessages: string[];
    public ErrorMessages: string[];
    public Entity: string;
    public DataType: string;
    public TryLimit: number;
    public AskAgain: boolean;
    public CleanInContext: boolean;
    public ValidationProcedure: string;
    public Required: RequiredTypes;
    public RequiredCondition: string;
    public RenderType:RenderingOptions;
    public Component:any;
    public Parent:FlowElement;

    public constructor (varName:string, isColl:boolean, reqMsgs:string[], errorMsgs:string[], entity:string, dataType:string, tryLimit:number, askAgain:boolean, clean:boolean, validationProc:string, reqType:string, reqCondition:string, parent:FlowElement)
    {
        this.Variable = varName;
        this.IsCollection = isColl;
        this.RequiredMessages = reqMsgs;
        this.ErrorMessages = errorMsgs;
        this.Entity = entity;
        this.DataType = dataType;
        this.TryLimit = tryLimit;
        this.AskAgain = askAgain;
        this.CleanInContext = clean;
        this.ValidationProcedure = validationProc;
        this.Required = RequiredTypes[reqType];
        this.RequiredCondition = reqCondition;
        this.RenderType = RenderingOptions.Summary;
        this.Parent = parent;
    }

    public GetFirstAskMessage():string
    {
        if (this.RequiredMessages.length > 0)
            return this.RequiredMessages[0];
        return "";
    }

    public SetRenderType(renderType:RenderingOptions)
    {
        this.RenderType = renderType;
    }

    public SetAskMessage(index:number, value:string)
    {
        this.RequiredMessages[index] = value;
        this.ExternalUpdateAskMessages();
    }

    public SetOnErrorMessage(index:number, value:string)
    {
        this.ErrorMessages[index] = value;
        this.ExternalUpdateErrorMessages();
    }

    public DeleteAskMessage(index:number)
    {
        if (this.RequiredMessages.length > index)
        {
            this.RequiredMessages.splice(index, 0);
            this.ExternalUpdateAskMessages();
        }
    }

    public DeleteOnErrorMessage(index:number)
    {
        if (this.ErrorMessages.length > index)
        {
            this.ErrorMessages.splice(index, 0);
            this.ExternalUpdateErrorMessages();
        }
    }

    private ExternalUpdateAskMessages()
    {
        if (window.external.SetAskMessages)
        {
            let messages:string = EventHandler.GetFormattedMessages(this.RequiredMessages);
            window.external.SetAskMessages(this.Parent.Name, this.Variable, messages);
        }
    }

    private ExternalUpdateErrorMessages()
    {
        if (window.external.SetErrorMessages)
        {
            let messages:string = EventHandler.GetFormattedMessages(this.ErrorMessages);
            window.external.SetErrorMessages(this.Parent.Name, this.Variable, messages);
        }
    }

    public SetItem(index:number, value:string, collectionType:CollectionType)
    {
        if (collectionType == CollectionType.AskMessages)
            this.SetAskMessage(index, value);
        else if (collectionType == CollectionType.OnErrorMessages)
            this.SetOnErrorMessage(index, value);

    }

    public DeleteItem(index: number, collectionType: CollectionType)
    {
        if (collectionType == CollectionType.AskMessages)
            this.DeleteAskMessage(index);
        else if (collectionType == CollectionType.OnErrorMessages)
            this.DeleteOnErrorMessage(index);
    } 

    public SetName(name:string)
    {
        let oldName = this.Variable;
        this.Variable = name;
        if (window.external.ModifyUserInputName)
            window.external.ModifyUserInputName(this.Parent.Name, oldName, this.Variable);
    } 

    public SetFirstAskMessage(value:string)
    {
        this.SetItem(0, value, CollectionType.AskMessages);
    } 

    public SetValidationProcedure(validationProcedure:string)
    {
        this.ValidationProcedure = validationProcedure;
    }
}

export enum RequiredTypes
{
    Always,
    Never,
    Condition
}