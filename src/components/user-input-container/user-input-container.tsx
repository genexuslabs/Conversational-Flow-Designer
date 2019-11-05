import { Component, Prop, h, State, Listen } from "@stencil/core";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { EventHandler } from "../../global/conversational-editor/event-handler";

@Component({
  tag: "user-input-container",
  styleUrl: "user-input-container.scss",
  shadow: false
})
export class UserInput {
  @Prop() userInput: UserInputElement;
  @Prop() flow: FlowElement;
  @State() refresh = false;

  @Listen("onExpandUserInput")
  HandleOnExpandUserInput(event: CustomEvent): void {
    console.log("Event: " + event.type);
    this.userInput.SetRenderType(RenderingOptions.Full);
    this.refresh = !this.refresh;
  }

  @Listen("onCollapseUserInput")
  HandleCollapseUserInput(event: CustomEvent): void {
    console.log(event.type);
    this.userInput.SetRenderType(RenderingOptions.Summary);
    this.refresh = !this.refresh;
  }

  @Listen("onModifyUserInputName")
  HandleOnModifyUserInputName(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventHandler.GetValue(event);
    if (value != null) {
      this.userInput.SetName(value);
      this.refresh = !this.refresh;
    }
  }

  @Listen("onModifyUserInputFirstAskMessage")
  HandleOnModifyUserInputFirstAskMessage(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventHandler.GetValue(event);
    if (value != null) {
      this.userInput.SetFirstAskMessage(value);
      this.refresh = !this.refresh;
    }
  }

  private collapsedUserInput(): HTMLElement {
    return <user-input-collapsed userInput={this.userInput} />;
  }

  private fullUserInput(): HTMLElement {
    return <user-input-full userInput={this.userInput} flow={this.flow} />;
  }

  render() {
    console.log(this.userInput.RenderType);
    if (this.userInput.RenderType == RenderingOptions.Summary)
      return this.collapsedUserInput();
    if (this.userInput.RenderType == RenderingOptions.Full)
      return this.fullUserInput();
    return <div>{this.userInput.RenderType} is not supported.</div>;
  }
}
