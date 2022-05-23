---
layout: default
title: Mesh re-aggregation layer
nav_order: 3
parent: Mesh code related layers
---


# Mesh re-aggregation layer

Mesh code re-aggregation layer is a combination of Mesh code ID layer and Mesh code aggregation layer. Functionally it is more like aggregation layer and also extend from aggregation layer, however, the input data of this layer is a table with mesh code column. Comparing to mesh code layer, all meshes are rendered once, regardless of how many records are in the data source. In addition, mesh code could be scaled down to lower mesh level.

Mesh code re-aggregation layer outperforms mesh code layer with the same input, more functions and less rendering times. But since the mesh code re-aggregation might get errors with wrong field values, the system still keeps both layers for users to choose.

To use mesh re-aggregation layer, users need to define the mesh code column.




