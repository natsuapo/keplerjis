---
layout: default
title: Mesh aggregation layer
nav_order: 4
parent: Mesh code related layers
grand_parent: Layer enhancement
---

# Mesh aggregation layer

Mesh aggregation layer is inspired by Grid Layer. This layer takes point as input. Similar to grid layer, mesh aggregation layer extends from aggregation layer, and can automatically aggregate the points into each mesh and compute the statistic result based on the attributes. Mesh aggregation layer is powerful in visualizing mesh density without preprocessing the points. In addition, it can be shifted to different levels and re-rendered immediately.  

To use mesh aggregation layer, users just need to shift a point layer to the JIS(agg) layer. Then the points will be aggregated to mesh level-3 by default. 

![image](../images/point_mesh_agg.png)

To shift the mesh level, users just need to move the slider of mesh level.

![image](../images/mesh3_mesh5.png)





