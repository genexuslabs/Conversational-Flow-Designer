import { Component, Prop, h, EventEmitter, Event, State, Listen } from "@stencil/core";
import { UserInputElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/UserInputElement";
import { RenderingOptions } from "../../global/ConversationalEditor/helpers/Helpers";
import { FlowElement } from "../../global/ConversationalEditor/instanceDefinition/Elements/FlowElement";
import { App } from "../../global/ConversationalEditor/App";

@Component({
  tag: "gxcf-userinput",
  styleUrl: "gxcf_userinput.scss",
  shadow: false
})
export class GXCF_UserInput {
    @Prop() userInput: UserInputElement;
    @State() refresh:boolean = false;

    @Listen('onExpandUserInput')
    HandleOnExpandUserInput(event:CustomEvent)
    {
        console.log("Event: "+event.type);        
        this.userInput.SetRenderType(RenderingOptions.Full);
        this.refresh = !this.refresh;
    }

    @Listen('onCollapseUserInput')
    HandleCollapseUserInput(event:CustomEvent)
    {
        console.log(event.type);
        this.userInput.SetRenderType(RenderingOptions.Summary);
        this.refresh = !this.refresh;
    }

    private collapsedUserInput():any
    {
        return (
            <gxcf-collapseduserinput userInput={this.userInput}></gxcf-collapseduserinput>
        );
    }

    private fullUserInput():any
    {
        return (
            <gxcf-fulluserinput userInput={this.userInput}></gxcf-fulluserinput>
        );
    }

    render() {
        console.log(this.userInput.RenderType)
        if (this.userInput.RenderType == RenderingOptions.Summary)
            return this.collapsedUserInput();
        if (this.userInput.RenderType == RenderingOptions.Full)
            return this.fullUserInput();
        return (<div>{this.userInput.RenderType} is not supported.</div>)
  }
}