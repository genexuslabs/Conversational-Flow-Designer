import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { PropertiesDefinition } from "../../global/ConversationalEditor/helpers/Helpers";

@Component({
  tag: "gxcf-hint",
  styleUrl: "gxcf_hint.scss",
  shadow: false
})
export class GXCF_Hint {
  @Prop() hintId: string;
  @Prop() hintDescription: string;
  @State() refresh = true;

  @Event() showHint:EventEmitter;
  ShowHint(event)
  {
    this.ShouldShow = true;
    this.refresh = !this.refresh;
    this.showHint.emit(event);
  }

  @Event() hideHint:EventEmitter;
  HideHint(event)
  {
    this.ShouldShow = false;
    this.refresh = !this.refresh;
    this.showHint.emit(event);
  }
  private ShouldShow = false;

  private Show = <div class="ShowHint">
                    <span class="HintTitle">{PropertiesDefinition.GetTitle(this.hintId)}</span>
                    <span onClick={ (event) => this.HideHint(event) } class="CloseHint">x</span>
                    <p class="HintDescription">{PropertiesDefinition.GetDescription(this.hintId)}</p> 
                  </div>;

  private Hint = <p class="Hint" onClick={ (event) => this.ShowHint(event) } >{this.hintDescription}</p>;

  render() {
    if (this.ShouldShow)
    {
      this.ShouldShow = false;
      return (
        <div>
          { this.Hint }
          { this.Show }
        </div>
      );
    }
    else
      return (
          <div>
            { this.Hint }
          </div>
      );
  }
}