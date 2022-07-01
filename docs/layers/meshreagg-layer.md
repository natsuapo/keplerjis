---
layout: default
title: Mesh re-aggregation layer
nav_order: 3
parent: Mesh code related layers
grand_parent: Layer enhancement
---

# Mesh re-aggregation layer

Mesh code re-aggregation layer is a combination of Mesh code ID layer and Mesh code aggregation layer. Functionally it is more like aggregation layer and also extend from aggregation layer, however, the input data of this layer is a table with mesh code column. Comparing to mesh code layer, all meshes are rendered once, regardless of how many records are in the data source. In addition, mesh code could be scaled down to lower mesh level.

To use mesh re-aggregation layer, similar to mesh code layer, users need to define the mesh code column. And then the re-aggregated mesh result will be visualized in the map, with the default mesh level 3. (In input data the mesh level is 6)

![image](../images/reagg_level_3_vis_main.png)

Similar to mesh aggregation layer, the mesh level is controlled by the slider:

![image](../images/reagg_level_4_vis_main.png)

Mesh re-aggregation layer outperforms mesh code layer with the same input, more functions and less rendering times. But since the mesh re-aggregation layer keeps the same mesh code level for all grids, and automatically do aggregation for the same mesh code, mesh code layer is still more suitable for some application scenario.

Currently, mesh code up-scaling is not available, so please use the mesh code level smaller than the original mesh code level of your raw data. This limitation will be handled in the future.