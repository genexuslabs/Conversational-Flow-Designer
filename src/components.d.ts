/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RenderingOptions, SelectTypes } from "./components/common/helpers";

export namespace Components {
  interface GxcfAddElement {}
  interface GxcfAddObject {
    addText: string;
  }
  interface GxcfButtonDelete {
    confirmationMessage: string;
    confirmationTitle: string;
  }
  interface GxcfCollection {
    collection: string[];
    collectionAddText: string;
    collectionHeader: string;
    collectionHintId: string;
    currentItemIndex: number;
    currentItemValue: string;
  }
  interface GxcfCondition {
    currentCondition: string;
  }
  interface GxcfConfirmation {
    confirmationMessage: string;
    confirmationTitle: string;
  }
  interface GxcfConnector {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  interface GxcfConversationalDesigner {
    instance: GXCFModel.Instance;
  }
  interface GxcfDesignerWelcome {}
  interface GxcfDot {}
  interface GxcfDownArrow {
    arrowid: string;
  }
  interface GxcfDropZone {
    Hide: () => Promise<void>;
    Show: () => Promise<void>;
    moveType: string;
    objectReferenceId: string;
    show: boolean;
  }
  interface GxcfFlowCollapsed {
    flow: GXCFModel.FlowElement;
    renderingType: RenderingOptions;
  }
  interface GxcfFlowContainer {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
    renderType: RenderingOptions;
    showDropZone: boolean;
  }
  interface GxcfFlowFull {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
  }
  interface GxcfHint {
    hintId: string;
  }
  interface GxcfRedirection {
    flows: GXCFModel.FlowElement[];
    redirectionIndex: number;
    redirectionProperty: GXCFModel.RedirectionProperty;
    requireCondition: boolean;
  }
  interface GxcfResponseCollapsed {
    response: GXCFModel.ResponseElement;
  }
  interface GxcfResponseContainer {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
    renderType: RenderingOptions;
    response: GXCFModel.ResponseElement;
    responseIndex: number;
  }
  interface GxcfResponseFull {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
    response: GXCFModel.ResponseElement;
    responseIndex: number;
  }
  interface GxcfSearch {}
  interface GxcfSelect {
    selectIconType: string;
    selectType: SelectTypes;
    selectcaption: string;
    selectid: string;
  }
  interface GxcfSummaryDescription {
    descriptionid: string;
    descriptionvalue: string;
  }
  interface GxcfSummaryTitle {
    classType: string;
    summaryid: string;
    summaryvalue: string;
  }
  interface GxcfUpArrow {
    arrowid: string;
  }
  interface GxcfUserInputCollapsed {
    userInput: GXCFModel.UserInputElement;
  }
  interface GxcfUserInputContainer {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
    renderType: RenderingOptions;
    userInput: GXCFModel.UserInputElement;
  }
  interface GxcfUserInputFull {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
    userInput: GXCFModel.UserInputElement;
  }
}

declare global {
  interface HTMLGxcfAddElementElement
    extends Components.GxcfAddElement,
      HTMLStencilElement {}
  var HTMLGxcfAddElementElement: {
    prototype: HTMLGxcfAddElementElement;
    new (): HTMLGxcfAddElementElement;
  };

  interface HTMLGxcfAddObjectElement
    extends Components.GxcfAddObject,
      HTMLStencilElement {}
  var HTMLGxcfAddObjectElement: {
    prototype: HTMLGxcfAddObjectElement;
    new (): HTMLGxcfAddObjectElement;
  };

  interface HTMLGxcfButtonDeleteElement
    extends Components.GxcfButtonDelete,
      HTMLStencilElement {}
  var HTMLGxcfButtonDeleteElement: {
    prototype: HTMLGxcfButtonDeleteElement;
    new (): HTMLGxcfButtonDeleteElement;
  };

  interface HTMLGxcfCollectionElement
    extends Components.GxcfCollection,
      HTMLStencilElement {}
  var HTMLGxcfCollectionElement: {
    prototype: HTMLGxcfCollectionElement;
    new (): HTMLGxcfCollectionElement;
  };

  interface HTMLGxcfConditionElement
    extends Components.GxcfCondition,
      HTMLStencilElement {}
  var HTMLGxcfConditionElement: {
    prototype: HTMLGxcfConditionElement;
    new (): HTMLGxcfConditionElement;
  };

  interface HTMLGxcfConfirmationElement
    extends Components.GxcfConfirmation,
      HTMLStencilElement {}
  var HTMLGxcfConfirmationElement: {
    prototype: HTMLGxcfConfirmationElement;
    new (): HTMLGxcfConfirmationElement;
  };

  interface HTMLGxcfConnectorElement
    extends Components.GxcfConnector,
      HTMLStencilElement {}
  var HTMLGxcfConnectorElement: {
    prototype: HTMLGxcfConnectorElement;
    new (): HTMLGxcfConnectorElement;
  };

  interface HTMLGxcfConversationalDesignerElement
    extends Components.GxcfConversationalDesigner,
      HTMLStencilElement {}
  var HTMLGxcfConversationalDesignerElement: {
    prototype: HTMLGxcfConversationalDesignerElement;
    new (): HTMLGxcfConversationalDesignerElement;
  };

  interface HTMLGxcfDesignerWelcomeElement
    extends Components.GxcfDesignerWelcome,
      HTMLStencilElement {}
  var HTMLGxcfDesignerWelcomeElement: {
    prototype: HTMLGxcfDesignerWelcomeElement;
    new (): HTMLGxcfDesignerWelcomeElement;
  };

  interface HTMLGxcfDotElement extends Components.GxcfDot, HTMLStencilElement {}
  var HTMLGxcfDotElement: {
    prototype: HTMLGxcfDotElement;
    new (): HTMLGxcfDotElement;
  };

  interface HTMLGxcfDownArrowElement
    extends Components.GxcfDownArrow,
      HTMLStencilElement {}
  var HTMLGxcfDownArrowElement: {
    prototype: HTMLGxcfDownArrowElement;
    new (): HTMLGxcfDownArrowElement;
  };

  interface HTMLGxcfDropZoneElement
    extends Components.GxcfDropZone,
      HTMLStencilElement {}
  var HTMLGxcfDropZoneElement: {
    prototype: HTMLGxcfDropZoneElement;
    new (): HTMLGxcfDropZoneElement;
  };

  interface HTMLGxcfFlowCollapsedElement
    extends Components.GxcfFlowCollapsed,
      HTMLStencilElement {}
  var HTMLGxcfFlowCollapsedElement: {
    prototype: HTMLGxcfFlowCollapsedElement;
    new (): HTMLGxcfFlowCollapsedElement;
  };

  interface HTMLGxcfFlowContainerElement
    extends Components.GxcfFlowContainer,
      HTMLStencilElement {}
  var HTMLGxcfFlowContainerElement: {
    prototype: HTMLGxcfFlowContainerElement;
    new (): HTMLGxcfFlowContainerElement;
  };

  interface HTMLGxcfFlowFullElement
    extends Components.GxcfFlowFull,
      HTMLStencilElement {}
  var HTMLGxcfFlowFullElement: {
    prototype: HTMLGxcfFlowFullElement;
    new (): HTMLGxcfFlowFullElement;
  };

  interface HTMLGxcfHintElement
    extends Components.GxcfHint,
      HTMLStencilElement {}
  var HTMLGxcfHintElement: {
    prototype: HTMLGxcfHintElement;
    new (): HTMLGxcfHintElement;
  };

  interface HTMLGxcfRedirectionElement
    extends Components.GxcfRedirection,
      HTMLStencilElement {}
  var HTMLGxcfRedirectionElement: {
    prototype: HTMLGxcfRedirectionElement;
    new (): HTMLGxcfRedirectionElement;
  };

  interface HTMLGxcfResponseCollapsedElement
    extends Components.GxcfResponseCollapsed,
      HTMLStencilElement {}
  var HTMLGxcfResponseCollapsedElement: {
    prototype: HTMLGxcfResponseCollapsedElement;
    new (): HTMLGxcfResponseCollapsedElement;
  };

  interface HTMLGxcfResponseContainerElement
    extends Components.GxcfResponseContainer,
      HTMLStencilElement {}
  var HTMLGxcfResponseContainerElement: {
    prototype: HTMLGxcfResponseContainerElement;
    new (): HTMLGxcfResponseContainerElement;
  };

  interface HTMLGxcfResponseFullElement
    extends Components.GxcfResponseFull,
      HTMLStencilElement {}
  var HTMLGxcfResponseFullElement: {
    prototype: HTMLGxcfResponseFullElement;
    new (): HTMLGxcfResponseFullElement;
  };

  interface HTMLGxcfSearchElement
    extends Components.GxcfSearch,
      HTMLStencilElement {}
  var HTMLGxcfSearchElement: {
    prototype: HTMLGxcfSearchElement;
    new (): HTMLGxcfSearchElement;
  };

  interface HTMLGxcfSelectElement
    extends Components.GxcfSelect,
      HTMLStencilElement {}
  var HTMLGxcfSelectElement: {
    prototype: HTMLGxcfSelectElement;
    new (): HTMLGxcfSelectElement;
  };

  interface HTMLGxcfSummaryDescriptionElement
    extends Components.GxcfSummaryDescription,
      HTMLStencilElement {}
  var HTMLGxcfSummaryDescriptionElement: {
    prototype: HTMLGxcfSummaryDescriptionElement;
    new (): HTMLGxcfSummaryDescriptionElement;
  };

  interface HTMLGxcfSummaryTitleElement
    extends Components.GxcfSummaryTitle,
      HTMLStencilElement {}
  var HTMLGxcfSummaryTitleElement: {
    prototype: HTMLGxcfSummaryTitleElement;
    new (): HTMLGxcfSummaryTitleElement;
  };

  interface HTMLGxcfUpArrowElement
    extends Components.GxcfUpArrow,
      HTMLStencilElement {}
  var HTMLGxcfUpArrowElement: {
    prototype: HTMLGxcfUpArrowElement;
    new (): HTMLGxcfUpArrowElement;
  };

  interface HTMLGxcfUserInputCollapsedElement
    extends Components.GxcfUserInputCollapsed,
      HTMLStencilElement {}
  var HTMLGxcfUserInputCollapsedElement: {
    prototype: HTMLGxcfUserInputCollapsedElement;
    new (): HTMLGxcfUserInputCollapsedElement;
  };

  interface HTMLGxcfUserInputContainerElement
    extends Components.GxcfUserInputContainer,
      HTMLStencilElement {}
  var HTMLGxcfUserInputContainerElement: {
    prototype: HTMLGxcfUserInputContainerElement;
    new (): HTMLGxcfUserInputContainerElement;
  };

  interface HTMLGxcfUserInputFullElement
    extends Components.GxcfUserInputFull,
      HTMLStencilElement {}
  var HTMLGxcfUserInputFullElement: {
    prototype: HTMLGxcfUserInputFullElement;
    new (): HTMLGxcfUserInputFullElement;
  };
  interface HTMLElementTagNameMap {
    "gxcf-add-element": HTMLGxcfAddElementElement;
    "gxcf-add-object": HTMLGxcfAddObjectElement;
    "gxcf-button-delete": HTMLGxcfButtonDeleteElement;
    "gxcf-collection": HTMLGxcfCollectionElement;
    "gxcf-condition": HTMLGxcfConditionElement;
    "gxcf-confirmation": HTMLGxcfConfirmationElement;
    "gxcf-connector": HTMLGxcfConnectorElement;
    "gxcf-conversational-designer": HTMLGxcfConversationalDesignerElement;
    "gxcf-designer-welcome": HTMLGxcfDesignerWelcomeElement;
    "gxcf-dot": HTMLGxcfDotElement;
    "gxcf-down-arrow": HTMLGxcfDownArrowElement;
    "gxcf-drop-zone": HTMLGxcfDropZoneElement;
    "gxcf-flow-collapsed": HTMLGxcfFlowCollapsedElement;
    "gxcf-flow-container": HTMLGxcfFlowContainerElement;
    "gxcf-flow-full": HTMLGxcfFlowFullElement;
    "gxcf-hint": HTMLGxcfHintElement;
    "gxcf-redirection": HTMLGxcfRedirectionElement;
    "gxcf-response-collapsed": HTMLGxcfResponseCollapsedElement;
    "gxcf-response-container": HTMLGxcfResponseContainerElement;
    "gxcf-response-full": HTMLGxcfResponseFullElement;
    "gxcf-search": HTMLGxcfSearchElement;
    "gxcf-select": HTMLGxcfSelectElement;
    "gxcf-summary-description": HTMLGxcfSummaryDescriptionElement;
    "gxcf-summary-title": HTMLGxcfSummaryTitleElement;
    "gxcf-up-arrow": HTMLGxcfUpArrowElement;
    "gxcf-user-input-collapsed": HTMLGxcfUserInputCollapsedElement;
    "gxcf-user-input-container": HTMLGxcfUserInputContainerElement;
    "gxcf-user-input-full": HTMLGxcfUserInputFullElement;
  }
}

declare namespace LocalJSX {
  interface GxcfAddElement {}
  interface GxcfAddObject {
    addText?: string;
    onAddObject?: (event: CustomEvent<any>) => void;
  }
  interface GxcfButtonDelete {
    confirmationMessage?: string;
    confirmationTitle?: string;
    onConfirmDelete?: (event: CustomEvent<any>) => void;
  }
  interface GxcfCollection {
    collection?: string[];
    collectionAddText?: string;
    collectionHeader?: string;
    collectionHintId?: string;
    currentItemIndex?: number;
    currentItemValue?: string;
    onDeleteItem?: (event: CustomEvent<any>) => void;
    onEditItem?: (event: CustomEvent<any>) => void;
  }
  interface GxcfCondition {
    currentCondition?: string;
    onConditionChange?: (event: CustomEvent<any>) => void;
  }
  interface GxcfConfirmation {
    confirmationMessage?: string;
    confirmationTitle?: string;
    onUserCancellation?: (event: CustomEvent<any>) => void;
    onUserConfirmation?: (event: CustomEvent<any>) => void;
  }
  interface GxcfConnector {
    sourceX?: number;
    sourceY?: number;
    targetX?: number;
    targetY?: number;
  }
  interface GxcfConversationalDesigner {
    instance?: GXCFModel.Instance;
    onAddFlow?: (event: CustomEvent<any>) => void;
    onMoveFlow?: (event: CustomEvent<any>) => void;
  }
  interface GxcfDesignerWelcome {
    onOpenEditor?: (event: CustomEvent<any>) => void;
  }
  interface GxcfDot {}
  interface GxcfDownArrow {
    arrowid?: string;
  }
  interface GxcfDropZone {
    moveType?: string;
    objectReferenceId?: string;
    onDropOnDropZone?: (event: CustomEvent<any>) => void;
    show?: boolean;
  }
  interface GxcfFlowCollapsed {
    flow?: GXCFModel.FlowElement;
    onExpandFlow?: (event: CustomEvent<any>) => void;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
    renderingType?: RenderingOptions;
  }
  interface GxcfFlowContainer {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onDeleteFlow?: (event: CustomEvent<any>) => void;
    onModifyFlowName?: (event: CustomEvent<any>) => void;
    onSetTriggers?: (event: CustomEvent<any>) => void;
    renderType?: RenderingOptions;
    showDropZone?: boolean;
  }
  interface GxcfFlowFull {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onAddResponse?: (event: CustomEvent<any>) => void;
    onAddUserInput?: (event: CustomEvent<any>) => void;
    onCollapseFlow?: (event: CustomEvent<any>) => void;
    onDeleteFullFlow?: (event: CustomEvent<any>) => void;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
    onSetTriggers?: (event: CustomEvent<any>) => void;
  }
  interface GxcfHint {
    hintId?: string;
  }
  interface GxcfRedirection {
    flows?: GXCFModel.FlowElement[];
    onChangeRedirectCondition?: (event: CustomEvent<any>) => void;
    onChangeRedirectTo?: (event: CustomEvent<any>) => void;
    redirectionIndex?: number;
    redirectionProperty?: GXCFModel.RedirectionProperty;
    requireCondition?: boolean;
  }
  interface GxcfResponseCollapsed {
    onChangeResponseName?: (event: CustomEvent<any>) => void;
    onExpandResponse?: (event: CustomEvent<any>) => void;
    onSetResponseMessagesInternal?: (event: CustomEvent<any>) => void;
    response?: GXCFModel.ResponseElement;
  }
  interface GxcfResponseContainer {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onChangeResponseName?: (event: CustomEvent<any>) => void;
    onCollapseResponseOut?: (event: CustomEvent<any>) => void;
    onDeleteResponse?: (event: CustomEvent<any>) => void;
    onExpandResponseOut?: (event: CustomEvent<any>) => void;
    onSetResponseMessages?: (event: CustomEvent<any>) => void;
    renderType?: RenderingOptions;
    response?: GXCFModel.ResponseElement;
    responseIndex?: number;
  }
  interface GxcfResponseFull {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onChangeComponentType?: (event: CustomEvent<any>) => void;
    onChangeResponseCondition?: (event: CustomEvent<any>) => void;
    onChangeResponseName?: (event: CustomEvent<any>) => void;
    onChangeResponseRedirectTo?: (event: CustomEvent<any>) => void;
    onChangeResponseStyle?: (event: CustomEvent<any>) => void;
    onChangeSDComponent?: (event: CustomEvent<any>) => void;
    onChangeWebComponent?: (event: CustomEvent<any>) => void;
    onCollapseResponse?: (event: CustomEvent<any>) => void;
    onDeleteResponseFull?: (event: CustomEvent<any>) => void;
    onSetResponseMessagesInternal?: (event: CustomEvent<any>) => void;
    response?: GXCFModel.ResponseElement;
    responseIndex?: number;
  }
  interface GxcfSearch {
    onSearch?: (event: CustomEvent<any>) => void;
  }
  interface GxcfSelect {
    selectIconType?: string;
    selectType?: SelectTypes;
    selectcaption?: string;
    selectid?: string;
  }
  interface GxcfSummaryDescription {
    descriptionid?: string;
    descriptionvalue?: string;
    onChangingFlowTriggerSummary?: (event: CustomEvent<any>) => void;
  }
  interface GxcfSummaryTitle {
    classType?: string;
    onChangingFlowName?: (event: CustomEvent<any>) => void;
    summaryid?: string;
    summaryvalue?: string;
  }
  interface GxcfUpArrow {
    arrowid?: string;
  }
  interface GxcfUserInputCollapsed {
    onExpandUserInput?: (event: CustomEvent<any>) => void;
    onModifyUserInputFirstAskMessage?: (event: CustomEvent<any>) => void;
    onModifyUserInputName?: (event: CustomEvent<any>) => void;
    userInput?: GXCFModel.UserInputElement;
  }
  interface GxcfUserInputContainer {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onCollapseUserInputOut?: (event: CustomEvent<any>) => void;
    onDeleteUserInput?: (event: CustomEvent<any>) => void;
    onExpandUserInputOut?: (event: CustomEvent<any>) => void;
    onSetAskMessages?: (event: CustomEvent<any>) => void;
    onSetUserInputName?: (event: CustomEvent<any>) => void;
    renderType?: RenderingOptions;
    userInput?: GXCFModel.UserInputElement;
  }
  interface GxcfUserInputFull {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onAddRedirection?: (event: CustomEvent<any>) => void;
    onChangeCondition?: (event: CustomEvent<any>) => void;
    onChangeTryLimit?: (event: CustomEvent<any>) => void;
    onChangeUserInputRedirectCondition?: (event: CustomEvent<any>) => void;
    onChangeUserInputRedirectTo?: (event: CustomEvent<any>) => void;
    onCollapseUserInput?: (event: CustomEvent<any>) => void;
    onDeleteUserInputFull?: (event: CustomEvent<any>) => void;
    onModifyUserInputName?: (event: CustomEvent<any>) => void;
    onSelectValidationProcedure?: (event: CustomEvent<any>) => void;
    onSetAskMessages?: (event: CustomEvent<any>) => void;
    onSetOnErrorMessages?: (event: CustomEvent<any>) => void;
    userInput?: GXCFModel.UserInputElement;
  }

  interface IntrinsicElements {
    "gxcf-add-element": GxcfAddElement;
    "gxcf-add-object": GxcfAddObject;
    "gxcf-button-delete": GxcfButtonDelete;
    "gxcf-collection": GxcfCollection;
    "gxcf-condition": GxcfCondition;
    "gxcf-confirmation": GxcfConfirmation;
    "gxcf-connector": GxcfConnector;
    "gxcf-conversational-designer": GxcfConversationalDesigner;
    "gxcf-designer-welcome": GxcfDesignerWelcome;
    "gxcf-dot": GxcfDot;
    "gxcf-down-arrow": GxcfDownArrow;
    "gxcf-drop-zone": GxcfDropZone;
    "gxcf-flow-collapsed": GxcfFlowCollapsed;
    "gxcf-flow-container": GxcfFlowContainer;
    "gxcf-flow-full": GxcfFlowFull;
    "gxcf-hint": GxcfHint;
    "gxcf-redirection": GxcfRedirection;
    "gxcf-response-collapsed": GxcfResponseCollapsed;
    "gxcf-response-container": GxcfResponseContainer;
    "gxcf-response-full": GxcfResponseFull;
    "gxcf-search": GxcfSearch;
    "gxcf-select": GxcfSelect;
    "gxcf-summary-description": GxcfSummaryDescription;
    "gxcf-summary-title": GxcfSummaryTitle;
    "gxcf-up-arrow": GxcfUpArrow;
    "gxcf-user-input-collapsed": GxcfUserInputCollapsed;
    "gxcf-user-input-container": GxcfUserInputContainer;
    "gxcf-user-input-full": GxcfUserInputFull;
  }
}

export { LocalJSX as JSX };

declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "gxcf-add-element": LocalJSX.GxcfAddElement &
        JSXBase.HTMLAttributes<HTMLGxcfAddElementElement>;
      "gxcf-add-object": LocalJSX.GxcfAddObject &
        JSXBase.HTMLAttributes<HTMLGxcfAddObjectElement>;
      "gxcf-button-delete": LocalJSX.GxcfButtonDelete &
        JSXBase.HTMLAttributes<HTMLGxcfButtonDeleteElement>;
      "gxcf-collection": LocalJSX.GxcfCollection &
        JSXBase.HTMLAttributes<HTMLGxcfCollectionElement>;
      "gxcf-condition": LocalJSX.GxcfCondition &
        JSXBase.HTMLAttributes<HTMLGxcfConditionElement>;
      "gxcf-confirmation": LocalJSX.GxcfConfirmation &
        JSXBase.HTMLAttributes<HTMLGxcfConfirmationElement>;
      "gxcf-connector": LocalJSX.GxcfConnector &
        JSXBase.HTMLAttributes<HTMLGxcfConnectorElement>;
      "gxcf-conversational-designer": LocalJSX.GxcfConversationalDesigner &
        JSXBase.HTMLAttributes<HTMLGxcfConversationalDesignerElement>;
      "gxcf-designer-welcome": LocalJSX.GxcfDesignerWelcome &
        JSXBase.HTMLAttributes<HTMLGxcfDesignerWelcomeElement>;
      "gxcf-dot": LocalJSX.GxcfDot & JSXBase.HTMLAttributes<HTMLGxcfDotElement>;
      "gxcf-down-arrow": LocalJSX.GxcfDownArrow &
        JSXBase.HTMLAttributes<HTMLGxcfDownArrowElement>;
      "gxcf-drop-zone": LocalJSX.GxcfDropZone &
        JSXBase.HTMLAttributes<HTMLGxcfDropZoneElement>;
      "gxcf-flow-collapsed": LocalJSX.GxcfFlowCollapsed &
        JSXBase.HTMLAttributes<HTMLGxcfFlowCollapsedElement>;
      "gxcf-flow-container": LocalJSX.GxcfFlowContainer &
        JSXBase.HTMLAttributes<HTMLGxcfFlowContainerElement>;
      "gxcf-flow-full": LocalJSX.GxcfFlowFull &
        JSXBase.HTMLAttributes<HTMLGxcfFlowFullElement>;
      "gxcf-hint": LocalJSX.GxcfHint &
        JSXBase.HTMLAttributes<HTMLGxcfHintElement>;
      "gxcf-redirection": LocalJSX.GxcfRedirection &
        JSXBase.HTMLAttributes<HTMLGxcfRedirectionElement>;
      "gxcf-response-collapsed": LocalJSX.GxcfResponseCollapsed &
        JSXBase.HTMLAttributes<HTMLGxcfResponseCollapsedElement>;
      "gxcf-response-container": LocalJSX.GxcfResponseContainer &
        JSXBase.HTMLAttributes<HTMLGxcfResponseContainerElement>;
      "gxcf-response-full": LocalJSX.GxcfResponseFull &
        JSXBase.HTMLAttributes<HTMLGxcfResponseFullElement>;
      "gxcf-search": LocalJSX.GxcfSearch &
        JSXBase.HTMLAttributes<HTMLGxcfSearchElement>;
      "gxcf-select": LocalJSX.GxcfSelect &
        JSXBase.HTMLAttributes<HTMLGxcfSelectElement>;
      "gxcf-summary-description": LocalJSX.GxcfSummaryDescription &
        JSXBase.HTMLAttributes<HTMLGxcfSummaryDescriptionElement>;
      "gxcf-summary-title": LocalJSX.GxcfSummaryTitle &
        JSXBase.HTMLAttributes<HTMLGxcfSummaryTitleElement>;
      "gxcf-up-arrow": LocalJSX.GxcfUpArrow &
        JSXBase.HTMLAttributes<HTMLGxcfUpArrowElement>;
      "gxcf-user-input-collapsed": LocalJSX.GxcfUserInputCollapsed &
        JSXBase.HTMLAttributes<HTMLGxcfUserInputCollapsedElement>;
      "gxcf-user-input-container": LocalJSX.GxcfUserInputContainer &
        JSXBase.HTMLAttributes<HTMLGxcfUserInputContainerElement>;
      "gxcf-user-input-full": LocalJSX.GxcfUserInputFull &
        JSXBase.HTMLAttributes<HTMLGxcfUserInputFullElement>;
    }
  }
}
