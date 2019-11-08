import { Component, Prop, h, State, Event } from "@stencil/core";
import { EventEmitter } from "events";

@Component({
  tag: "gxcf-collection",
  styleUrl: "collection.scss",
  shadow: false
})
export class Collection {
  @Prop() collection: string[];
  @Prop() collectionHeader: string;
  @Prop() collectionAddText: string;
  @Prop() collectionHintId: string;
  @Prop() currentItemIndex: number;
  @Prop() currentItemValue: string;
  @Prop() itemParent: any;
  @Prop() collectionType: any;

  @State() refresh = true;

  @Event() deleteItem: EventEmitter;
  @Event() editItem: EventEmitter;

  public static readonly DataItemIndex = "data-item-index";

  AddItem(event): void {
    console.log(event);
    const newItem = "";
    this.collection.push(newItem);
    this.refresh = !this.refresh;
    if (this.itemParent) {
      this.itemParent.SetItem(
        this.currentItemIndex,
        this.currentItemValue,
        this.collectionType
      );
    }
  }

  DeleteItem(event): void {
    const element: HTMLDivElement = event.srcElement as HTMLDivElement;
    this.setCurrentIndex(element);
    this.collection.splice(this.currentItemIndex, 1);
    console.log(event);
    if (this.itemParent)
      this.itemParent.DeleteItem(this.currentItemIndex, this.collectionType);
    else this.deleteItem.emit(event, this.currentItemIndex);
  }

  EditItem(event): void {
    const element: HTMLInputElement = event.srcElement as HTMLInputElement;
    this.setCurrentIndex(element);
    this.currentItemValue = element.value;
    console.log(event);
    if (this.itemParent) {
      this.itemParent.SetItem(
        this.currentItemIndex,
        this.currentItemValue,
        this.collectionType
      );
    } else this.editItem.emit(event, this.currentItemIndex);
  }

  setCurrentIndex(element: any): void {
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
    console.log("Items: " + items.length);
    const index = 0;

    for (let index = 0; index < items.length; index++) {
      renderedItems.push(
        <div class="Item">
          <input
            data-item-index={index}
            class="ItemInput"
            type="text"
            value={items[index]}
            onChange={event => this.EditItem(event)}
          ></input>
          <div
            data-item-index={index}
            class="Trash"
            onClick={event => this.DeleteItem(event)}
          />
        </div>
      );
    }
    return renderedItems;
  }

  render() {
    return (
      <div class="Collection">
        <div class="CollectionContainer">
          <span class="CollectionHeader">{this.collectionHeader}</span>
          <gxcf-hint hintId={this.collectionHintId} class="Hint" />
          {this.RenderizeItems(this.collection)}
        </div>
        {this.AddItemElement}
      </div>
    );
  }
}
