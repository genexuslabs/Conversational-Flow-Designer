import { Component, Prop, h, State, Event, Element } from "@stencil/core";
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
  @State() collectionLength: number;

  @Event() deleteItem: EventEmitter;
  @Event() editItem: EventEmitter;

  @Element() element: HTMLElement;

  private componentLocale: any;

  public static readonly DataItemIndex = "data-item-index";

  addItem(event): void {
    console.log(event);
    if (!this.defaultNewItemValue)
      this.defaultNewItemValue = this.componentLocale.sampleMessage;
    this.collection.push(this.defaultNewItemValue);
    this.collectionLength = this.collection.length;
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
    if (event.key === "Enter") this.addItem(event);
  }

  addItemElement = (
    <gxcf-add-object
      addText={this.collectionAddText}
      onClick={event => this.addItem(event)}
    />
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

  async componentWillLoad(): Promise<void> {
    this.collectionLength = this.collection.length;
    this.componentLocale = await Locale.getComponentStrings(this.element);
  }

  componentDidRender(): void {
    const inputs = this.element.shadowRoot.querySelectorAll("input");
    if (inputs.length > 0) {
      inputs.item(inputs.length - 1).select();
      const scrollTo = inputs.item(inputs.length - 1).offsetTop;
      const itemsRender: HTMLElement = this.element.shadowRoot.querySelector(
        "#ItemsRender"
      ) as HTMLElement;
      itemsRender.scrollTop = scrollTo;
    }
  }

  render() {
    return (
      <gxg-accordion mode="boxed">
        <gxg-accordion-item
          mode="boxed"
          itemTitle={`${this.collectionHeader} (${this.collectionLength})`}
          itemId="triggers"
          padding="xs"
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
