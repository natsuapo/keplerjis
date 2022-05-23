---
layout: default
title: Google Maps Timeline and KML
nav_order: 1 
parent: Data loading
---

# Google Maps Timeline

Google maps timeline (GMT) is a special data format provided by Google. The extension of Kepler.gl for Google Maps Timeline is introduced in the[previous work published on ICC 2021](https://www.researchgate.net/publication/357023205_Enhancing_Keplergl_for_processing_Google_Maps_Timeline_data).

Basically, there are two types of GMT data, the raw location history is converted to a point data (will further be converted to an extended trajectory layer), while the semantic location history is converted to several layers, among which the stay points are converted to a point layer while the origin-destination pairs are converted to an arc layer.

