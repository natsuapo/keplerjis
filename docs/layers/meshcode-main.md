---
layout: default
title: Mesh code related layers
nav_order: 4
parent: Layer enhancement
has_children: true
has_toc: false
---

# Mesh code related layers

Japanese standard mesh code is widely utilized in the statistic context of Japan. There is a special branch of mesh code statistic conducted by Statistics Bureau, and researchers prefer to visualize grid aggregation in the format of mesh code for better visualization performance.

In the original Kepler.gl, the mesh code data could be visualized by Polygon layer, with the input of the mesh code polygon GeoJSON file. 
As a result, the data volume would be very large if we upload all geometry information to the browser for visualizing, and the rendering computation for each grid is complicated, which cause the poor performance of map visualization when there are a lot of grids. In addition, we cannot change the mesh size for customized aggregation, e.g. if we need the statistic results for both level-3 mesh (1km), and level-4 mesh (500m), we need to upload both the GeoJSON files of the statistical results in these two mesh levels.

Therefore, in this system three types of Japanese standard mesh code related layers are developed for better handling and visualizing grid information. 

These layers are as follows: 
- [Mesh code layer](meshcode-layer)
- [Mesh aggregation layer](meshagg-layer)
- [Mesh re-aggregation layer](meshreagg-layer)

Mesh code related layer is realized with the [jismesh-js package](https://github.com/yoshizow/jismesh-js). The minimum level of mesh code is level-6 (125m).



