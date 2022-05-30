---
layout: default
title: Developing plans
nav_order: 8
permalink: /future-work

---

# Limitations and plan roadmap:

Most of the current limitations in this system are mentioned in the previous sections. 

Here I list a memo of the extra system enhancement function application and demand after the ICC work.

Note some development plans are overlapped with [those of official kepler.gl](https://github.com/keplergl/kepler.gl/wiki/Kepler.gl-2019-Roadmap#allow-loading-base-map-tiles-from-a-custom-tile-server--rfc--). But it seems that there is 

- [x] Currently, Kepler.gl icon layer is very limited in icon types. Especially, the train label is not available. I am investigating how to add more icons.
- [x] Reaggregation function for mesh code level.
- [x] Trip layer enhancement: will enhance trip layer for easier processing and visualization.
- [x] Processor function add: paste wkb or GeoJSON to directly generate a data source and layer.
- [x] Support directly loading TopoJSON file.
- [x] Japanese municipality based data visualization.


- [ ] Add better UI for error cases.
- [ ] Add more processing function to the extended Kepler.
- [ ] Try to implement some front-end AI libraries. 
- [ ] Create new layer from filterings.
- [ ] Enhancing legend part for map data output.
- [ ] Add a function to encoding shift-jis.

Any demand request is welcome. 
