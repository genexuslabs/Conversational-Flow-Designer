interface External
{
    AddFlow: Function;
    MoveFlow(source:string, target:string, moveType:string): Function;
    ModifyFlowName(currentFlowName:string, newFlowName:string): Function;
    SelectConversationalObject(flowName:string): Promise<string>;
    ModifyFirstTriggerMessage(flowName:string, newFirstTriggerMessage:string): Function;
    LogError(errorMessage:string): Function;
    Log(logMessage:string): Function;
    LogWarning(warnMessage:string): Function;
    GetInstance(): Promise<any>;
    GXIDE(): boolean;
    SetTriggers(flowName:string, triggerMessages:string): Function;
}