import { App } from "../App.js";
import { JSON } from "../instanceDefinition/Instance.js";

export function SetConversationalObject(flowName:string, conversationalObject:string)
{
    App.GetApp().Instance.SetConversationalObject(flowName, conversationalObject);
}

export function InitializeInstance(instance:JSON)
{
    App.GetApp().Instance.InitializeInstance(instance);
}