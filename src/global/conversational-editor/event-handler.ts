import { App } from "./app.js";
import { FlowElement } from "./instance-definition/elements/flow-element.js";
import { ComponentsAttributes } from "./helpers/helpers.js";
import { UserInputElement } from "./instance-definition/elements/user-input-element.js";
import { Collection } from "../../components/collection/collection.js";

export const sourceId = "";

export class EventHandler {
  private static GetFlowId(element: HTMLElement): string {
    let moveNext = true;
    while (element.parentElement != null && moveNext) {
      element = element.parentElement;
      if (element.hasAttribute(ComponentsAttributes.FlowId)) moveNext = false;
    }

    if (element.hasAttribute(ComponentsAttributes.FlowId))
      return element.getAttribute(ComponentsAttributes.FlowId);

    return "";
  }

  public static SelectConversationalObject(
    flow: FlowElement,
    flowContainer: HTMLGxcfFlowContainerElement
  ): void {
    if (window.external.SelectConversationalObject) {
      window.external.SelectConversationalObject(flow.Name).then(sFlow => {
        const jsonFlow = JSON.parse(sFlow);
        flow = App.GetApp().Instance.LoadFlow(flow.Name, jsonFlow);
        flowContainer.flow = flow;
      });
    }
  }

  public static async SelectValidationProcedure(
    flow: FlowElement,
    userInput: UserInputElement
  ): Promise<UserInputElement> {
    if (window.external.SelectValidationProcedure) {
      await window.external
        .SelectValidationProcedure(flow.Name, userInput.Variable)
        .then(function(validationProcedure) {
          userInput.SetValidationProcedure(validationProcedure);
        });
    }
    return userInput;
  }

  public static GetFormattedMessages(lMessages: string[]): string {
    let messages = "";
    lMessages.forEach(function(msg) {
      messages += msg + ";";
    });
    return messages;
  }

  private static GetEvent(event: CustomEvent): DragEvent {
    event.preventDefault;
    return event.detail as DragEvent;
  }

  private static GetTargetElement(event: Event): HTMLElement {
    return event.target as HTMLElement;
  }

  public static AddFlowElement(): FlowElement[] {
    const flow: FlowElement = new FlowElement("New Flow");
    App.GetApp().Instance.AddFlow(flow);
    if (window.external.AddFlow != undefined) {
      window.external.AddFlow();
    }

    return App.GetApp().Instance.Flows;
  }

  public static GetValue(customEvent: CustomEvent): string {
    const event = EventHandler.GetEvent(customEvent);
    if (event.currentTarget) {
      const element: HTMLInputElement = event.currentTarget as HTMLInputElement;
      return element.value;
    }
    return null;
  }

  public static GetValueFromDetail(customEvent: CustomEvent): string {
    customEvent.preventDefault;
    customEvent = customEvent.detail;
    if (customEvent.currentTarget) {
      const element: HTMLInputElement = customEvent.currentTarget as HTMLInputElement;
      return element.value;
    }
    return null;
  }

  public static GetCollectionIndexFromDetail(customEvent: CustomEvent): string {
    customEvent.preventDefault;
    customEvent = customEvent.detail;
    if (customEvent.currentTarget) {
      const element: HTMLInputElement = customEvent.currentTarget as HTMLInputElement;
      return element.getAttribute(Collection.DataItemIndex);
    }
    return null;
  }

  static GetValueFromSelect(customEvent: CustomEvent): string {
    customEvent = this.PreventEvent(customEvent);
    if (customEvent.currentTarget) {
      const element: HTMLSelectElement = customEvent.currentTarget as HTMLSelectElement;
      return element.value;
    }
    return null;
  }

  static GetValueFromInput(customEvent: CustomEvent): string {
    customEvent = this.PreventEvent(customEvent);
    if (customEvent.currentTarget) {
      const element: HTMLInputElement = customEvent.currentTarget as HTMLInputElement;
      return element.value;
    }
    return "";
  }

  private static PreventEvent(event: CustomEvent): CustomEvent {
    event.preventDefault();
    return event;
  }
}
