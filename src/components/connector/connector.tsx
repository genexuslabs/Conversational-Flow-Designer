import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxcf-connector",
  styleUrl: "connector.scss",
  shadow: true
})
export class Connector {
  @Prop() sourceX: number;
  @Prop() sourceY: number;
  @Prop() targetX: number;
  @Prop() targetY: number;

  render() {
    return (
      <svg class="SVGConnector">
        <line
          class="PolyLineConnector"
          x1={this.sourceX}
          y1={this.sourceY}
          x2={this.targetX}
          y2={this.targetY}
        />
      </svg>
    );
  }
}

/*
<polyline
          class="PolyLineConnector"
          points={`${this.sourceX} ${this.sourceY}, ${this.targetX} ${this.targetY}`}
        />
        */
