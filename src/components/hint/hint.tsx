import { Component, Prop, h, Element } from "@stencil/core";
import { PropertiesDefinition } from "../common/helpers";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-hint",
  shadow: true,
  assetsDirs: ["assets/gxcf-hint-lang"]
})
export class Hint {
  @Prop() hintId: string;
  @Element() element: HTMLElement;
  private componentLocale: any;
  private hintDescription: string;

  handleShowHint(): void {
    console.log(this.element);
    const modal = this.element.shadowRoot.querySelector("gxg-modal");
    modal.setAttribute("visible", "true");
    modal.style.display = "block";
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
    this.hintDescription = await Locale.getHint(this.hintId);
  }

  render() {
    return (
      <gxg-moder-info
        more-info-label={this.componentLocale.more}
        target="_blank"
        url={PropertiesDefinition.GetURL(this.hintId)}
        label={this.hintDescription}
      />
    );
  }
}
