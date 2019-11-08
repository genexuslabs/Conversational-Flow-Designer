import { App } from "./app.js";
import { FlowElement } from "./instance-definition/elements/flow-element.js";
import {
  DragDropHelpers,
  MoveType,
  ComponentsAttributes
} from "./helpers/helpers.js";
import { UserInputElement } from "./instance-definition/elements/user-input-element.js";
import { DropZone } from "../../components/drop-zone/drop-zone.js";

export let sourceId = "";

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

  public static async SelectConversationalObject(
    customEvent: CustomEvent
  ): Promise<FlowElement> {
    const event: MouseEvent = EventHandler.GetEvent(customEvent) as MouseEvent;
    const eventElement: HTMLElement = EventHandler.GetTargetElement(event);
    if (eventElement)
      console.log("Select conversational object for: " + eventElement.id);

    let flow: FlowElement = null;

    if (window.external.SelectConversationalObject) {
      const flowId: string = EventHandler.GetFlowId(eventElement);
      const flowName: string = App.GetApp().Instance.GetFlowName(flowId);
      await window.external.SelectConversationalObject(flowName).then(sFlow => {
        const jsonFlow = JSON.parse(sFlow);
        flow = App.GetApp().Instance.LoadFlow(flowName, jsonFlow);
        return flow;
      });
    }
    return flow;
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

  public static OnFlowDragStart: Function = (customEvent: CustomEvent) => {
    const event: DragEvent = EventHandler.GetEvent(customEvent) as DragEvent;

    if (event.target != null && event.dataTransfer != null) {
      const target: HTMLElement = event.target as HTMLElement;
      event.dataTransfer.setData("text", target.id);
      sourceId = target.id;
    }
  };

  private static GetEvent(event: CustomEvent): DragEvent {
    event.preventDefault;
    return event.detail as DragEvent;
  }

  public static OnDragOverFlow: Function = (customEvent: CustomEvent) => {
    const event: DragEvent = EventHandler.GetEvent(customEvent) as DragEvent;
    event.preventDefault();
    if (event.dataTransfer && event.target) {
      const target: HTMLElement = event.target as HTMLElement;
      if (target.hasAttribute(ComponentsAttributes.ElementType)) {
        if (
          target.getAttribute(ComponentsAttributes.ElementType) ==
            ComponentsAttributes.ElmentTypeValue &&
          target.id != sourceId
        ) {
          const sourceId: string = event.dataTransfer.getData("text");
          if (target.id != sourceId) {
            const parent: HTMLElement = target.parentElement as HTMLElement;

            if (parent.nextElementSibling)
              DropZone.Show(parent.nextElementSibling as HTMLElement);
            if (parent.previousElementSibling)
              DropZone.Show(parent.previousElementSibling as HTMLElement);

            EventHandler.DisableDrop(
              parent.nextElementSibling as HTMLElement,
              parent.previousElementSibling as HTMLElement
            );
          }
        }
      }

      event.dataTransfer.dropEffect = DragDropHelpers.NoneEffect;
    }
  };

  public static OnLeaveDropZone(customEvent: CustomEvent): void {
    const event: DragEvent = EventHandler.GetEvent(customEvent);
    event.preventDefault();
    const dropZone: HTMLElement = EventHandler.GetDropZone(event);

    DropZone.InActive(dropZone);
  }

  public static OnDragOverDropZone(customEvent: CustomEvent): void {
    const event: DragEvent = EventHandler.GetEvent(customEvent) as DragEvent;
    event.preventDefault();

    if (event.dataTransfer)
      event.dataTransfer.dropEffect = DragDropHelpers.MoveEffect;

    const dropZone: HTMLElement = EventHandler.GetDropZone(event);

    DropZone.Active(dropZone);
  }

  public static OnDropOverDropZone(customEvent: CustomEvent): void {
    const event: DragEvent = EventHandler.GetEvent(customEvent) as DragEvent;

    event.preventDefault();
    if (event.dataTransfer != null && event.target != null) {
      const sourceId = event.dataTransfer.getData("text");
      const element: HTMLElement = document.getElementById(
        sourceId
      ) as HTMLElement;
      const target: HTMLElement = event.target as HTMLElement;

      const flowId: string = target.getAttribute(
        "data-objectReferenceId"
      ) as string;
      const targetElement: HTMLElement = document.getElementById(
        flowId
      ) as HTMLElement;

      const moveElement: HTMLElement = element.parentElement.parentElement;
      const moveTarget: HTMLElement = targetElement.parentElement.parentElement;
      let moveType: MoveType = MoveType.Up;
      if (target.getAttribute("data-moveType") == DragDropHelpers.MoveDown) {
        moveType = MoveType.Down;
        moveTarget.after(moveElement);
      } else moveTarget.before(moveElement);

      const sourceName: string = App.GetApp().Instance.GetFlowName(element.id);
      const targetName: string = App.GetApp().Instance.GetFlowName(flowId);

      App.GetApp().Instance.MoveFlows(sourceName, targetName, moveType);
    }
  }

  private static GetDropZone(event: DragEvent): HTMLElement {
    let dropZone: HTMLElement = event.target as HTMLElement;
    if (dropZone.tagName != "SPAN")
      dropZone = dropZone.firstChild as HTMLElement;

    return dropZone;
  }

  private static GetTargetElement(event: Event): HTMLElement {
    return event.target as HTMLElement;
  }

  private static DisableDrop(dropUP: HTMLElement, dropDown: HTMLElement): void {
    const flowElements: HTMLCollection = EventHandler.GetDropZones();
    let index = 0;

    while (index < flowElements.length) {
      if (flowElements[index] != dropUP && flowElements[index] != dropDown) {
        DropZone.Hide(flowElements[index] as HTMLElement);
      }
      index++;
    }
  }

  public static DisableDropZones(event: DragEvent) {
    const flowElements: HTMLCollection = EventHandler.GetDropZones();
    let index = 0;
    console.log(event);
    while (index < flowElements.length) {
      DropZone.Hide(flowElements[index] as HTMLElement);
      index++;
    }
  }

  private static GetDropZones(): HTMLCollection {
    return document.getElementsByTagName(DropZone.Tag);
  }

  public static AddFlowElement(): FlowElement[] {
    const flow: FlowElement = new FlowElement("New Flow");
    App.GetApp().Instance.AddFlow(flow);
    if (window.external.AddFlow != undefined) {
      window.external.AddFlow();
    }

    return App.GetApp().Instance.Flows;
  }

  public static GetValue(customEvent: CustomEvent): any {
    const event = EventHandler.GetEvent(customEvent);
    if (event.currentTarget) {
      const element: HTMLInputElement = event.currentTarget as HTMLInputElement;
      return element.value;
    }
    return null;
  }

  static GetValueFromSelect(customEvent: CustomEvent): any {
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
