/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ResponseElement } from "./global/ConversationalEditor/instanceDefinition/Elements/ResponseElement";
import { UserInputElement } from "./global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { FlowElement } from "./global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { RenderingOptions } from "./global/ConversationalEditor/helpers/Helpers";
import { RedirectionProperty } from "./global/ConversationalEditor/instanceDefinition/Elements/RedirectionProperty";

export namespace Components {
  interface GxcfAddObject {
    collectionAddText: string;
  }
  interface GxcfAddelement {}
  interface GxcfCollapsedresponse {
    response: ResponseElement;
  }
  interface GxcfCollapseduserinput {
    userInput: UserInputElement;
  }
  interface GxcfCollection {
    collection: string[];
    collectionAddText: string;
    collectionHeader: string;
    collectionHintId: string;
    collectionType: any;
    currentItemIndex: number;
    currentItemValue: string;
    itemParent: any;
  }
  interface GxcfCondition {
    currentCondition: string;
    onConditionChange: Function;
  }
  interface GxcfConversationaldesigner {}
  interface GxcfConversationalobject {
    conversationalObject: string;
  }
  interface GxcfDownarrow {
    arrowid: string;
  }
  interface GxcfDropzone {
    moveType: string;
    objectReferenceId: string;
    show: boolean;
  }
  interface GxcfFlow {
    flow: FlowElement;
    showDropZone: boolean;
  }
  interface GxcfFlowfull {
    flow: FlowElement;
  }
  interface GxcfFlowsummary {
    flow: FlowElement;
    renderingType: RenderingOptions;
  }
  interface GxcfFulluserinput {
    flow: FlowElement;
    userInput: UserInputElement;
  }
  interface GxcfHint {
    hintId: string;
  }
  interface GxcfRedirection {
    redirectionProperty: RedirectionProperty;
    userInput: UserInputElement;
  }
  interface GxcfSelect {
    selectcaption: string;
    selectid: string;
  }
  interface GxcfSummarydescription {
    descriptionid: string;
    descriptionvalue: string;
  }
  interface GxcfSummarytitle {
    classType: string;
    summaryid: string;
    summaryvalue: string;
  }
  interface GxcfUparrow {
    arrowid: string;
  }
  interface GxcfUserinput {
    flow: FlowElement;
    userInput: UserInputElement;
  }
  interface GxcfWelcome {}
}

declare global {
  interface HTMLGxcfAddObjectElement
    extends Components.GxcfAddObject,
      HTMLStencilElement {}
  var HTMLGxcfAddObjectElement: {
    prototype: HTMLGxcfAddObjectElement;
    new (): HTMLGxcfAddObjectElement;
  };

  interface HTMLGxcfAddelementElement
    extends Components.GxcfAddelement,
      HTMLStencilElement {}
  var HTMLGxcfAddelementElement: {
    prototype: HTMLGxcfAddelementElement;
    new (): HTMLGxcfAddelementElement;
  };

  interface HTMLGxcfCollapsedresponseElement
    extends Components.GxcfCollapsedresponse,
      HTMLStencilElement {}
  var HTMLGxcfCollapsedresponseElement: {
    prototype: HTMLGxcfCollapsedresponseElement;
    new (): HTMLGxcfCollapsedresponseElement;
  };

  interface HTMLGxcfCollapseduserinputElement
    extends Components.GxcfCollapseduserinput,
      HTMLStencilElement {}
  var HTMLGxcfCollapseduserinputElement: {
    prototype: HTMLGxcfCollapseduserinputElement;
    new (): HTMLGxcfCollapseduserinputElement;
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

  interface HTMLGxcfConversationaldesignerElement
    extends Components.GxcfConversationaldesigner,
      HTMLStencilElement {}
  var HTMLGxcfConversationaldesignerElement: {
    prototype: HTMLGxcfConversationaldesignerElement;
    new (): HTMLGxcfConversationaldesignerElement;
  };

  interface HTMLGxcfConversationalobjectElement
    extends Components.GxcfConversationalobject,
      HTMLStencilElement {}
  var HTMLGxcfConversationalobjectElement: {
    prototype: HTMLGxcfConversationalobjectElement;
    new (): HTMLGxcfConversationalobjectElement;
  };

  interface HTMLGxcfDownarrowElement
    extends Components.GxcfDownarrow,
      HTMLStencilElement {}
  var HTMLGxcfDownarrowElement: {
    prototype: HTMLGxcfDownarrowElement;
    new (): HTMLGxcfDownarrowElement;
  };

  interface HTMLGxcfDropzoneElement
    extends Components.GxcfDropzone,
      HTMLStencilElement {}
  var HTMLGxcfDropzoneElement: {
    prototype: HTMLGxcfDropzoneElement;
    new (): HTMLGxcfDropzoneElement;
  };

  interface HTMLGxcfFlowElement
    extends Components.GxcfFlow,
      HTMLStencilElement {}
  var HTMLGxcfFlowElement: {
    prototype: HTMLGxcfFlowElement;
    new (): HTMLGxcfFlowElement;
  };

  interface HTMLGxcfFlowfullElement
    extends Components.GxcfFlowfull,
      HTMLStencilElement {}
  var HTMLGxcfFlowfullElement: {
    prototype: HTMLGxcfFlowfullElement;
    new (): HTMLGxcfFlowfullElement;
  };

  interface HTMLGxcfFlowsummaryElement
    extends Components.GxcfFlowsummary,
      HTMLStencilElement {}
  var HTMLGxcfFlowsummaryElement: {
    prototype: HTMLGxcfFlowsummaryElement;
    new (): HTMLGxcfFlowsummaryElement;
  };

  interface HTMLGxcfFulluserinputElement
    extends Components.GxcfFulluserinput,
      HTMLStencilElement {}
  var HTMLGxcfFulluserinputElement: {
    prototype: HTMLGxcfFulluserinputElement;
    new (): HTMLGxcfFulluserinputElement;
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

  interface HTMLGxcfSelectElement
    extends Components.GxcfSelect,
      HTMLStencilElement {}
  var HTMLGxcfSelectElement: {
    prototype: HTMLGxcfSelectElement;
    new (): HTMLGxcfSelectElement;
  };

  interface HTMLGxcfSummarydescriptionElement
    extends Components.GxcfSummarydescription,
      HTMLStencilElement {}
  var HTMLGxcfSummarydescriptionElement: {
    prototype: HTMLGxcfSummarydescriptionElement;
    new (): HTMLGxcfSummarydescriptionElement;
  };

  interface HTMLGxcfSummarytitleElement
    extends Components.GxcfSummarytitle,
      HTMLStencilElement {}
  var HTMLGxcfSummarytitleElement: {
    prototype: HTMLGxcfSummarytitleElement;
    new (): HTMLGxcfSummarytitleElement;
  };

  interface HTMLGxcfUparrowElement
    extends Components.GxcfUparrow,
      HTMLStencilElement {}
  var HTMLGxcfUparrowElement: {
    prototype: HTMLGxcfUparrowElement;
    new (): HTMLGxcfUparrowElement;
  };

  interface HTMLGxcfUserinputElement
    extends Components.GxcfUserinput,
      HTMLStencilElement {}
  var HTMLGxcfUserinputElement: {
    prototype: HTMLGxcfUserinputElement;
    new (): HTMLGxcfUserinputElement;
  };

  interface HTMLGxcfWelcomeElement
    extends Components.GxcfWelcome,
      HTMLStencilElement {}
  var HTMLGxcfWelcomeElement: {
    prototype: HTMLGxcfWelcomeElement;
    new (): HTMLGxcfWelcomeElement;
  };
  interface HTMLElementTagNameMap {
    "gxcf-add-object": HTMLGxcfAddObjectElement;
    "gxcf-addelement": HTMLGxcfAddelementElement;
    "gxcf-collapsedresponse": HTMLGxcfCollapsedresponseElement;
    "gxcf-collapseduserinput": HTMLGxcfCollapseduserinputElement;
    "gxcf-collection": HTMLGxcfCollectionElement;
    "gxcf-condition": HTMLGxcfConditionElement;
    "gxcf-conversationaldesigner": HTMLGxcfConversationaldesignerElement;
    "gxcf-conversationalobject": HTMLGxcfConversationalobjectElement;
    "gxcf-downarrow": HTMLGxcfDownarrowElement;
    "gxcf-dropzone": HTMLGxcfDropzoneElement;
    "gxcf-flow": HTMLGxcfFlowElement;
    "gxcf-flowfull": HTMLGxcfFlowfullElement;
    "gxcf-flowsummary": HTMLGxcfFlowsummaryElement;
    "gxcf-fulluserinput": HTMLGxcfFulluserinputElement;
    "gxcf-hint": HTMLGxcfHintElement;
    "gxcf-redirection": HTMLGxcfRedirectionElement;
    "gxcf-select": HTMLGxcfSelectElement;
    "gxcf-summarydescription": HTMLGxcfSummarydescriptionElement;
    "gxcf-summarytitle": HTMLGxcfSummarytitleElement;
    "gxcf-uparrow": HTMLGxcfUparrowElement;
    "gxcf-userinput": HTMLGxcfUserinputElement;
    "gxcf-welcome": HTMLGxcfWelcomeElement;
  }
}

declare namespace LocalJSX {
  interface GxcfAddObject {
    collectionAddText?: string;
    onAddObject?: (event: CustomEvent<any>) => void;
  }
  interface GxcfAddelement {}
  interface GxcfCollapsedresponse {
    response?: ResponseElement;
  }
  interface GxcfCollapseduserinput {
    onOnExpandUserInput?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputFirstAskMessage?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputName?: (event: CustomEvent<any>) => void;
    userInput?: UserInputElement;
  }
  interface GxcfCollection {
    collection?: string[];
    collectionAddText?: string;
    collectionHeader?: string;
    collectionHintId?: string;
    collectionType?: any;
    currentItemIndex?: number;
    currentItemValue?: string;
    itemParent?: any;
  }
  interface GxcfCondition {
    currentCondition?: string;
    onConditionChange?: Function;
  }
  interface GxcfConversationaldesigner {}
  interface GxcfConversationalobject {
    conversationalObject?: string;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
  }
  interface GxcfDownarrow {
    arrowid?: string;
  }
  interface GxcfDropzone {
    moveType?: string;
    objectReferenceId?: string;
    onDropOnDropZone?: (event: CustomEvent<any>) => void;
    onOnDragLeaveDropZone?: (event: CustomEvent<any>) => void;
    onOnDragOverDropZone?: (event: CustomEvent<any>) => void;
    show?: boolean;
  }
  interface GxcfFlow {
    flow?: FlowElement;
    showDropZone?: boolean;
  }
  interface GxcfFlowfull {
    flow?: FlowElement;
    onOnCollapseFlow?: (event: CustomEvent<any>) => void;
  }
  interface GxcfFlowsummary {
    flow?: FlowElement;
    onOnDragOverFlow?: (event: CustomEvent<any>) => void;
    onOnExpandFlow?: (event: CustomEvent<any>) => void;
    onOnFlowDragStart?: (event: CustomEvent<any>) => void;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
    renderingType?: RenderingOptions;
  }
  interface GxcfFulluserinput {
    flow?: FlowElement;
    onOnCollapseUserInput?: (event: CustomEvent<any>) => void;
    onOnModifyUserInputName?: (event: CustomEvent<any>) => void;
    userInput?: UserInputElement;
  }
  interface GxcfHint {
    hintId?: string;
    onHideHint?: (event: CustomEvent<any>) => void;
    onShowHint?: (event: CustomEvent<any>) => void;
  }
  interface GxcfRedirection {
    redirectionProperty?: RedirectionProperty;
    userInput?: UserInputElement;
  }
  interface GxcfSelect {
    selectcaption?: string;
    selectid?: string;
  }
  interface GxcfSummarydescription {
    descriptionid?: string;
    descriptionvalue?: string;
    onChangingFlowTriggerSummary?: (event: CustomEvent<any>) => void;
  }
  interface GxcfSummarytitle {
    classType?: string;
    onChangingFlowName?: (event: CustomEvent<any>) => void;
    summaryid?: string;
    summaryvalue?: string;
  }
  interface GxcfUparrow {
    arrowid?: string;
  }
  interface GxcfUserinput {
    flow?: FlowElement;
    userInput?: UserInputElement;
  }
  interface GxcfWelcome {
    onOpenEditor?: (event: CustomEvent<any>) => void;
  }

  interface IntrinsicElements {
    "gxcf-add-object": GxcfAddObject;
    "gxcf-addelement": GxcfAddelement;
    "gxcf-collapsedresponse": GxcfCollapsedresponse;
    "gxcf-collapseduserinput": GxcfCollapseduserinput;
    "gxcf-collection": GxcfCollection;
    "gxcf-condition": GxcfCondition;
    "gxcf-conversationaldesigner": GxcfConversationaldesigner;
    "gxcf-conversationalobject": GxcfConversationalobject;
    "gxcf-downarrow": GxcfDownarrow;
    "gxcf-dropzone": GxcfDropzone;
    "gxcf-flow": GxcfFlow;
    "gxcf-flowfull": GxcfFlowfull;
    "gxcf-flowsummary": GxcfFlowsummary;
    "gxcf-fulluserinput": GxcfFulluserinput;
    "gxcf-hint": GxcfHint;
    "gxcf-redirection": GxcfRedirection;
    "gxcf-select": GxcfSelect;
    "gxcf-summarydescription": GxcfSummarydescription;
    "gxcf-summarytitle": GxcfSummarytitle;
    "gxcf-uparrow": GxcfUparrow;
    "gxcf-userinput": GxcfUserinput;
    "gxcf-welcome": GxcfWelcome;
  }
}

export { LocalJSX as JSX };

declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "gxcf-add-object": LocalJSX.GxcfAddObject &
        JSXBase.HTMLAttributes<HTMLGxcfAddObjectElement>;
      "gxcf-addelement": LocalJSX.GxcfAddelement &
        JSXBase.HTMLAttributes<HTMLGxcfAddelementElement>;
      "gxcf-collapsedresponse": LocalJSX.GxcfCollapsedresponse &
        JSXBase.HTMLAttributes<HTMLGxcfCollapsedresponseElement>;
      "gxcf-collapseduserinput": LocalJSX.GxcfCollapseduserinput &
        JSXBase.HTMLAttributes<HTMLGxcfCollapseduserinputElement>;
      "gxcf-collection": LocalJSX.GxcfCollection &
        JSXBase.HTMLAttributes<HTMLGxcfCollectionElement>;
      "gxcf-condition": LocalJSX.GxcfCondition &
        JSXBase.HTMLAttributes<HTMLGxcfConditionElement>;
      "gxcf-conversationaldesigner": LocalJSX.GxcfConversationaldesigner &
        JSXBase.HTMLAttributes<HTMLGxcfConversationaldesignerElement>;
      "gxcf-conversationalobject": LocalJSX.GxcfConversationalobject &
        JSXBase.HTMLAttributes<HTMLGxcfConversationalobjectElement>;
      "gxcf-downarrow": LocalJSX.GxcfDownarrow &
        JSXBase.HTMLAttributes<HTMLGxcfDownarrowElement>;
      "gxcf-dropzone": LocalJSX.GxcfDropzone &
        JSXBase.HTMLAttributes<HTMLGxcfDropzoneElement>;
      "gxcf-flow": LocalJSX.GxcfFlow &
        JSXBase.HTMLAttributes<HTMLGxcfFlowElement>;
      "gxcf-flowfull": LocalJSX.GxcfFlowfull &
        JSXBase.HTMLAttributes<HTMLGxcfFlowfullElement>;
      "gxcf-flowsummary": LocalJSX.GxcfFlowsummary &
        JSXBase.HTMLAttributes<HTMLGxcfFlowsummaryElement>;
      "gxcf-fulluserinput": LocalJSX.GxcfFulluserinput &
        JSXBase.HTMLAttributes<HTMLGxcfFulluserinputElement>;
      "gxcf-hint": LocalJSX.GxcfHint &
        JSXBase.HTMLAttributes<HTMLGxcfHintElement>;
      "gxcf-redirection": LocalJSX.GxcfRedirection &
        JSXBase.HTMLAttributes<HTMLGxcfRedirectionElement>;
      "gxcf-select": LocalJSX.GxcfSelect &
        JSXBase.HTMLAttributes<HTMLGxcfSelectElement>;
      "gxcf-summarydescription": LocalJSX.GxcfSummarydescription &
        JSXBase.HTMLAttributes<HTMLGxcfSummarydescriptionElement>;
      "gxcf-summarytitle": LocalJSX.GxcfSummarytitle &
        JSXBase.HTMLAttributes<HTMLGxcfSummarytitleElement>;
      "gxcf-uparrow": LocalJSX.GxcfUparrow &
        JSXBase.HTMLAttributes<HTMLGxcfUparrowElement>;
      "gxcf-userinput": LocalJSX.GxcfUserinput &
        JSXBase.HTMLAttributes<HTMLGxcfUserinputElement>;
      "gxcf-welcome": LocalJSX.GxcfWelcome &
        JSXBase.HTMLAttributes<HTMLGxcfWelcomeElement>;
    }
  }
}
