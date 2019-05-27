function SetConversationalObject(flowName:string, conversationalObject:string)
{
    App.GetApp().Instance.SetConversationalObject(flowName, conversationalObject);
}

function InitializeInstance(instance:JSON)
{
    App.GetApp().Instance.InitializeInstance(instance);
}