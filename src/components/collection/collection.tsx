import { Component, Prop, h, State, Event, Element } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
  tag: "gxcf-collection",
  styleUrl: "collection.scss",
  shadow: true
})
export class Collection {
  @Prop() collection: string[];
  @Prop() collectionHeader: string;
  @Prop() collectionAddText: string;
  @Prop() collectionHintId: string;
  @Prop() currentItemIndex: number;
  @Prop() currentItemValue: string;
  @Prop() defaultNewItemValue: string;
  @State() collectionLength: number;

  @Event() deleteItem: EventEmitter;
  @Event() editItem: EventEmitter;

  @Element() element: HTMLElement;

  public static readonly DataItemIndex = "data-item-index";

  AddItem(event): void {
    console.log(event);
    if (!this.defaultNewItemValue) this.defaultNewItemValue = "Sample message";
    this.collection.push(this.defaultNewItemValue);
    this.collectionLength = this.collection.length;
  }

  HandleDeleteItem(event): void {
    const element: HTMLDivElement = event.srcElement as HTMLDivElement;
    this.SetCurrentIndex(element);
    this.collection.splice(this.currentItemIndex, 1);
    this.deleteItem.emit(event, this.currentItemIndex);
  }

  HandleEditItem(event): void {
    const element: HTMLInputElement = event.srcElement as HTMLInputElement;
    this.SetCurrentIndex(element);
    this.currentItemValue = element.value;
    this.editItem.emit(event, this.currentItemIndex);
  }

  HandleKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") this.AddItem(event);
  }

  SetCurrentIndex(element: HTMLElement): void {
    this.currentItemIndex = parseInt(
      element.getAttribute(Collection.DataItemIndex)
    );
  }

  private AddItemElement = (
    <gxcf-add-object
      addText={this.collectionAddText}
      onClick={event => this.AddItem(event)}
    />
  );

  private RenderizeItems(items: string[]): HTMLElement[] {
    const renderedItems: HTMLElement[] = [];
    for (let index = 0; index < items.length; index++) {
      renderedItems.push(
        <div class="Item">
          <input
            data-item-index={index}
            class="ItemInput"
            type="text"
            value={items[index]}
            onChange={event => this.HandleEditItem(event)}
            onKeyPress={event => this.HandleKeyPress(event)}
          ></input>
          <gxg-icon
            type="close"
            color="onbackground"
            size="small"
            data-item-index={index}
            class="Delete"
            onClick={event => this.HandleDeleteItem(event)}
          />
        </div>
      );
    }
    return renderedItems;
  }

  componentWillLoad(): void {
    this.collectionLength = this.collection.length;
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
      <div class="Collection">
        <div class="CollectionContainer">
          <span class="CollectionHeader">{`${this.collectionHeader} (${this.collectionLength})`}</span>
          <gxcf-hint hintId={this.collectionHintId} class="Hint" />
          <div class="CollectionContainer ItemsRender" id="ItemsRender">
            {this.RenderizeItems(this.collection)}
          </div>
        </div>
        {this.AddItemElement}
      </div>
    );
  }
}
