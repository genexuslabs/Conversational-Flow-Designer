import { Component, Prop, h, State, Element } from "@stencil/core";
import { PropertiesDefinition } from "../common/helpers";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-hint",
  styleUrl: "hint.scss",
  shadow: true,
  assetsDirs: ["assets/gxcf-hint-lang"]
})
export class Hint {
  @Prop() hintId: string;
  @State() shouldShow = false;
  @Element() element: HTMLElement;
  private componentLocale: any;

  HandleShowHint(event): void {
    console.log(event);
    this.shouldShow = true;
  }

  HandleHideHint(event): void {
    console.log(event);
    this.shouldShow = false;
  }

  private getShow(): HTMLElement {
    return (
      <div class="ShowHint">
        <span class="gxg-title-03">
          {PropertiesDefinition.GetTitle(this.hintId)}
        </span>
        <gxg-icon
          type="close"
          size="small"
          color="onbackground"
          onClick={event => this.HandleHideHint(event)}
          class="CloseHint"
        />
        <p class="gxg-text">
          {PropertiesDefinition.GetDescription(this.hintId)}
        </p>
        <a class="gxg-link" href={PropertiesDefinition.GetURL(this.hintId)}>
          {this.componentLocale.more}
        </a>
      </div>
    );
  }

  private Hint = (
    <span class="Hint gxg-link" onClick={event => this.HandleShowHint(event)}>
      {PropertiesDefinition.GetLabel(this.hintId)}
    </span>
  );

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  render() {
    if (this.shouldShow) {
      return (
        <div>
          {this.Hint}
          {this.getShow()}
        </div>
      );
    } else return <div>{this.Hint}</div>;
  }
}
