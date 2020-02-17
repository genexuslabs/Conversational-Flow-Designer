import {
  Component,
  Prop,
  h,
  Listen,
  Event,
  EventEmitter,
  Element
} from "@stencil/core";
import { RenderingOptions } from "../common/helpers";
import { EventsHelper } from "../common/events-helper";
import { StringCollectionHelper } from "../common/string-collection-helper";

@Component({
  tag: "gxcf-user-input-container",
  styleUrl: "user-input-container.scss",
  shadow: true
})
export class UserInput {
  @Prop() userInput: GXCFModel.UserInputElement;
  @Prop() flow: GXCFModel.FlowElement;
  @Prop() instance: GXCFModel.Instance;
  @Prop() renderType: RenderingOptions;
  @Element() element: HTMLElement;

  @Event() setUserInputName: EventEmitter;
  TriggerSetUserInputName(value: string): void {
    this.setUserInputName.emit.call(this, {
      flowName: this.flow.Name,
      currentUserInputName: this.userInput.Variable,
      newUserInputName: value
    });
  }

  @Listen("modifyUserInputName")
  HandleOnModifyUserInputName(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventsHelper.GetValue(event);
    this.TriggerSetUserInputName(value);
  }

  @Event() setAskMessages: EventEmitter;
  TriggerSetAskMessages(index: number, value: string, remove: boolean): void {
    this.setAskMessages.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable,
      askMessages: StringCollectionHelper.FormatCollection(
        this.userInput.RequiredMessages,
        index,
        value,
        remove
      )
    });
  }

  @Listen("modifyUserInputFirstAskMessage")
  HandleOnModifyUserInputFirstAskMessage(event: CustomEvent): void {
    console.log("Event: " + event.type);
    const value = EventsHelper.GetValue(event);
    this.TriggerSetAskMessages(0, value, false);
  }

  @Event() deleteUserInput: EventEmitter;
  TriggerDeleteUserInput(): void {
    this.deleteUserInput.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  @Event() expandUserInputOut: EventEmitter;
  TriggerExpandUserInputOut(event): void {
    console.log(event);
    this.expandUserInputOut.emit.call(this, { source: this.element });
  }

  @Event() collapseUserInputOut: EventEmitter;
  TriggerCollapseUserInputOut(event): void {
    console.log(event);
    this.collapseUserInputOut.emit.call(this, { source: this.element });
  }

  @Listen("expandUserInput")
  HandleOnExpandUserInput(event: CustomEvent): void {
    this.TriggerExpandUserInputOut(event);
  }

  @Listen("collapseUserInput")
  HandleCollapseUserInput(event: CustomEvent): void {
    this.TriggerCollapseUserInputOut(event);
  }

  @Event() clickOnUserInputName;
  @Listen("clickOnUserInputNameInternal")
  TriggerClickOnUserInputName(event: CustomEvent): void {
    console.log(event);
    this.clickOnUserInputName.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  @Event() selectUserInput: EventEmitter;
  TriggerSelectUserInput(): void {
    this.selectUserInput.emit.call(this, {
      flowName: this.flow.Name,
      userInput: this.userInput.Variable
    });
  }

  private collapsedUserInput(): HTMLElement {
    return (
      <gxcf-user-input-collapsed
        userInput={this.userInput}
        onClick={() => this.TriggerSelectUserInput()}
      />
    );
  }

  private fullUserInput(): HTMLElement {
    return (
      <gxcf-user-input-full
        userInput={this.userInput}
        flow={this.flow}
        instance={this.instance}
        onDeleteUserInputFull={() => this.TriggerDeleteUserInput()}
        onClick={() => this.TriggerSelectUserInput()}
      />
    );
  }

  render() {
    if (this.renderType == RenderingOptions.Collapsed)
      return this.collapsedUserInput();
    if (this.renderType == RenderingOptions.Full) return this.fullUserInput();
    return <div>{this.renderType} is not supported.</div>;
  }
}
