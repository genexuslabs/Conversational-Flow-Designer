import { RenderingOptions } from "../../helpers/Helpers";

export class UserInputElement
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

    public constructor (varName:string, isColl:boolean, reqMsgs:string[], errorMsgs:string[], entity:string, dataType:string, tryLimit:number, askAgain:boolean, clean:boolean, validationProc:string, reqType:string, reqCondition:string)
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
}

export enum RequiredTypes
{
    Always,
    Never,
    Condition
}