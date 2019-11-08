/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  FlowElement,
} from './global/conversational-editor/instance-definition/elements/flow-element';
import {
  RenderingOptions,
} from './global/conversational-editor/helpers/helpers';
import {
  ConversationalElement,
} from './global/conversational-editor/instance-definition/elements/iconversational-element';
import {
  RedirectionProperty,
} from './global/conversational-editor/instance-definition/elements/redirection-property';
import {
  ResponseElement,
} from './global/conversational-editor/instance-definition/elements/response-element';
import {
  UserInputElement,
} from './global/conversational-editor/instance-definition/elements/user-input-element';

export namespace Components {
  interface GxcfAddElement {}
  interface GxcfAddObject {
    'addText': string;
  }
  interface GxcfCollection {
    'collection': string[];
    'collectionAddText': string;
    'collectionHeader': string;
    'collectionHintId': string;
    'collectionType': any;
    'currentItemIndex': number;
    'currentItemValue': string;
    'itemParent': any;
  }
  interface GxcfCondition {
    'currentCondition': string;
  }
  interface GxcfConversationalDesigner {}
  interface GxcfConversationalObject {
    'conversationalObject': string;
  }
  interface GxcfDesignerWelcome {}
  interface GxcfDownArrow {
    'arrowid': string;
  }
  interface GxcfDropZone {
    'moveType': string;
    'objectReferenceId': string;
    'show': boolean;
  }
  interface GxcfFlowCollapsed {
    'flow': FlowElement;
    'renderingType': RenderingOptions;
  }
  interface GxcfFlowContainer {
    'flow': FlowElement;
    'showDropZone': boolean;
  }
  interface GxcfFlowFull {
    'flow': FlowElement;
  }
  interface GxcfHint {
    'hintId': string;
  }
  interface GxcfRedirection {
    'element': ConversationalElement;
    'redirectionProperty': RedirectionProperty;
  }
  interface GxcfResponse {
    'response': ResponseElement;
  }
  interface GxcfResponseCollapsed {
    'response': ResponseElement;
  }
  interface GxcfResponseFull {
    'response': ResponseElement;
  }
  interface GxcfSelect {
    'selectIconType': string;
    'selectcaption': string;
    'selectid': string;
  }
  interface GxcfSummaryDescription {
    'descriptionid': string;
    'descriptionvalue': string;
  }
  interface GxcfSummaryTitle {
    'classType': string;
    'summaryid': string;
    'summaryvalue': string;
  }
  interface GxcfUpArrow {
    'arrowid': string;
  }
  interface GxcfUserInputCollapsed {
    'userInput': UserInputElement;
  }
  interface GxcfUserInputContainer {
    'flow': FlowElement;
    'userInput': UserInputElement;
  }
  interface GxcfUserInputFull {
    'flow': FlowElement;
    'userInput': UserInputElement;
  }
}

declare global {


  interface HTMLGxcfAddElementElement extends Components.GxcfAddElement, HTMLStencilElement {}
  var HTMLGxcfAddElementElement: {
    prototype: HTMLGxcfAddElementElement;
    new (): HTMLGxcfAddElementElement;
  };

  interface HTMLGxcfAddObjectElement extends Components.GxcfAddObject, HTMLStencilElement {}
  var HTMLGxcfAddObjectElement: {
    prototype: HTMLGxcfAddObjectElement;
    new (): HTMLGxcfAddObjectElement;
  };

  interface HTMLGxcfCollectionElement extends Components.GxcfCollection, HTMLStencilElement {}
  var HTMLGxcfCollectionElement: {
    prototype: HTMLGxcfCollectionElement;
    new (): HTMLGxcfCollectionElement;
  };

  interface HTMLGxcfConditionElement extends Components.GxcfCondition, HTMLStencilElement {}
  var HTMLGxcfConditionElement: {
    prototype: HTMLGxcfConditionElement;
    new (): HTMLGxcfConditionElement;
  };

  interface HTMLGxcfConversationalDesignerElement extends Components.GxcfConversationalDesigner, HTMLStencilElement {}
  var HTMLGxcfConversationalDesignerElement: {
    prototype: HTMLGxcfConversationalDesignerElement;
    new (): HTMLGxcfConversationalDesignerElement;
  };

  interface HTMLGxcfConversationalObjectElement extends Components.GxcfConversationalObject, HTMLStencilElement {}
  var HTMLGxcfConversationalObjectElement: {
    prototype: HTMLGxcfConversationalObjectElement;
    new (): HTMLGxcfConversationalObjectElement;
  };

  interface HTMLGxcfDesignerWelcomeElement extends Components.GxcfDesignerWelcome, HTMLStencilElement {}
  var HTMLGxcfDesignerWelcomeElement: {
    prototype: HTMLGxcfDesignerWelcomeElement;
    new (): HTMLGxcfDesignerWelcomeElement;
  };

  interface HTMLGxcfDownArrowElement extends Components.GxcfDownArrow, HTMLStencilElement {}
  var HTMLGxcfDownArrowElement: {
    prototype: HTMLGxcfDownArrowElement;
    new (): HTMLGxcfDownArrowElement;
  };

  interface HTMLGxcfDropZoneElement extends Components.GxcfDropZone, HTMLStencilElement {}
  var HTMLGxcfDropZoneElement: {
    prototype: HTMLGxcfDropZoneElement;
    new (): HTMLGxcfDropZoneElement;
  };

  interface HTMLGxcfFlowCollapsedElement extends Components.GxcfFlowCollapsed, HTMLStencilElement {}
  var HTMLGxcfFlowCollapsedElement: {
    prototype: HTMLGxcfFlowCollapsedElement;
    new (): HTMLGxcfFlowCollapsedElement;
  };

  interface HTMLGxcfFlowContainerElement extends Components.GxcfFlowContainer, HTMLStencilElement {}
  var HTMLGxcfFlowContainerElement: {
    prototype: HTMLGxcfFlowContainerElement;
    new (): HTMLGxcfFlowContainerElement;
  };

  interface HTMLGxcfFlowFullElement extends Components.GxcfFlowFull, HTMLStencilElement {}
  var HTMLGxcfFlowFullElement: {
    prototype: HTMLGxcfFlowFullElement;
    new (): HTMLGxcfFlowFullElement;
  };

  interface HTMLGxcfHintElement extends Components.GxcfHint, HTMLStencilElement {}
  var HTMLGxcfHintElement: {
    prototype: HTMLGxcfHintElement;
    new (): HTMLGxcfHintElement;
  };

  interface HTMLGxcfRedirectionElement extends Components.GxcfRedirection, HTMLStencilElement {}
  var HTMLGxcfRedirectionElement: {
    prototype: HTMLGxcfRedirectionElement;
    new (): HTMLGxcfRedirectionElement;
  };

  interface HTMLGxcfResponseElement extends Components.GxcfResponse, HTMLStencilElement {}
  var HTMLGxcfResponseElement: {
    prototype: HTMLGxcfResponseElement;
    new (): HTMLGxcfResponseElement;
  };

  interface HTMLGxcfResponseCollapsedElement extends Components.GxcfResponseCollapsed, HTMLStencilElement {}
  var HTMLGxcfResponseCollapsedElement: {
    prototype: HTMLGxcfResponseCollapsedElement;
    new (): HTMLGxcfResponseCollapsedElement;
  };

  interface HTMLGxcfResponseFullElement extends Components.GxcfResponseFull, HTMLStencilElement {}
  var HTMLGxcfResponseFullElement: {
    prototype: HTMLGxcfResponseFullElement;
    new (): HTMLGxcfResponseFullElement;
  };

  interface HTMLGxcfSelectElement extends Components.GxcfSelect, HTMLStencilElement {}
  var HTMLGxcfSelectElement: {
    prototype: HTMLGxcfSelectElement;
    new (): HTMLGxcfSelectElement;
  };

  interface HTMLGxcfSummaryDescriptionElement extends Components.GxcfSummaryDescription, HTMLStencilElement {}
  var HTMLGxcfSummaryDescriptionElement: {
    prototype: HTMLGxcfSummaryDescriptionElement;
    new (): HTMLGxcfSummaryDescriptionElement;
  };

  interface HTMLGxcfSummaryTitleElement extends Components.GxcfSummaryTitle, HTMLStencilElement {}
  var HTMLGxcfSummaryTitleElement: {
    prototype: HTMLGxcfSummaryTitleElement;
    new (): HTMLGxcfSummaryTitleElement;
  };

  interface HTMLGxcfUpArrowElement extends Components.GxcfUpArrow, HTMLStencilElement {}
  var HTMLGxcfUpArrowElement: {
    prototype: HTMLGxcfUpArrowElement;
    new (): HTMLGxcfUpArrowElement;
  };

  interface HTMLGxcfUserInputCollapsedElement extends Components.GxcfUserInputCollapsed, HTMLStencilElement {}
  var HTMLGxcfUserInputCollapsedElement: {
    prototype: HTMLGxcfUserInputCollapsedElement;
    new (): HTMLGxcfUserInputCollapsedElement;
  };

  interface HTMLGxcfUserInputContainerElement extends Components.GxcfUserInputContainer, HTMLStencilElement {}
  var HTMLGxcfUserInputContainerElement: {
    prototype: HTMLGxcfUserInputContainerElement;
    new (): HTMLGxcfUserInputContainerElement;
  };

  interface HTMLGxcfUserInputFullElement extends Components.GxcfUserInputFull, HTMLStencilElement {}
  var HTMLGxcfUserInputFullElement: {
    prototype: HTMLGxcfUserInputFullElement;
    new (): HTMLGxcfUserInputFullElement;
  };
  interface HTMLElementTagNameMap {
    'gxcf-add-element': HTMLGxcfAddElementElement;
    'gxcf-add-object': HTMLGxcfAddObjectElement;
    'gxcf-collection': HTMLGxcfCollectionElement;
    'gxcf-condition': HTMLGxcfConditionElement;
    'gxcf-conversational-designer': HTMLGxcfConversationalDesignerElement;
    'gxcf-conversational-object': HTMLGxcfConversationalObjectElement;
    'gxcf-designer-welcome': HTMLGxcfDesignerWelcomeElement;
    'gxcf-down-arrow': HTMLGxcfDownArrowElement;
    'gxcf-drop-zone': HTMLGxcfDropZoneElement;
    'gxcf-flow-collapsed': HTMLGxcfFlowCollapsedElement;
    'gxcf-flow-container': HTMLGxcfFlowContainerElement;
    'gxcf-flow-full': HTMLGxcfFlowFullElement;
    'gxcf-hint': HTMLGxcfHintElement;
    'gxcf-redirection': HTMLGxcfRedirectionElement;
    'gxcf-response': HTMLGxcfResponseElement;
    'gxcf-response-collapsed': HTMLGxcfResponseCollapsedElement;
    'gxcf-response-full': HTMLGxcfResponseFullElement;
    'gxcf-select': HTMLGxcfSelectElement;
    'gxcf-summary-description': HTMLGxcfSummaryDescriptionElement;
    'gxcf-summary-title': HTMLGxcfSummaryTitleElement;
    'gxcf-up-arrow': HTMLGxcfUpArrowElement;
    'gxcf-user-input-collapsed': HTMLGxcfUserInputCollapsedElement;
    'gxcf-user-input-container': HTMLGxcfUserInputContainerElement;
    'gxcf-user-input-full': HTMLGxcfUserInputFullElement;
  }
}

declare namespace LocalJSX {
  interface GxcfAddElement {}
  interface GxcfAddObject {
    'addText'?: string;
    'onAddObject'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfCollection {
    'collection'?: string[];
    'collectionAddText'?: string;
    'collectionHeader'?: string;
    'collectionHintId'?: string;
    'collectionType'?: any;
    'currentItemIndex'?: number;
    'currentItemValue'?: string;
    'itemParent'?: any;
  }
  interface GxcfCondition {
    'currentCondition'?: string;
    'onConditionChange'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfConversationalDesigner {}
  interface GxcfConversationalObject {
    'conversationalObject'?: string;
    'onSelectConversationalObject'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfDesignerWelcome {
    'onOpenEditor'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfDownArrow {
    'arrowid'?: string;
  }
  interface GxcfDropZone {
    'moveType'?: string;
    'objectReferenceId'?: string;
    'onDropOnDropZone'?: (event: CustomEvent<any>) => void;
    'onOnDragLeaveDropZone'?: (event: CustomEvent<any>) => void;
    'onOnDragOverDropZone'?: (event: CustomEvent<any>) => void;
    'show'?: boolean;
  }
  interface GxcfFlowCollapsed {
    'flow'?: FlowElement;
    'onDragOverFlow'?: (event: CustomEvent<any>) => void;
    'onExpandFlow'?: (event: CustomEvent<any>) => void;
    'onFlowDragStart'?: (event: CustomEvent<any>) => void;
    'onSelectConversationalObject'?: (event: CustomEvent<any>) => void;
    'renderingType'?: RenderingOptions;
  }
  interface GxcfFlowContainer {
    'flow'?: FlowElement;
    'showDropZone'?: boolean;
  }
  interface GxcfFlowFull {
    'flow'?: FlowElement;
    'onCollapseFlow'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfHint {
    'hintId'?: string;
    'onHideHint'?: (event: CustomEvent<any>) => void;
    'onShowHint'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfRedirection {
    'element'?: ConversationalElement;
    'onChangeRedirectTo'?: (event: CustomEvent<any>) => void;
    'redirectionProperty'?: RedirectionProperty;
  }
  interface GxcfResponse {
    'response'?: ResponseElement;
  }
  interface GxcfResponseCollapsed {
    'response'?: ResponseElement;
  }
  interface GxcfResponseFull {
    'response'?: ResponseElement;
  }
  interface GxcfSelect {
    'selectIconType'?: string;
    'selectcaption'?: string;
    'selectid'?: string;
  }
  interface GxcfSummaryDescription {
    'descriptionid'?: string;
    'descriptionvalue'?: string;
    'onChangingFlowTriggerSummary'?: (event: CustomEvent<any>) => void;
  }
  interface GxcfSummaryTitle {
    'classType'?: string;
    'onChangingFlowName'?: (event: CustomEvent<any>) => void;
    'summaryid'?: string;
    'summaryvalue'?: string;
  }
  interface GxcfUpArrow {
    'arrowid'?: string;
  }
  interface GxcfUserInputCollapsed {
    'onExpandUserInput'?: (event: CustomEvent<any>) => void;
    'onModifyUserInputFirstAskMessage'?: (event: CustomEvent<any>) => void;
    'onModifyUserInputName'?: (event: CustomEvent<any>) => void;
    'userInput'?: UserInputElement;
  }
  interface GxcfUserInputContainer {
    'flow'?: FlowElement;
    'userInput'?: UserInputElement;
  }
  interface GxcfUserInputFull {
    'flow'?: FlowElement;
    'onCollapseUserInput'?: (event: CustomEvent<any>) => void;
    'onModifyUserInputName'?: (event: CustomEvent<any>) => void;
    'userInput'?: UserInputElement;
  }

  interface IntrinsicElements {
    'gxcf-add-element': GxcfAddElement;
    'gxcf-add-object': GxcfAddObject;
    'gxcf-collection': GxcfCollection;
    'gxcf-condition': GxcfCondition;
    'gxcf-conversational-designer': GxcfConversationalDesigner;
    'gxcf-conversational-object': GxcfConversationalObject;
    'gxcf-designer-welcome': GxcfDesignerWelcome;
    'gxcf-down-arrow': GxcfDownArrow;
    'gxcf-drop-zone': GxcfDropZone;
    'gxcf-flow-collapsed': GxcfFlowCollapsed;
    'gxcf-flow-container': GxcfFlowContainer;
    'gxcf-flow-full': GxcfFlowFull;
    'gxcf-hint': GxcfHint;
    'gxcf-redirection': GxcfRedirection;
    'gxcf-response': GxcfResponse;
    'gxcf-response-collapsed': GxcfResponseCollapsed;
    'gxcf-response-full': GxcfResponseFull;
    'gxcf-select': GxcfSelect;
    'gxcf-summary-description': GxcfSummaryDescription;
    'gxcf-summary-title': GxcfSummaryTitle;
    'gxcf-up-arrow': GxcfUpArrow;
    'gxcf-user-input-collapsed': GxcfUserInputCollapsed;
    'gxcf-user-input-container': GxcfUserInputContainer;
    'gxcf-user-input-full': GxcfUserInputFull;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'gxcf-add-element': LocalJSX.GxcfAddElement & JSXBase.HTMLAttributes<HTMLGxcfAddElementElement>;
      'gxcf-add-object': LocalJSX.GxcfAddObject & JSXBase.HTMLAttributes<HTMLGxcfAddObjectElement>;
      'gxcf-collection': LocalJSX.GxcfCollection & JSXBase.HTMLAttributes<HTMLGxcfCollectionElement>;
      'gxcf-condition': LocalJSX.GxcfCondition & JSXBase.HTMLAttributes<HTMLGxcfConditionElement>;
      'gxcf-conversational-designer': LocalJSX.GxcfConversationalDesigner & JSXBase.HTMLAttributes<HTMLGxcfConversationalDesignerElement>;
      'gxcf-conversational-object': LocalJSX.GxcfConversationalObject & JSXBase.HTMLAttributes<HTMLGxcfConversationalObjectElement>;
      'gxcf-designer-welcome': LocalJSX.GxcfDesignerWelcome & JSXBase.HTMLAttributes<HTMLGxcfDesignerWelcomeElement>;
      'gxcf-down-arrow': LocalJSX.GxcfDownArrow & JSXBase.HTMLAttributes<HTMLGxcfDownArrowElement>;
      'gxcf-drop-zone': LocalJSX.GxcfDropZone & JSXBase.HTMLAttributes<HTMLGxcfDropZoneElement>;
      'gxcf-flow-collapsed': LocalJSX.GxcfFlowCollapsed & JSXBase.HTMLAttributes<HTMLGxcfFlowCollapsedElement>;
      'gxcf-flow-container': LocalJSX.GxcfFlowContainer & JSXBase.HTMLAttributes<HTMLGxcfFlowContainerElement>;
      'gxcf-flow-full': LocalJSX.GxcfFlowFull & JSXBase.HTMLAttributes<HTMLGxcfFlowFullElement>;
      'gxcf-hint': LocalJSX.GxcfHint & JSXBase.HTMLAttributes<HTMLGxcfHintElement>;
      'gxcf-redirection': LocalJSX.GxcfRedirection & JSXBase.HTMLAttributes<HTMLGxcfRedirectionElement>;
      'gxcf-response': LocalJSX.GxcfResponse & JSXBase.HTMLAttributes<HTMLGxcfResponseElement>;
      'gxcf-response-collapsed': LocalJSX.GxcfResponseCollapsed & JSXBase.HTMLAttributes<HTMLGxcfResponseCollapsedElement>;
      'gxcf-response-full': LocalJSX.GxcfResponseFull & JSXBase.HTMLAttributes<HTMLGxcfResponseFullElement>;
      'gxcf-select': LocalJSX.GxcfSelect & JSXBase.HTMLAttributes<HTMLGxcfSelectElement>;
      'gxcf-summary-description': LocalJSX.GxcfSummaryDescription & JSXBase.HTMLAttributes<HTMLGxcfSummaryDescriptionElement>;
      'gxcf-summary-title': LocalJSX.GxcfSummaryTitle & JSXBase.HTMLAttributes<HTMLGxcfSummaryTitleElement>;
      'gxcf-up-arrow': LocalJSX.GxcfUpArrow & JSXBase.HTMLAttributes<HTMLGxcfUpArrowElement>;
      'gxcf-user-input-collapsed': LocalJSX.GxcfUserInputCollapsed & JSXBase.HTMLAttributes<HTMLGxcfUserInputCollapsedElement>;
      'gxcf-user-input-container': LocalJSX.GxcfUserInputContainer & JSXBase.HTMLAttributes<HTMLGxcfUserInputContainerElement>;
      'gxcf-user-input-full': LocalJSX.GxcfUserInputFull & JSXBase.HTMLAttributes<HTMLGxcfUserInputFullElement>;
    }
  }
}


