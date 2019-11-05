import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";
import { PropertiesDefinition } from "../../global/conversational-editor/helpers/helpers";

@Component({
  tag: "custom-hint",
  styleUrl: "custom-hint.scss",
  shadow: false
})
export class Hint {
  @Prop() hintId: string;
  @State() refresh = true;

  @Event() showHint: EventEmitter;
  ShowHint(event): void {
    this.ShouldShow = true;
    this.refresh = !this.refresh;
    this.showHint.emit(event);
  }

  @Event() hideHint: EventEmitter;
  HideHint(event): void {
    this.ShouldShow = false;
    this.refresh = !this.refresh;
    this.showHint.emit(event);
  }
  private ShouldShow = false;

  private Show = (
    <div class="ShowHint">
      <span class="HintTitle">
        {PropertiesDefinition.GetTitle(this.hintId)}
      </span>
      <span onClick={event => this.HideHint(event)} class="CloseHint">
        x
      </span>
      <p class="HintDescription">
        {PropertiesDefinition.GetDescription(this.hintId)}
      </p>
    </div>
  );

  private Hint = (
    <span class="Hint" onClick={event => this.ShowHint(event)}>
      {PropertiesDefinition.GetLabel(this.hintId)}
    </span>
  );

  render() {
    if (this.ShouldShow) {
      this.ShouldShow = false;
      return (
        <div>
          {this.Hint}
          {this.Show}
        </div>
      );
    } else return <div>{this.Hint}</div>;
  }
}
