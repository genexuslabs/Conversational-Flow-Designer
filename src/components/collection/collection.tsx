import { Component, Prop, h, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";
import { Locale } from "../common/locale";

@Component({
  tag: "gxcf-collection",
  shadow: true,
  styleUrl: "collection.scss",
  assetsDirs: ["assets/gxcf-collection-lang"]
})
export class Collection {
  @Prop() collection: string[];
  @Prop() collectionHeader: string;
  @Prop() collectionSummary: string;
  @Prop() collectionAddText: string;
  @Prop() collectionHintId: string;
  @Prop() defaultNewItemValue: string;

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
      icon="add"
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
      <gxg-accordion mode="boxed">
        <gxg-accordion-item
          mode="boxed"
          itemTitle={`${this.collectionHeader} (${this.collectionLength})`}
          itemId="triggers"
          padding="m"
        >
          <gxg-text slot="subtitle">{this.collectionSummary}</gxg-text>
          <gxg-spacer-layout
            orientation="vertical"
            space="xs"
            class="ScrollableMediumHeight"
          >
            {this.renderizeItems(this.collection)}
          </gxg-spacer-layout>
          {this.addItemElement}
        </gxg-accordion-item>
      </gxg-accordion>
    );
  }
}
