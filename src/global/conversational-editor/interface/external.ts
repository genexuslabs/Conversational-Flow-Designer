interface External {
  AddFlow: Function;
  MoveFlow(source: string, target: string, moveType: string): Function;
  ModifyFlowName(currentFlowName: string, newFlowName: string): Function;
  SelectConversationalObject(flowName: string): Promise<any>;
  LogError(errorMessage: string): Function;
  Log(logMessage: string): Function;
  LogWarning(warnMessage: string): Function;
  GetInstance(): Promise<any>;
  GXIDE(): boolean;
  SetTriggers(flowName: string, triggerMessages: string): Function;
  SetAskMessages(
    flowName: string,
    userInput: string,
    askMessages: string
  ): Function;
  ModifyUserInputName(
    flowName: string,
    currentUserInputName: string,
    newUserInputName: string
  ): Function;
  AddUserInput(flowName: string): Function;
  AddResponse(flowName: string): Function;
  SetErrorMessages(
    flowName: string,
    userInput: string,
    askMessages: string
  ): Function;
  SelectValidationProcedure(flowName: string, userInput: string): Promise<any>;
  SetUserInputRequiredCondition(
    flowName: string,
    userInput: string,
    newCondition: string
  ): Function;
  SetTryLimit(flowName: string, userInput: string, value: string): Function;
  AddNewRedirection(flowName: string, userInput: string): Function;
  SetRedirectionCondition(
    flowName: string,
    userInput: string,
    value: string,
    index: number
  ): Function;
  SetRedirectTo(
    flowName: string,
    userInput: string,
    value: string,
    index: number
  ): Function;
}
