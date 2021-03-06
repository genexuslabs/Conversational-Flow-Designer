/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { mode } from "@genexus/gemini/dist/types/components/accordion/accordion";
import { GXCFModel } from "./components/common/model";
import { SelectTypes } from "./components/common/helpers";
export namespace Components {
  interface GxcfButtonDelete {
    confirmationMessage: string;
    confirmationTitle: string;
    type: "deleted" | "close";
  }
  interface GxcfCollection {
    collection: string[];
    collectionAddText: string;
    collectionHeader: string;
    collectionHintId: string;
    collectionSummary: string;
    defaultNewItemValue: string;
    mode: mode;
  }
  interface GxcfCondition {
    currentCondition: string;
    hintId: string;
    label: string;
  }
  interface GxcfConfirmation {
    confirmationMessage: string;
    confirmationTitle: string;
    visible: boolean;
  }
  interface GxcfConversationalDesigner {
    instance: GXCFModel.Instance;
  }
  interface GxcfFlowCollapsed {
    flow: GXCFModel.FlowElement;
    setTitleFocus: () => Promise<void>;
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
    label: string;
    redirectionIndex: number;
    redirectionProperty: GXCFModel.RedirectionProperty;
    requireCondition: boolean;
  }
  interface GxcfResponse {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
  }
  interface GxcfSelect {
    selectIconType: string;
    selectType: SelectTypes;
    selectcaption: string;
    selectid: string;
  }
  interface GxcfUserInput {
    flow: GXCFModel.FlowElement;
    instance: GXCFModel.Instance;
  }
}
declare global {
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
  interface HTMLGxcfConversationalDesignerElement
    extends Components.GxcfConversationalDesigner,
      HTMLStencilElement {}
  var HTMLGxcfConversationalDesignerElement: {
    prototype: HTMLGxcfConversationalDesignerElement;
    new (): HTMLGxcfConversationalDesignerElement;
  };
  interface HTMLGxcfFlowCollapsedElement
    extends Components.GxcfFlowCollapsed,
      HTMLStencilElement {}
  var HTMLGxcfFlowCollapsedElement: {
    prototype: HTMLGxcfFlowCollapsedElement;
    new (): HTMLGxcfFlowCollapsedElement;
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
  interface HTMLGxcfResponseElement
    extends Components.GxcfResponse,
      HTMLStencilElement {}
  var HTMLGxcfResponseElement: {
    prototype: HTMLGxcfResponseElement;
    new (): HTMLGxcfResponseElement;
  };
  interface HTMLGxcfSelectElement
    extends Components.GxcfSelect,
      HTMLStencilElement {}
  var HTMLGxcfSelectElement: {
    prototype: HTMLGxcfSelectElement;
    new (): HTMLGxcfSelectElement;
  };
  interface HTMLGxcfUserInputElement
    extends Components.GxcfUserInput,
      HTMLStencilElement {}
  var HTMLGxcfUserInputElement: {
    prototype: HTMLGxcfUserInputElement;
    new (): HTMLGxcfUserInputElement;
  };
  interface HTMLElementTagNameMap {
    "gxcf-button-delete": HTMLGxcfButtonDeleteElement;
    "gxcf-collection": HTMLGxcfCollectionElement;
    "gxcf-condition": HTMLGxcfConditionElement;
    "gxcf-confirmation": HTMLGxcfConfirmationElement;
    "gxcf-conversational-designer": HTMLGxcfConversationalDesignerElement;
    "gxcf-flow-collapsed": HTMLGxcfFlowCollapsedElement;
    "gxcf-flow-full": HTMLGxcfFlowFullElement;
    "gxcf-hint": HTMLGxcfHintElement;
    "gxcf-redirection": HTMLGxcfRedirectionElement;
    "gxcf-response": HTMLGxcfResponseElement;
    "gxcf-select": HTMLGxcfSelectElement;
    "gxcf-user-input": HTMLGxcfUserInputElement;
  }
}
declare namespace LocalJSX {
  interface GxcfButtonDelete {
    confirmationMessage?: string;
    confirmationTitle?: string;
    onConfirmDelete?: (event: CustomEvent<any>) => void;
    type?: "deleted" | "close";
  }
  interface GxcfCollection {
    collection?: string[];
    collectionAddText?: string;
    collectionHeader?: string;
    collectionHintId?: string;
    collectionSummary?: string;
    defaultNewItemValue?: string;
    mode?: mode;
    onDeleteItem?: (event: CustomEvent<any>) => void;
    onEditItem?: (event: CustomEvent<any>) => void;
  }
  interface GxcfCondition {
    currentCondition?: string;
    hintId?: string;
    label?: string;
    onConditionChange?: (event: CustomEvent<any>) => void;
  }
  interface GxcfConfirmation {
    confirmationMessage?: string;
    confirmationTitle?: string;
    onUserCancellation?: (event: CustomEvent<any>) => void;
    onUserConfirmation?: (event: CustomEvent<any>) => void;
    visible?: boolean;
  }
  interface GxcfConversationalDesigner {
    instance?: GXCFModel.Instance;
    onAddFlow?: (event: CustomEvent<any>) => void;
    onDeleteFlow?: (event: CustomEvent<any>) => void;
    onDeleteResponse?: (event: CustomEvent<any>) => void;
    onDeleteUserInput?: (event: CustomEvent<any>) => void;
    onMoveFlow?: (event: CustomEvent<any>) => void;
    onSelectFlow?: (event: CustomEvent<any>) => void;
    onSelectRoot?: (event: CustomEvent<any>) => void;
    onSetFlowCategory?: (event: CustomEvent<any>) => void;
  }
  interface GxcfFlowCollapsed {
    flow?: GXCFModel.FlowElement;
    onModifyFlowName?: (event: CustomEvent<any>) => void;
    onSetTriggers?: (event: CustomEvent<any>) => void;
  }
  interface GxcfFlowFull {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onAddResponse?: (event: CustomEvent<any>) => void;
    onAddUserInput?: (event: CustomEvent<any>) => void;
    onCollapseFlow?: (event: CustomEvent<any>) => void;
    onModifyFlowName?: (event: CustomEvent<any>) => void;
    onSelectConversationalObject?: (event: CustomEvent<any>) => void;
    onSetSelectedFlow?: (event: CustomEvent<any>) => void;
    onSetTriggers?: (event: CustomEvent<any>) => void;
  }
  interface GxcfHint {
    hintId?: string;
  }
  interface GxcfRedirection {
    flows?: GXCFModel.FlowElement[];
    label?: string;
    onChangeRedirectCondition?: (event: CustomEvent<any>) => void;
    onChangeRedirectTo?: (event: CustomEvent<any>) => void;
    redirectionIndex?: number;
    redirectionProperty?: GXCFModel.RedirectionProperty;
    requireCondition?: boolean;
  }
  interface GxcfResponse {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onChangeComponentType?: (event: CustomEvent<any>) => void;
    onChangeResponseCondition?: (event: CustomEvent<any>) => void;
    onChangeResponseName?: (event: CustomEvent<any>) => void;
    onChangeResponseRedirectTo?: (event: CustomEvent<any>) => void;
    onChangeResponseStyle?: (event: CustomEvent<any>) => void;
    onChangeSDComponent?: (event: CustomEvent<any>) => void;
    onChangeWebComponent?: (event: CustomEvent<any>) => void;
    onDeleteResponse?: (event: CustomEvent<any>) => void;
    onSelectResponse?: (event: CustomEvent<any>) => void;
    onSetResponseMessages?: (event: CustomEvent<any>) => void;
    onSwitchResponseParameter?: (event: CustomEvent<any>) => void;
  }
  interface GxcfSelect {
    onTitleMouseDown?: (event: CustomEvent<any>) => void;
    onTitleMouseLeave?: (event: CustomEvent<any>) => void;
    selectIconType?: string;
    selectType?: SelectTypes;
    selectcaption?: string;
    selectid?: string;
  }
  interface GxcfUserInput {
    flow?: GXCFModel.FlowElement;
    instance?: GXCFModel.Instance;
    onAddRedirection?: (event: CustomEvent<any>) => void;
    onChangeCondition?: (event: CustomEvent<any>) => void;
    onChangeTryLimit?: (event: CustomEvent<any>) => void;
    onChangeUserInputRedirectCondition?: (event: CustomEvent<any>) => void;
    onChangeUserInputRedirectTo?: (event: CustomEvent<any>) => void;
    onClickOnUserInputName?: (event: CustomEvent<any>) => void;
    onDeleteUserInput?: (event: CustomEvent<any>) => void;
    onSelectUserInput?: (event: CustomEvent<any>) => void;
    onSelectValidationProcedure?: (event: CustomEvent<any>) => void;
    onSetAskMessages?: (event: CustomEvent<any>) => void;
    onSetCleanContextValue?: (event: CustomEvent<any>) => void;
    onSetOnErrorMessages?: (event: CustomEvent<any>) => void;
    onSetUserInputEntity?: (event: CustomEvent<any>) => void;
  }
  interface IntrinsicElements {
    "gxcf-button-delete": GxcfButtonDelete;
    "gxcf-collection": GxcfCollection;
    "gxcf-condition": GxcfCondition;
    "gxcf-confirmation": GxcfConfirmation;
    "gxcf-conversational-designer": GxcfConversationalDesigner;
    "gxcf-flow-collapsed": GxcfFlowCollapsed;
    "gxcf-flow-full": GxcfFlowFull;
    "gxcf-hint": GxcfHint;
    "gxcf-redirection": GxcfRedirection;
    "gxcf-response": GxcfResponse;
    "gxcf-select": GxcfSelect;
    "gxcf-user-input": GxcfUserInput;
  }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      "gxcf-button-delete": LocalJSX.GxcfButtonDelete &
        JSXBase.HTMLAttributes<HTMLGxcfButtonDeleteElement>;
      "gxcf-collection": LocalJSX.GxcfCollection &
        JSXBase.HTMLAttributes<HTMLGxcfCollectionElement>;
      "gxcf-condition": LocalJSX.GxcfCondition &
        JSXBase.HTMLAttributes<HTMLGxcfConditionElement>;
      "gxcf-confirmation": LocalJSX.GxcfConfirmation &
        JSXBase.HTMLAttributes<HTMLGxcfConfirmationElement>;
      "gxcf-conversational-designer": LocalJSX.GxcfConversationalDesigner &
        JSXBase.HTMLAttributes<HTMLGxcfConversationalDesignerElement>;
      "gxcf-flow-collapsed": LocalJSX.GxcfFlowCollapsed &
        JSXBase.HTMLAttributes<HTMLGxcfFlowCollapsedElement>;
      "gxcf-flow-full": LocalJSX.GxcfFlowFull &
        JSXBase.HTMLAttributes<HTMLGxcfFlowFullElement>;
      "gxcf-hint": LocalJSX.GxcfHint &
        JSXBase.HTMLAttributes<HTMLGxcfHintElement>;
      "gxcf-redirection": LocalJSX.GxcfRedirection &
        JSXBase.HTMLAttributes<HTMLGxcfRedirectionElement>;
      "gxcf-response": LocalJSX.GxcfResponse &
        JSXBase.HTMLAttributes<HTMLGxcfResponseElement>;
      "gxcf-select": LocalJSX.GxcfSelect &
        JSXBase.HTMLAttributes<HTMLGxcfSelectElement>;
      "gxcf-user-input": LocalJSX.GxcfUserInput &
        JSXBase.HTMLAttributes<HTMLGxcfUserInputElement>;
    }
  }
}
