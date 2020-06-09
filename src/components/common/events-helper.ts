import { Collection } from "../collection/collection.js";

export const sourceId = "";

export class EventsHelper {
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

  public static GetValue(customEvent: CustomEvent): string {
    const event = EventsHelper.GetEvent(customEvent);
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

  static GetValueFromGxgSelect(customEvent: CustomEvent): string {
    customEvent = this.PreventEvent(customEvent);
    return customEvent.detail ? customEvent.detail /*.selectedValue*/ : "";
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
