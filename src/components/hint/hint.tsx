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

  componentDidRender() {
    this.setDisplayNone();
  }

  setDisplayNone() {
    this.element.shadowRoot.querySelector("gxg-modal").style.display = "none";
  }

  hintIcon(): HTMLElement {
    return (
      <gxg-icon
        size="small"
        type="gemini-tools/notice"
        color="primary"
        onClick={() => this.handleShowHint()}
        style={{ verticalAlign: "middle", display: "inline-block" }}
      />
    );
  }

  render() {
    return [
      this.hintIcon(),
      <gxg-modal modalTitle={PropertiesDefinition.GetTitle(this.hintId)}>
        <gxg-text>{this.hintDescription}</gxg-text>
        <gxg-text
          type="text-link"
          href={PropertiesDefinition.GetURL(this.hintId)}
        >
          {this.componentLocale.more}
        </gxg-text>
      </gxg-modal>
    ];
  }
}
