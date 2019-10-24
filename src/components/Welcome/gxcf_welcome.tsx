import { Component, h, Event } from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
  tag: "gxcf-welcome",
  styleUrl: "gxcf_welcome.scss",
  shadow: false
})
export class GXCF_Welcome {
  @Event() openEditor:EventEmitter;
  OpenEditor(event)
  {
    this.openEditor.emit(event);
  }

  render() {
    return (
        <div id="Welcome" class="Welcome">
            <p class="Title">GeneXus Chatbot Generator</p>
            <p class="Intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a onClick={ (event) => { this.OpenEditor(event) } } class="Start">START HERE CREATING YOUR FIRST FLOW</a>
        </div>
    );
  }
}