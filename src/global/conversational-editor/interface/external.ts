interface External {
  AddFlow: Function;
  MoveFlow(source: string, target: string, moveType: string): Function;
  ModifyFlowName(currentFlowName: string, newFlowName: string): Function;
  SelectConversationalObject(flowName: string): Promise<string>;
  LogError(errorMessage: string): Function;
  Log(logMessage: string): Function;
  LogWarning(warnMessage: string): Function;
  GetInstance(): Promise<string>;
  GXIDE(): boolean;
  SetTriggers(flowName: string, triggerMessages: string): Function;
  SetAskMessages(
    flowName: string,
    userInput: string,
    askMessages: string
  ): Function;
  SetResponseMessages(
    flowName: string,
    responseIndex: number,
    responseMessages: string
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
  SelectValidationProcedure(
    flowName: string,
    userInput: string
  ): Promise<string>;
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
  SetStyle(flowName: string, responseIndex: number, style: string): Function;
  SetResponseCondition(
    flowName: string,
    index: number,
    condition: string
  ): Function;
  SetResponseRedirectTo(
    flowName: string,
    index: number,
    redirectTo: string
  ): Function;
  SetComponentType(
    flowName: string,
    index: number,
    componentType: string
  ): Function;
}
