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
            <p class="Intro">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <a onClick={ (event) => { this.OpenEditor(event) } }>START HERE CREATING YOUR FIRST FLOW</a>
        </div>
    );
  }
}