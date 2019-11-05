import { Component, Prop, h, State, Listen } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { RenderingOptions } from "../../global/ConversationalEditor/helpers/Helpers";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { EventHandler } from "../../global/ConversationalEditor/EventHandler";

@Component({
  tag: "gxcf-userinput",
  styleUrl: "gxcf_userinput.scss",
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
    return (
      <gxcf-collapseduserinput
        userInput={this.userInput}
      ></gxcf-collapseduserinput>
    );
  }

  private fullUserInput(): HTMLElement {
    return (
      <gxcf-fulluserinput
        userInput={this.userInput}
        flow={this.flow}
      ></gxcf-fulluserinput>
    );
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
