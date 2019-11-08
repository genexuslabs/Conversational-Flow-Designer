import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
import { ResponseElement } from "../../global/conversational-editor/instance-definition/elements/response-element";

@Component({
  tag: "gxcf-search",
  styleUrl: "search.scss",
  shadow: false
})
export class Search {
  @Event() search: EventEmitter;
  TriggerSearch(event): void {
    this.search.emit(event);
  }

  render() {
    return (
      <div class="Search">
        <div class="SearchIcon" />
        <input
          type="text"
          class="SearchText"
          placeholder="Search"
          onInput={event => {
            this.TriggerSearch(event);
          }}
        />
      </div>
    );
  }
}
