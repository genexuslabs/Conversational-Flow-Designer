import { Component, Prop, h, EventEmitter, Event, State } from "@stencil/core";

@Component({
  tag: "gxcf-collection",
  styleUrl: "gxcf_collection.scss",
  shadow: false
})
export class GXCF_Collection {
    @Prop() collection: string[];
    @Prop() collectionHeader: string;
    @Prop() collectionHintId: string;
    @Prop() collectionHintDescription: string;
    @Prop() currentItemIndex: number;
    @Prop() currentItemValue: string;
    @State() refresh: boolean = true;

    @Event() addItem:EventEmitter;
    AddItem(event)
    {
        let newItem:string = "";
        this.collection.push(newItem);
        this.refresh = !this.refresh;
        this.addItem.emit(event);
    }

    @Event() deleteItem:EventEmitter;
    DeleteItem(event)
    {
        let element:HTMLDivElement = event.srcElement as HTMLDivElement;
        this.setCurrentIndex(element);
        this.collection.splice(this.currentItemIndex, 1);
        this.deleteItem.emit(event);
    }

    @Event() editItem:EventEmitter;
    EditItem(event:Event)
    {          
        console.log(event.srcElement)  
        let element:HTMLInputElement = event.srcElement as HTMLInputElement;
        this.setCurrentIndex(element);
        this.currentItemValue = element.value;
        console.log("TValue: "+this.currentItemValue);  
        this.editItem.emit(event);               
    }

    setCurrentIndex(element:any)
    {
        this.currentItemIndex = parseInt(element.getAttribute("data-item-index"));
        console.log("TIndex: "+this.currentItemIndex);
    }

    private AddItemElement = 
        <div id="AddItem" class="AddItem" onClick={ (event) => this.AddItem(event) }>
            <gxcf-pluselement></gxcf-pluselement><span>Add another sample trigger message</span>            
        </div>;

    private RenderizeItems(items:string[]):any[]{
        let renderedItems:any[] = [];
        console.log("Items: "+items.length)
        let index:number = 0;

        for(let index:number = 0; index < items.length; index++)
        {
            renderedItems.push(            
                <div class="Item">
                    <input data-item-index={index} class="ItemInput" type="text" value={items[index]} onChange={ (event) => this.EditItem(event) }></input>
                    <div data-item-index={index} class="Trash" onClick={ (event) => this.DeleteItem(event)}></div>
                </div>
            );
        }
        return renderedItems;
    }
    

    render() {
        if (this.collection == null){
            this.collection = new Array();
            this.collection.push("test1");
            this.collection.push("test2");
        }
        return (
            <div class="Collection">
                <span class="CollectionHeader">{this.collectionHeader}</span>
                <gxcf-hint hintId={this.collectionHintId} hintDescription={this.collectionHintDescription} class="TriggersHint"/>
                { this.RenderizeItems(this.collection) }
                { this.AddItemElement }
            </div>            
        );
    }
}