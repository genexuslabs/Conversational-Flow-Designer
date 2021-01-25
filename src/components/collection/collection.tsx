import { Component, Prop, h, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";
import { Locale } from "../common/locale";
import { mode } from "@genexus/gemini/dist/types/components/accordion/accordion";

@Component({
  tag: "gxcf-collection",
  shadow: true,
  assetsDirs: ["assets/gxcf-collection-lang"]
})
export class Collection {
  @Prop() collection: string[];
  @Prop() collectionHeader: string;
  @Prop() collectionSummary: string;
  @Prop() collectionAddText = "";
  @Prop() collectionHintId: string;
  @Prop() defaultNewItemValue: string;
  @Prop() mode: mode = "minimal";

  @Event() deleteItem: EventEmitter;
  @Event() editItem: EventEmitter;

  @Element() element: HTMLElement;

  private componentLocale: any;
  private collectionLength: number;

  public static readonly DataItemIndex = "data-item-index";

  addItem(): void {
    if (!this.defaultNewItemValue)
      this.defaultNewItemValue = this.componentLocale.sampleMessage;
    this.collection.push(this.defaultNewItemValue);
    this.editItem.emit.call(this, {
      index: this.collection.length - 1,
      value: this.defaultNewItemValue
    });
  }

  handleClearButton(index) {
    this.deleteItem.emit.call(this, index);
  }

  handleEditItem(event, index): void {
    this.editItem.emit.call(this, {
      index: index,
      value: event.detail
    });
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") this.addItem();
  }

  addItemElement = (
    <gxg-button
      type="secondary-text-icon"
      icon="gemini-tools/add"
      onClick={() => this.addItem()}
    >
      {this.collectionAddText}
    </gxg-button>
  );

  renderizeItems(items: string[]): HTMLElement[] {
    const renderedItems: HTMLElement[] = [];
    for (let index = 0; index < items.length; index++) {
      renderedItems.push(
        <gxg-form-text
          data-item-index={index}
          value={items[index]}
          onChange={event => this.handleEditItem(event, index)}
          onKeyPress={event => this.handleKeyPress(event)}
          clearButton
          onClearButtonClicked={() => this.handleClearButton(index)}
        />
      );
    }
    return renderedItems;
  }

  scrollDown() {
    const domRect = this.element.getBoundingClientRect();
    this.element.shadowRoot.querySelector("gxg-spacer-layout").scrollTo({
      top: domRect.bottom + domRect.height,
      behavior: "smooth"
    });
  }

  async componentWillLoad(): Promise<void> {
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  componentWillRender() {
    this.collectionLength = this.collection.length;
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  render() {
    return (
      <gxg-accordion mode={this.mode}>
        <gxg-accordion-item
          mode={this.mode}
          itemTitle={`${this.collectionHeader} (${this.collectionLength})`}
          itemId="triggers"
          itemSubtitle={this.collectionSummary}
        >
          <gxg-spacer-layout orientation="vertical" space="xs">
            <gxg-scroll maxHeight="20vh">
              <gxg-spacer-layout
                orientation="vertical"
                space="xs"
                style={{ paddingRight: "var(--spacing-lay-xs)" }}
              >
                {this.renderizeItems(this.collection)}
              </gxg-spacer-layout>
            </gxg-scroll>
          </gxg-spacer-layout>
          {this.addItemElement}
        </gxg-accordion-item>
      </gxg-accordion>
    );
  }
}
