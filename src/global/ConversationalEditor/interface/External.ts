interface External
{
    AddFlow: Function;
    MoveFlow(source:string, target:string, moveType:string): Function;
    ModifyFlowName(currentFlowName:string, newFlowName:string): Function;
    SelectConversationalObject(flowName:string): Promise<any>;
    LogError(errorMessage:string): Function;
    Log(logMessage:string): Function;
    LogWarning(warnMessage:string): Function;
    GetInstance(): Promise<any>;
    GXIDE(): boolean;
    SetTriggers(flowName:string, triggerMessages:string): Function;
    SetAskMessages(flowName:string, userInput:string, askMessages:string): Function;
    ModifyUserInputName(flowName:string, currentUserInputName:string, newUserInputName:string): Function;
    AddUserInput(flowName:string):Function;
    AddResponse(flowName:string):Function;
}