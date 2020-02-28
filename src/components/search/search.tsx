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
        <div class="SearchIconDiv">
          <gxg-icon
            type="search"
            color="onbackground"
            size="small"
            class="SearchIcon"
          />
        </div>
        <input
          type="text"
          class="SearchText gxg-text"
          placeholder="Search"
          onInput={event => {
            this.TriggerSearch(event);
          }}
        />
      </div>
    );
  }
}
