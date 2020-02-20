import { Component, Prop, h, State } from "@stencil/core";
import { PropertiesDefinition } from "../common/helpers";

@Component({
  tag: "gxcf-hint",
  styleUrl: "hint.scss",
  shadow: true
})
export class Hint {
  @Prop() hintId: string;
  @State() shouldShow = false;

  HandleShowHint(event): void {
    console.log(event);
    this.shouldShow = true;
  }

  HandleHideHint(event): void {
    console.log(event);
    this.shouldShow = false;
  }

  private Show = (
    <div class="ShowHint">
      <span class="HintTitle">
        {PropertiesDefinition.GetTitle(this.hintId)}
      </span>
      <gxg-icon
        type="close"
        size="small"
        color="onbackground"
        onClick={event => this.HandleHideHint(event)}
        class="CloseHint"
      />
      <p class="HintDescription">
        {PropertiesDefinition.GetDescription(this.hintId)}
      </p>
      <a class="HintLink" href={PropertiesDefinition.GetURL(this.hintId)}>
        See more
      </a>
    </div>
  );

  private Hint = (
    <span class="Hint" onClick={event => this.HandleShowHint(event)}>
      {PropertiesDefinition.GetLabel(this.hintId)}
    </span>
  );

  render() {
    if (this.shouldShow) {
      return (
        <div>
          {this.Hint}
          {this.Show}
        </div>
      );
    } else return <div>{this.Hint}</div>;
  }
}
