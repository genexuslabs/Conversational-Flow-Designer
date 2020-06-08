declare namespace GXCFModel {
  export interface Instance {
    Flows: FlowElement[];
    SourceFlow: FlowElement;
    CurrentFlowName: string;
    CurrentUserInputName: string;
    CurrentResponseIndex: number;
  }

  export interface FlowElement {
    Name: string;
    ConversationalObjectName: string;
    Triggers: string[];
    Id: string;
    Fields: UserInputElement[];
    View: ViewElement;
    ConversationalObjectType: string;
  }

  export interface RedirectionProperty {
    RedirectCondition: string;
    RedirectTo: string;
    Index: number;
  }

  export interface ResponseElement {
    ResponseName: string;
    Style: string;
    Format: string[];
    ComponentType: string;
    WebComponentName: string;
    SDComponentName: string;
    Condition: string;
    RedirectTo: string;
    Index: number;
    SDComponentType: string;
    WebComponentType: string;
  }

  export interface UserInputElement {
    Variable: string;
    IsCollection: boolean;
    RequiredMessages: string[];
    ErrorMessages: string[];
    Entity: string;
    DataType: string;
    TryLimit: number;
    AskAgain: boolean;
    CleanInContext: boolean;
    ValidationProcedure: string;
    RequiredCondition: string;
    Parent: FlowElement;
    Redirections: RedirectionProperty[];
  }

  export interface ViewElement {
    Templates: ResponseElement[];
    Attributes: ResponseParametersElement[];
  }

  export interface ResponseParametersElement {
    Description: string;
    Variable: string;
  }
}
