import { LitElement, html } from "lit-element";
import { MapViewer, customElementIfNotExists } from "../components";
import { locations } from "./feature-collection";
import type { Feature } from "geojson";

@customElementIfNotExists("showcase-app")
export class ShowcaseApp extends LitElement {
  public override render() {
    return html`<div class="buttongroup">
      <button @click=${() => this.setFeatures(locations)}>Heatmap</button>
      <a
        href="https://github.com/AnWeber/lit-maplibre/blob/main/src/components/map-viewer.ts#L71"
        >Source</a
      >
    </div>`;
  }

  private get mapViewer(): MapViewer {
    return document.querySelector("map-viewer") as MapViewer;
  }

  private setFeatures(features: Array<Feature>) {
    this.mapViewer.features = features;
  }
}
