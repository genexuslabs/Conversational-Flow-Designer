import { Component, Prop, h, State } from "@stencil/core";

@Component({
  tag: "gxcf-collection",
  styleUrl: "gxcf_collection.scss",
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

  AddItem(event): void {
    console.log(event);
    const newItem = "";
    this.collection.push(newItem);
    this.refresh = !this.refresh;
    this.itemParent.SetItem(
      this.currentItemIndex,
      this.currentItemValue,
      this.collectionType
    );
  }

  DeleteItem(event): void {
    const element: HTMLDivElement = event.srcElement as HTMLDivElement;
    this.setCurrentIndex(element);
    this.collection.splice(this.currentItemIndex, 1);
    console.log(event);
    this.itemParent.DeleteItem(this.currentItemIndex, this.collectionType);
  }

  EditItem(event: Event): void {
    const element: HTMLInputElement = event.srcElement as HTMLInputElement;
    this.setCurrentIndex(element);
    this.currentItemValue = element.value;
    console.log(event);
    this.itemParent.SetItem(
      this.currentItemIndex,
      this.currentItemValue,
      this.collectionType
    );
  }

  setCurrentIndex(element: any): void {
    this.currentItemIndex = parseInt(element.getAttribute("data-item-index"));
    console.log("TIndex: " + this.currentItemIndex);
  }

  private AddItemElement = (
    <div id="AddItem" class="AddItem" onClick={event => this.AddItem(event)}>
      <gxcf-addelement class="AddItemText"></gxcf-addelement>
      <span class="AddItemText">{this.collectionAddText}</span>
    </div>
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
          >
            X
          </div>
        </div>
      );
    }
    return renderedItems;
  }

  render() {
    if (this.collection == null) {
      this.collection = [];
      this.collection.push("test1");
      this.collection.push("test2");
    }
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
