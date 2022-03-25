# Enhanced Kepler.gl for JISMesh Visualization

This [demo](https://natsuapo.github.io/keplerjis) is an extension of the [work](https://www.researchgate.net/publication/357023205_Enhancing_Keplergl_for_processing_Google_Maps_Timeline_data) published in ICC 2021. The demo includes two new features:
- Meshcode data visualization;
- Meshcode aggregation visualization;

In this demo, the following functions are available:
- Loading Google takeout data;
- Field deleting;


#### Notes:
  - For other functions. The demo will be prepared later.
  - Currently, the enhanced part is only in English, the Japanese version will be established later.
  - You will need internet to load the base map.

## Mainly enhanced functions:

## Layer visualization:
#### JISMesh Visualization:
- For meshcode based aggregation, choosing JIS(ID) layer type. Basically, the system can detect meshcode field.
  - Loading spatial data -> Choose layer type **JIS(ID)**
  ![jismesh](figs/meshid_layer_choose.png)
  - The system can automatically detect the field meshcode for data visualization, for other field name, you need to choose it in the item selector.
   ![jismesh](figs/meshcode_field_choose.png)

- The JisMesh layer extends column layer, so it is able to load big jismesh for visualization. However, the boundary will be automatically generalized (like what is shown above) for reducing memory usage, but if you zoom in, you will find the accurate bounds for each grid.
  - When loading big jismesh, the loading part will take time while moving viewport the rendering is rather smooth.

#### JISMesh aggregation:
- For point data in Japan, choosing JIS(Agg) layer type.
  - Loading spatial data -> Choose layer type **JIS(Agg)**


  ![jismesh](figs/mesh_choose.png)

- You can moving slider to change the mesh size.
  - Meshcode is computed by [jismesh](https://github.com/yoshizow/jismesh-js) package.
  - Current support Mesh Level 1 (1次メッシュ) to Mesh Level 6 (6次メッシュ)
  - Mesh level 3:
  ![jismesh](figs/mesh_level_3.png)
  - mesh level 4:
  ![](figs/mesh_level_4.png)

#### (Update 02/17) JISMesh Reaggregation:
- This layer enhances the old point and mesh layer for aggregation visualization.
- This layer will be powerful in the following cases:
     - If you want to know the aggregation result in a specific time window.
     - If you want to change the mesh unit and view the aggregation results.
- Input files that suitable for this layer:
  - any files with meshcode columns. More powerful with other statistic attributes.
- This layer is very powerful in the context of dashboard visualization. (with time filters, etc.)
- Example with the same file (dummy data) in different mesh level.
<img width="1416" alt="image" src="https://user-images.githubusercontent.com/8382478/154476922-08eb9000-881a-4cd2-b0e3-deb2fa186cb1.png">
<img width="1424" alt="image" src="https://user-images.githubusercontent.com/8382478/154477073-6f315075-424e-40c7-b64f-36a77aca3951.png">

#### Zoom to layer function
- The update includes:
  - Add a zoom to layer button for each layer in the layer configurator. Anytime when you click the button, the map view will be returned to the layer extent.

![image](https://user-images.githubusercontent.com/8382478/152116121-23b1a0c7-eff3-4c47-a70d-c087cd88ecf6.png)

#### enhanced IconLayer:
- Currently, IconLayer can support the visualization of extra icons listed in Mapbox Maki.
![image](https://user-images.githubusercontent.com/8382478/153706447-a4ed91fa-f464-43c2-8022-54680c8b652a.png)


#### (beta) enhanced TripLayer(TrajectoryLayer):
The enhanced triplayer allows you to directly input any csv file with lon, lat, timestamp and userid for visualizing trajectory.



## Data loading and processing:

#### Google takeout data loading:
- This demo also supports google takeout data loading and visualizing.
  - Support loading both google gps data and google semantic data;
     - For sementic data: two data sources will be generated;
     - For GPS data: one datasource;
  ![](figs/google_takeout_data.png)

#### Field deleting:
- After opening the data table of a specific datasource.You can choose to delete any field.
  ![](figs/delete_column.png)

## Basemap visualization:
### Base map of 国土地理院, OSM and Carto Dark
- The update includes:
  - Make it possible for Kepler.gl to handle the tiles that are not in Mapbox format.
  - Change the default base map and view port settings and make it easier for Japanese user to use.

## Other updates:
- (update 2022/2/15) Modifying several actions for better creating dashboard.
- (update 2022/3/3) Modify layer/filter/datasource remove part;
- (update 2022/3/18) Update Kepler.gl version from 2.5.4 to 2.5.5 (with more typescript and some new features);

## implementation:
- Directly implement this repo:
  - Since it is totally a static website, you can directly clone it and run the html page.

- Implement to Jupyter environment:
  - Map component settings are the same as original Kepler extension in Jupyter, but you need to save your map as an html and then use IFrame to visualize it in Jupyter.
  - Firstly, you need to modify the source code of `static/keplergl.html` in the path of keplergl package. Replace `<script src="https://unpkg.com/kepler.gl@2.3.2/umd/keplergl.min.js" crossorigin>` with  `<script src="https://natsuapo.github.io/keplerjis/keplergl.min.js" crossorigin>`
  - In your Jupyter Notebook, import the IFrame package and official KeplerGl package:

  ```
  from IPython.display import IFrame
  from keplergl import KeplerGl
  ```

  - Then use the following code example for visualization:
  ![image](https://user-images.githubusercontent.com/8382478/156770773-a2dfb8cf-d9b7-4b01-90a0-166aca11346f.png)



## Ideas and plans:
- [x] Currently, Kepler.gl icon layer is very limited in icon types. Especially, the train label is not available. I am investigating how to add more icons.
- [x] Reaggregation function for meshcode level.
- [x] Trip layer enhancement: will enhance trip layer for eaiser processing and visualization.
- [x] Processor function add: paste wkb or geojson to directly generate a datasource and layer.
- [ ] Add more processing function to the extended kepler.
- [ ] Create new layer from filterings.
- [x] Support directly loading topojson file. 
