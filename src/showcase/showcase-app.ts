import { LitElement, html } from "lit-element";
import { MapViewer, customElementIfNotExists } from "../components";
import { locations } from "./feature-collection";
import type { Feature } from "geojson";

@customElementIfNotExists("showcase-app")
export class ShowcaseApp extends LitElement {
  public override render() {
    return html`<div class="buttongroup">
      <button @click=${() => this.setFeatures(locations)}>Heatmap</button>
    </div>`;
  }

  private get mapViewer(): MapViewer {
    return document.querySelector("map-viewer") as MapViewer;
  }

  private setFeatures(features: Array<Feature>) {
    this.mapViewer.features = features;
  }
}
