import { Instance } from "./instance-definition/instance.js";

export class App {
  public Instance: Instance;
  private static mApp: App;

  public static GetApp(): App {
    if (this.mApp == null) {
      this.mApp = new App();
    }
    return this.mApp;
  }
  private constructor() {
    this.Instance = new Instance();
  }

  public InstanceIsEmpty(): boolean {
    return this.Instance.Flows.length == 0;
  }
}
