---
layout: default
title: Data processing
nav_order: 4 
has_children: true
permalink: /processing
nav_no_fold: false
---

# Data Processing

Original Kepler.gl is almost impossible to conduct data processing, which means that we need to preprocess the data with other GIS tools or scripts and then upload to Kepler.gl for visualization. In this system, several data processing functions are implemented to make it easier for Kepler.gl to handle data independently. 

Most of the data processing functions are implemented in a new side panel item titled Processor. In this panel, user need to choose the data source, target column, and processing functions. Notice that different column types will have different processing functions. In the current stage, this part is still developing and not all function introduction is available. 

In addition, though not available in the implemented GitHub version, the combination of data processing is also available for different projects. 

