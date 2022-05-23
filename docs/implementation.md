---
layout: default
title: Implementation
nav_order: 1
---

# System implementation  

## Implementation in front-end system

- Directly implement this repo:
  
  Since it is totally a static website, you can directly clone it and run the html page. 
    
  Basic setting part: 
   
```    
    const KeplerElement = (function (react, keplerGl, mapboxToken) {
        return function(props) {
          return react.createElement(
            'div',
            {style: {position: 'relative', left: 0, width: '100vw', height: '100vh'}},
            react.createElement(
              keplerGl.KeplerGl,
              {
                mapboxApiAccessToken: mapboxToken,
                id: 'map',
                width: '100%', 
                height: '100%'
              }
            )
          )
        }
      }(React, KeplerGl, MAPBOX_TOKEN)); 
``` 

- settings: 
  - By default, the width and height are set to `100%`, you can modify that to any number or ratio. (this is an enhanced feature in this system as in the original system it does not support setting height and width as percentage.)

 
     
- Bundle js path: 
  - if you only want to use the bundle file. Just replace the official precompiled production UMD (`<script src="https://unpkg.com/kepler.gl/umd/keplergl.min.js" />`) to the following one: 

  ```
    <script src="https://cdn.jsdelivr.net/gh/natsuapo/keplerjis@main/keplergl.min.js" ></script>
  ```

  **Notice**: this bundle should have different result with the one built with `yarn start` as it does not include the extra functions in demo-app. In the bundle version, loading data with URL is unavailable. Since official map has the plan to include the URL reading part to the core, so in this moment I do not plan to extend this part. 


## Implement to Jupyter environment:
  
  - Map component settings are the same as original Kepler extension in Jupyter, but you need to save your map as an html and then use IFrame to visualize it in Jupyter. The detailed process is as follows: 
  
    - First, you need to modify the source code of `static/keplergl.html` in the path of keplergl python package. Replace `<script src="https://unpkg.com/kepler.gl@2.3.2/umd/keplergl.min.js" crossorigin>` with  `<script src="https://cdn.jsdelivr.net/gh/natsuapo/keplerjis@main/keplergl.min.js" ></script>
`
    - In your Jupyter Notebook, import the IFrame package and official KeplerGl package:

  ```
  from IPython.display import IFrame
  from keplergl import KeplerGl 
  ```

  - After creating the map, loading the map via IFrame instead of directly print the map variable.  

  ```
  map.save_to_html(file_name='<your_file_path>')
  Iframe(src='<your_file_path>')  
  ```

  ![image](https://user-images.githubusercontent.com/8382478/156770773-a2dfb8cf-d9b7-4b01-90a0-166aca11346f.png)



