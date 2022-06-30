---
layout: default
title: Data processing
nav_order: 5
has_children: true
permalink: /processing
nav_no_fold: false
---

# Data Processing (Beta)

Original Kepler.gl is almost impossible to conduct data processing, which means that we need to preprocess the data with other GIS tools or scripts and then upload to Kepler.gl for visualization. In this system, several data processing functions are implemented to make it easier for Kepler.gl to handle data independently.

Most of the data processing functions are implemented in a new side panel item titled Processor. In this panel, user need to choose the data source, target column, and processing functions (Notice that different column types will have different processing functions). After setting the parameters, user can click the `Process` button to execute the processing function.  

![image](../images/processor-side-panel.png)

For those functions which generate new data sources / columns, user can choose if to replace the old ones.

In addition, though not available in the implemented GitHub version, the combination of data processing is also available for different projects.

**Note**: since the processing functions are under developing, there might be some functions that are not available (with only names shown in the item lists), and some functions are not recorded in this document. 

## Developing memos
Since it is a totally new function developed by myself, the path is not available in the original kepler.gl. Basically, the processing functions are stored in `utils` path, while several new actions are added in `vis-state-actions.ts`. Different from the customized panel, I added a new `process-panel` folder in `src/components/side-panel` to build the side panel item for controlling and setting processing functions. 

Different from filters and visualization updates that will be refreshed for users' each action, the processing function will be called only when users click the process button.

In `default-settings`, I added an item of `PROCESS_LIST`, which controls the processing function list for each column type. 

