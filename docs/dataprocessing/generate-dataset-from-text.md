
# Generate dataset from text

This function is to make it easier for user to paste any data from other data sources. It does not need any input of data source to use this function, instead, it will generate a simple dataset based on the text input by users.

To use this function, paste any valid **WKB/WKT/GeoJSON** data into the input box, and set the data source name (optional).

After paste the data and click the `process` button, a data source, and a related GeoJSON layer will be automatically generated.

Kawagoe line with the input of WKB
![image](../images/kawagoe_line.png)

For GeoJSON data, it will be processed with the same output as the GeoJSON file, which means a data source with multiple rows and attribute columns. Here is an example of pasting the geojson data of [Fukushima prefecture](https://raw.githubusercontent.com/dataofjapan/land/master/fukushima.geojson).

![image](../images/fukushima_geojson.png)




