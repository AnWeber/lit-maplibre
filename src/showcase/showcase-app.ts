import { LitElement, html } from "lit-element";
import { MapViewer, customElementIfNotExists } from "../components";
import { locations } from "./feature-collection";
import type { Feature } from "geojson";

@customElementIfNotExists("showcase-app")
export class ShowcaseApp extends LitElement {
  constructor() {
    super();
    this.setFeatures(locations);
  }

  public override render() {
    return html`<div class="buttongroup">
      <button @click=${() => this.setFeatures(locations)}>Heatmap</button>
      <button @click=${() => this.toggleVisible()}>Show/ Hide Layer</button>
      <a
        href="https://github.com/AnWeber/lit-maplibre/blob/main/src/components/map-viewer.ts"
        >Source</a
      >
    </div>`;
  }

  private get mapViewer(): MapViewer {
    return document.querySelector("map-viewer") as MapViewer;
  }

  private setFeatures(locations: Array<Feature>) {
    this.mapViewer.locations = locations;
  }
  private toggleVisible() {
    this.mapViewer.toggled = !this.mapViewer.toggled;
  }
}
