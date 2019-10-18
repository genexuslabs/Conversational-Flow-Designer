import { App } from "../App.js";

export function SetConversationalObject(flowName:string, conversationalObject:string)
{
    console.log("setCO");
    App.GetApp().Instance.SetConversationalObjectForFlow(flowName, conversationalObject);
}

export function InitializeInstance(instance:any)
{
    console.log("initialize");
    App.GetApp().Instance.InitializeInstance(instance);
}

function Test(){
    alert("test!!");
}