import { Component, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "gxcf-search",
  styleUrl: "search.scss",
  shadow: true
})
export class Search {
  @Event() search: EventEmitter;
  TriggerSearch(event): void {
    this.search.emit(event);
  }

  render() {
    return (
      <div class="Search">
        <div class="SearchIcon">
          <gxg-icon type="search" color="onbackground" size="small" />
        </div>
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
