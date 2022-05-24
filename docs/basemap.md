---
layout: default
title: Base map
nav_order: 3
has_children: false
permalink: /basemap
---

# Base Map

Original Kepler.gl provides several types of Mapbox base maps and user can add their own Mapbox base map in the base map side panel. However, these maps cannot be visualized without Mapbox Tokens and there are no tutorials for adding base maps besides Mapbox style. In this enhancement, the approach of adding external base maps is finally made out and all base maps in kepler.gl which require Mapbox Tokens have been replaced by open source base maps.

The method of switching base map is the same as the original Kepler.gl. The following screen shows the current implementation of include OpenStreetMap, Dark Matter, Positron and Geospatial Information Authority of Japan(GSI). In addition, for the ease of use in Japan, the default base map is the one provided by GSI, and the default map view is the Tokyo area.

![image](images/basemap_gsi.png)

## Developing memos

### Using customized tile server in kepler.gl

Kepler.gl is compatible with the customized map format in deck.gl. So the method to add customized map is to modify the default map settings in `default-settings` (I forget if I have modified the code of reading tile maps based with deck.gl format)

### Example of the tile structure: 
```
  {
    id: 'Chirin',
    label:'国土地理院',
    url:null,
    icon:'https://cyberjapandata.gsi.go.jp/xyz/std/0/0/0.png',
    style:{
      "center":[139,35],
      "zoom":10,
      "version": 8,
      "sources": {
        "simple-tiles": {
          "type": "raster",
          "tiles":["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
          "tileSize": 256
        }
      },
      "layers": [{
        "id": "simple-tiles",
        "type": "raster",
        "source": "simple-tiles",
        "minzoom": 0,
        "maxzoom": 23
      }]
    }
  }

```

In the future, I will try to make out how to modify the add customized map part in Kepler.gl to make it possible for user to load customized non-mapbox map.