
# Spatial masking: 

Spatial masking aims to filter a data source by the geometry information from another data source. This geometry is a union of all geometry in the selected geometry column. 

The method has similar function with spatial filter in kepler.gl. However, spatial masking can filter data with more complicated boundaries than the geometries in spatial filter draw by users. In addition, since the filtered objects are saved in a new data source, there will be no filter generated in the old and new data source, which can reduce the time for spatial filtering every time when layers are rendered. 

To use this function, users need to set the target data source, target geometry column or target point pairs, mask data source and mask geometry column. 

The following case is a demo of extracting points in Kyoto Prefecture, with a prefecture data source pasted from database.  

Parameter settings and original GPS data
![image](../images/spatial_masking_before.png)

Filtered GPS in Kyoto Prefecture in a new data source
![image](../images/spatial_masking_after.png)












