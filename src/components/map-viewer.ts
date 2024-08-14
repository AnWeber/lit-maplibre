/**
 * Copyright 2019 Justin Fagnani <justin@fagnani.com>
 */
import { LitElement, PropertyValues, css } from "lit";
import { property } from "lit/decorators.js";
import type { Feature } from "geojson";
import { customElementIfNotExists } from "./custom-element.js";
import * as maplibregl from "maplibre-gl";
import { osmStyle } from "./osm-style.js";

const heatMapSource = "heatmap_data_source";

@customElementIfNotExists("map-viewer")
export class MapViewer extends LitElement {
  private _map?: maplibregl.Map;

  @property({ type: Array })
  public features?: Array<Feature>;

  public override connectedCallback() {
    super.connectedCallback();

    const container = document.createElement("div");
    container.classList.add("mapcontainer");
    this.shadowRoot?.appendChild(container);

    this._map = new maplibregl.Map({
      container,
      style: osmStyle,
      center: [-120, 50],
      zoom: 2,
    });

    this._map.on("load", () => this.mapLoaded());
  }

  public override updated(propertyValues: PropertyValues): void {
    super.updated(propertyValues);
    if (propertyValues.has("features") && this._map) {
      console.info(
        JSON.stringify(
          this.features?.map((f) => ({ ...f, properties: undefined }))
        )
      );
      const source = this._map.getSource(heatMapSource);

      if (source instanceof maplibregl.GeoJSONSource) {
        source.setData({
          type: "FeatureCollection",
          features: this.features || [],
        });
      }
    }
  }

  private mapLoaded(): void {
    if (!this._map) {
      return;
    }

    this._map.addSource(heatMapSource, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    this._map.addLayer({
      id: "heatmap_layer",
      type: "heatmap",
      source: heatMapSource,
      maxzoom: 9,
      paint: {
        // // Increase the heatmap weight based on frequency and property magnitude
        // "heatmap-weight": [
        //   "interpolate",
        //   ["linear"],
        //   ["get", "mag"],
        //   0,
        //   0,
        //   6,
        //   1,
        // ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparency color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "rgb(103,169,207)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(239,138,98)",
          1,
          "rgb(178,24,43)",
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
      },
    });
  }
  public static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    .mapcontainer {
      position: absolute;
      height: calc(100% - 50px);
      width: 100%;
    }
  `;
}
