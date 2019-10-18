import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";

@Component({
  tag: "gxcf-hint",
  styleUrl: "gxcf_hint.scss",
  shadow: false
})
export class GXCF_Hint {
  @Prop() hintId: string;
  @Prop() hintDescription: string;

  @Event() showHint:EventEmitter;
  ShowHint(event)
  {
    this.showHint.emit(event);
  }

  render() {
    return (
        <p class="Hint" onClick={ (event) => this.ShowHint(event) }>{this.hintDescription}</p>
    );
  }
}