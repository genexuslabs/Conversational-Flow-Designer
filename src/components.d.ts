/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { UserInputElement } from "./global/conversational-editor/instance-definition/elements/user-input-element";
import { RedirectionProperty } from "./global/conversational-editor/instance-definition/elements/redirection-property";
import { FlowElement } from "./global/conversational-editor/instance-definition/elements/flow-element";
import { RenderingOptions } from "./global/conversational-editor/helpers/helpers";
import { ResponseElement } from "./global/conversational-editor/instance-definition/elements/response-element";

export namespace Components {
  interface AddElement {}
  interface AddObject {
    collectionAddText: string;
  }
  interface ConversationalDesigner {}
  interface ConversationalObject {
    conversationalObject: string;
  }
  interface CustomCollection {
    collection: string[];
    collectionAddText: string;
    collectionHeader: string;
    collectionHintId: string;
    collectionType: any;
    currentItemIndex: number;
    currentItemValue: string;
    itemParent: any;
  }
  interface CustomCondition {
    currentCondition: string;
    onConditionChange: Function;
  }
  interface CustomHint {
    hintId: string;
  }
  interface CustomRedirection {
    redirectionProperty: RedirectionProperty;
    userInput: UserInputElement;
  }
  interface CustomSelect {
    selectcaption: string;
    selectid: string;
  }
  interface DesignerWelcome {}
  interface DownArrow {
    arrowid: string;
  }
  interface DropZone {
    moveType: string;
    objectReferenceId: string;
    show: boolean;
  }
  interface FlowCollapsed {
    flow: FlowElement;
    renderingType: RenderingOptions;
  }
  interface FlowContainer {
    flow: FlowElement;
    showDropZone: boolean;
  }
  interface FlowFull {
    flow: FlowElement;
  }
  interface ResponseCollapsed {
    response: ResponseElement;
  }
  interface SummaryDescription {
    descriptionid: string;
    descriptionvalue: string;
  }
  interface SummaryTitle {
    classType: string;
    summaryid: string;
    summaryvalue: string;
  }
  interface UpArrow {
    arrowid: string;
  }
  interface UserInputCollapsed {
    userInput: UserInputElement;
  }
  interface UserInputContainer {
    flow: FlowElement;
    userInput: UserInputElement;
  }
  interface UserInputFull {
    flow: FlowElement;
    userInput: UserInputElement;
  }
}

declare global {
  interface HTMLAddElementElement
    extends Components.AddElement,
      HTMLStencilElement {}
  var HTMLAddElementElement: {
    prototype: HTMLAddElementElement;
    new (): HTMLAddElementElement;
  };

  interface HTMLAddObjectElement
    extends Components.AddObject,
      HTMLStencilElement {}
  var HTMLAddObjectElement: {
    prototype: HTMLAddObjectElement;
    new (): HTMLAddObjectElement;
  };

  interface HTMLConversationalDesignerElement
    extends Components.ConversationalDesigner,
      HTMLStencilElement {}
  var HTMLConversationalDesignerElement: {
    prototype: HTMLConversationalDesignerElement;
    new (): HTMLConversationalDesignerElement;
  };

  interface HTMLConversationalObjectElement
    extends Components.ConversationalObject,
      HTMLStencilElement {}
  var HTMLConversationalObjectElement: {
    prototype: HTMLConversationalObjectElement;
    new (): HTMLConversationalObjectElement;
  };

  interface HTMLCustomCollectionElement
    extends Components.CustomCollection,
      HTMLStencilElement {}
  var HTMLCustomCollectionElement: {
    prototype: HTMLCustomCollectionElement;
    new (): HTMLCustomCollectionElement;
  };

  interface HTMLCustomConditionElement
    extends Components.CustomCondition,
      HTMLStencilElement {}
  var HTMLCustomConditionElement: {
    prototype: HTMLCustomConditionElement;
    new (): HTMLCustomConditionElement;
  };

  interface HTMLCustomHintElement
    extends Components.CustomHint,
      HTMLStencilElement {}
  var HTMLCustomHintElement: {
    prototype: HTMLCustomHintElement;
    new (): HTMLCustomHintElement;
  };

  interface HTMLCustomRedirectionElement
    extends Components.CustomRedirection,
      HTMLStencilElement {}
  var HTMLCustomRedirectionElement: {
    prototype: HTMLCustomRedirectionElement;
    new (): HTMLCustomRedirectionElement;
  };

  interface HTMLCustomSelectElement
    extends Components.CustomSelect,
      HTMLStencilElement {}
  var HTMLCustomSelectElement: {
    prototype: HTMLCustomSelectElement;
    new (): HTMLCustomSelectElement;
  };

  interface HTMLDesignerWelcomeElement
    extends Components.DesignerWelcome,
      HTMLStencilElement {}
  var HTMLDesignerWelcomeElement: {
    prototype: HTMLDesignerWelcomeElement;
    new (): HTMLDesignerWelcomeElement;
  };

  interface HTMLDownArrowElement
    extends Components.DownArrow,
      HTMLStencilElement {}
  var HTMLDownArrowElement: {
    prototype: HTMLDownArrowElement;
    new (): HTMLDownArrowElement;
  };

  interface HTMLDropZoneElement
    extends Components.DropZone,
      HTMLStencilElement {}
  var HTMLDropZoneElement: {
    prototype: HTMLDropZoneElement;
    new (): HTMLDropZoneElement;
  };

  interface HTMLFlowCollapsedElement
    extends Components.FlowCollapsed,
      HTMLStencilElement {}
  var HTMLFlowCollapsedElement: {
    prototype: HTMLFlowCollapsedElement;
    new (): HTMLFlowCollapsedElement;
  };

  interface HTMLFlowContainerElement
    extends Components.FlowContainer,
      HTMLStencilElement {}
  var HTMLFlowContainerElement: {
    prototype: HTMLFlowContainerElement;
    new (): HTMLFlowContainerElement;
  };

  interface HTMLFlowFullElement
    extends Components.FlowFull,
      HTMLStencilElement {}
  var HTMLFlowFullElement: {
    prototype: HTMLFlowFullElement;
    new (): HTMLFlowFullElement;
  };

  interface HTMLResponseCollapsedElement
    extends Components.ResponseCollapsed,
      HTMLStencilElement {}
  var HTMLResponseCollapsedElement: {
    prototype: HTMLResponseCollapsedElement;
    new (): HTMLResponseCollapsedElement;
  };

  interface HTMLSummaryDescriptionElement
    extends Components.SummaryDescription,
      HTMLStencilElement {}
  var HTMLSummaryDescriptionElement: {
    prototype: HTMLSummaryDescriptionElement;
    new (): HTMLSummaryDescriptionElement;
  };

  interface HTMLSummaryTitleElement
    extends Components.SummaryTitle,
      HTMLStencilElement {}
  var HTMLSummaryTitleElement: {
    prototype: HTMLSummaryTitleElement;
    new (): HTMLSummaryTitleElement;
  };

  interface HTMLUpArrowElement extends Components.UpArrow, HTMLStencilElement {}
  var HTMLUpArrowElement: {
    prototype: HTMLUpArrowElement;
    new (): HTMLUpArrowElement;
  };

  interface HTMLUserInputCollapsedElement
    extends Components.UserInputCollapsed,
      HTMLStencilElement {}
  var HTMLUserInputCollapsedElement: {
    prototype: HTMLUserInputCollapsedElement;
    new (): HTMLUserInputCollapsedElement;
  };

  interface HTMLUserInputContainerElement
    extends Components.UserInputContainer,
      HTMLStencilElement {}
  var HTMLUserInputContainerElement: {
    prototype: HTMLUserInputContainerElement;
    new (): HTMLUserInputContainerElement;
  };

  interface HTMLUserInputFullElement
    extends Components.UserInputFull,
      HTMLStencilElement {}
  var HTMLUserInputFullElement: {
    prototype: HTMLUserInputFullElement;
    new (): HTMLUserInputFullElement;
  };
  interface HTMLElementTagNameMap {
    "add-element": HTMLAddElementElement;
    "add-object": HTMLAddObjectElement;
    "conversational-designer": HTMLConversationalDesignerElement;
    "conversational-object": HTMLConversationalObjectElement;
    "custom-collection": HTMLCustomCollectionElement;
    "custom-condition": HTMLCustomConditionElement;
    "custom-hint": HTMLCustomHintElement;
    "custom-redirection": HTMLCustomRedirectionElement;
    "custom-select": HTMLCustomSelectElement;
    "designer-welcome": HTMLDesignerWelcomeElement;
    "down-arrow": HTMLDownArrowElement;
    "drop-zone": HTMLDropZoneElement;
    "flow-collapsed": HTMLFlowCollapsedElement;
    "flow-container": HTMLFlowContainerElement;
    "flow-full": HTMLFlowFullElement;
    "response-collapsed": HTMLResponseCollapsedElement;
    "summary-description": HTMLSummaryDescriptionElement;
    "summary-title": HTMLSummaryTitleElement;
    "up-arrow": HTMLUpArrowElement;
    "user-input-collapsed": HTMLUserInputCollapsedElement;
    "user-input-container": HTMLUserInputContainerElement;
    "user-input-full": HTMLUserInputFullElement;
  }
}

declare namespace LocalJSX {
  interface AddElement {}
  interface AddObject {
    collectionAddText?: string;
    onAddObject?: (event: CustomEvent<any>) => void;
  }
  interface ConversationalDesigner {}
  interface ConversationalObject {
    conversationalObject?: string;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
  }
  interface CustomCollection {
    collection?: string[];
    collectionAddText?: string;
    collectionHeader?: string;
    collectionHintId?: string;
    collectionType?: any;
    currentItemIndex?: number;
    currentItemValue?: string;
    itemParent?: any;
  }
  interface CustomCondition {
    currentCondition?: string;
    onConditionChange?: Function;
  }
  interface CustomHint {
    hintId?: string;
    onHideHint?: (event: CustomEvent<any>) => void;
    onShowHint?: (event: CustomEvent<any>) => void;
  }
  interface CustomRedirection {
    redirectionProperty?: RedirectionProperty;
    userInput?: UserInputElement;
  }
  interface CustomSelect {
    selectcaption?: string;
    selectid?: string;
  }
  interface DesignerWelcome {
    onOpenEditor?: (event: CustomEvent<any>) => void;
  }
  interface DownArrow {
    arrowid?: string;
  }
  interface DropZone {
    moveType?: string;
    objectReferenceId?: string;
    onDropOnDropZone?: (event: CustomEvent<any>) => void;
    onOnDragLeaveDropZone?: (event: CustomEvent<any>) => void;
    onOnDragOverDropZone?: (event: CustomEvent<any>) => void;
    show?: boolean;
  }
  interface FlowCollapsed {
    flow?: FlowElement;
    onOnDragOverFlow?: (event: CustomEvent<any>) => void;
    onOnExpandFlow?: (event: CustomEvent<any>) => void;
    onOnFlowDragStart?: (event: CustomEvent<any>) => void;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
    renderingType?: RenderingOptions;
  }
  interface FlowContainer {
    flow?: FlowElement;
    showDropZone?: boolean;
  }
  interface FlowFull {
    flow?: FlowElement;
    onOnCollapseFlow?: (event: CustomEvent<any>) => void;
  }
  interface ResponseCollapsed {
    response?: ResponseElement;
  }
  interface SummaryDescription {
    descriptionid?: string;
    descriptionvalue?: string;
    onChangingFlowTriggerSummary?: (event: CustomEvent<any>) => void;
  }
  interface SummaryTitle {
    classType?: string;
    onChangingFlowName?: (event: CustomEvent<any>) => void;
    summaryid?: string;
    summaryvalue?: string;
  }
  interface UpArrow {
    arrowid?: string;
  }
  interface UserInputCollapsed {
    onOnExpandUserInput?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputFirstAskMessage?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputName?: (event: CustomEvent<any>) => void;
    userInput?: UserInputElement;
  }
  interface UserInputContainer {
    flow?: FlowElement;
    userInput?: UserInputElement;
  }
  interface UserInputFull {
    flow?: FlowElement;
    onOnCollapseUserInput?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputName?: (event: CustomEvent<any>) => void;
    userInput?: UserInputElement;
  }

  interface IntrinsicElements {
    "add-element": AddElement;
    "add-object": AddObject;
    "conversational-designer": ConversationalDesigner;
    "conversational-object": ConversationalObject;
    "custom-collection": CustomCollection;
    "custom-condition": CustomCondition;
    "custom-hint": CustomHint;
    "custom-redirection": CustomRedirection;
    "custom-select": CustomSelect;
    "designer-welcome": DesignerWelcome;
    "down-arrow": DownArrow;
    "drop-zone": DropZone;
    "flow-collapsed": FlowCollapsed;
    "flow-container": FlowContainer;
    "flow-full": FlowFull;
    "response-collapsed": ResponseCollapsed;
    "summary-description": SummaryDescription;
    "summary-title": SummaryTitle;
    "up-arrow": UpArrow;
    "user-input-collapsed": UserInputCollapsed;
    "user-input-container": UserInputContainer;
    "user-input-full": UserInputFull;
  }
}

export { LocalJSX as JSX };

declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "add-element": LocalJSX.AddElement &
        JSXBase.HTMLAttributes<HTMLAddElementElement>;
      "add-object": LocalJSX.AddObject &
        JSXBase.HTMLAttributes<HTMLAddObjectElement>;
      "conversational-designer": LocalJSX.ConversationalDesigner &
        JSXBase.HTMLAttributes<HTMLConversationalDesignerElement>;
      "conversational-object": LocalJSX.ConversationalObject &
        JSXBase.HTMLAttributes<HTMLConversationalObjectElement>;
      "custom-collection": LocalJSX.CustomCollection &
        JSXBase.HTMLAttributes<HTMLCustomCollectionElement>;
      "custom-condition": LocalJSX.CustomCondition &
        JSXBase.HTMLAttributes<HTMLCustomConditionElement>;
      "custom-hint": LocalJSX.CustomHint &
        JSXBase.HTMLAttributes<HTMLCustomHintElement>;
      "custom-redirection": LocalJSX.CustomRedirection &
        JSXBase.HTMLAttributes<HTMLCustomRedirectionElement>;
      "custom-select": LocalJSX.CustomSelect &
        JSXBase.HTMLAttributes<HTMLCustomSelectElement>;
      "designer-welcome": LocalJSX.DesignerWelcome &
        JSXBase.HTMLAttributes<HTMLDesignerWelcomeElement>;
      "down-arrow": LocalJSX.DownArrow &
        JSXBase.HTMLAttributes<HTMLDownArrowElement>;
      "drop-zone": LocalJSX.DropZone &
        JSXBase.HTMLAttributes<HTMLDropZoneElement>;
      "flow-collapsed": LocalJSX.FlowCollapsed &
        JSXBase.HTMLAttributes<HTMLFlowCollapsedElement>;
      "flow-container": LocalJSX.FlowContainer &
        JSXBase.HTMLAttributes<HTMLFlowContainerElement>;
      "flow-full": LocalJSX.FlowFull &
        JSXBase.HTMLAttributes<HTMLFlowFullElement>;
      "response-collapsed": LocalJSX.ResponseCollapsed &
        JSXBase.HTMLAttributes<HTMLResponseCollapsedElement>;
      "summary-description": LocalJSX.SummaryDescription &
        JSXBase.HTMLAttributes<HTMLSummaryDescriptionElement>;
      "summary-title": LocalJSX.SummaryTitle &
        JSXBase.HTMLAttributes<HTMLSummaryTitleElement>;
      "up-arrow": LocalJSX.UpArrow & JSXBase.HTMLAttributes<HTMLUpArrowElement>;
      "user-input-collapsed": LocalJSX.UserInputCollapsed &
        JSXBase.HTMLAttributes<HTMLUserInputCollapsedElement>;
      "user-input-container": LocalJSX.UserInputContainer &
        JSXBase.HTMLAttributes<HTMLUserInputContainerElement>;
      "user-input-full": LocalJSX.UserInputFull &
        JSXBase.HTMLAttributes<HTMLUserInputFullElement>;
    }
  }
}
