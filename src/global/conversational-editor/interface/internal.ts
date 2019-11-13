import { App } from "../app.js";
import { CustomJSON } from "../instance-definition/instance.js";

export function SetConversationalObject(
  flowName: string,
  conversationalObject: string
) {
  console.log("setCO");
  App.GetApp().Instance.SetConversationalObjectForFlow(
    flowName,
    conversationalObject
  );
}

export function InitializeInstance(instance: CustomJSON) {
  console.log("initialize");
  App.GetApp().Instance.InitializeInstance(instance);
}
