import {
  Component,
  Prop,
  h,
  State,
  Listen,
  Event,
  EventEmitter
} from "@stencil/core";
import { UserInputElement } from "../../global/conversational-editor/instance-definition/elements/user-input-element";
import { RenderingOptions } from "../../global/conversational-editor/helpers/helpers";
import { FlowElement } from "../../global/conversational-editor/instance-definition/elements/flow-element";
import { EventHandler } from "../../global/conversational-editor/event-handler";

@Component({
  tag: "gxcf-user-input-container",
  styleUrl: "user-input-container.scss",
  shadow: true
})
export class UserInput {
  @Prop() userInput: UserInputElement;
  @Prop() flow: FlowElement;
  @State() refresh = false;

  @Listen("expandUserInput")
  HandleOnExpandUserInput(event: CustomEvent): void {
    console.log("Event: " + event.type);
    this.userInput.SetRenderType(RenderingOptions.Full);
    this.refresh = !this.refresh;
  }

  @Listen("collapseUserInput")
  HandleCollapseUserInput(event: CustomEvent): void {
    console.log(event.type);
    this.userInput.SetRenderType(RenderingOptions.Collapsed);
    this.refresh = !this.refresh;
  }

  @Listen("modifyUserInputName")
  HandleOnModifyUserInputName(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventHandler.GetValue(event);
    if (value != null) {
      this.userInput.SetName(value);
      this.refresh = !this.refresh;
    }
  }

  @Listen("modifyUserInputFirstAskMessage")
  HandleOnModifyUserInputFirstAskMessage(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventHandler.GetValue(event);
    if (value != null) {
      this.userInput.SetFirstAskMessage(value);
      this.refresh = !this.refresh;
    }
  }

  @Event() deleteUserInput: EventEmitter;
  TriggerDeleteUserInput(event): void {
    this.deleteUserInput.emit(event);
  }

  private collapsedUserInput(): HTMLElement {
    return <gxcf-user-input-collapsed userInput={this.userInput} />;
  }

  private fullUserInput(): HTMLElement {
    return (
      <gxcf-user-input-full
        userInput={this.userInput}
        flow={this.flow}
        onDeleteUserInputFull={event => this.TriggerDeleteUserInput(event)}
      />
    );
  }

  render() {
    console.log(this.userInput.RenderType);
    if (this.userInput.RenderType == RenderingOptions.Collapsed)
      return this.collapsedUserInput();
    if (this.userInput.RenderType == RenderingOptions.Full)
      return this.fullUserInput();
    return <div>{this.userInput.RenderType} is not supported.</div>;
  }
}
