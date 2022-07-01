---
layout: default
title: Address related functions
nav_order: 3 
parent: Data processing
---

# Address related functions


1. TOC
{:toc}

Address related functions include those functions that modify address data, geocoding, and generate address data with coordinates (reverse geocoding) or other information (API). Since there is no column type of address, all address related functions are available in the item list of `string` type columns. 

Not like other data processing which can be conducted offline, most of the address related functions need to call API to get extra data.

In this system, the address related functions mainly use Google API and aims to process Google related data (e.g. GMT data). Since google API does not support CORS, in the previous research and demo I built a simple server to forward Google API results, which might against the terms of use of Google API if I open it in the demo. **So in the current stage, the address related functions, especially those using Google API, are out of service in the demo app**. 

Nevertheless, I have the plan to make some functions offline, and make the API request part more flexible, so as the users can request the data from their own server.

## Address query with place ID using Google API 

This function takes the input of google place ID column, and call Google place API to get the address information. In addition, user need to input the API token for query. Notice that google does not allow users to save place information instead of place ID. So this function is only used for visualization, or modify the result of GMT data (I assume that since GMT data is provided by Google, it should be OK to modify it without against terms of use).

The demo of this function requires users to input the level of administrative area and the access token. Then the query result will be downloaded and stored in the `datacontainer`. The figure shows an example of using this function with the settings, here I created two columns with different levels of administrative regions.

![image](../images/google-api-query-v2.png)

## POI type query with place ID using Google API

This function is to utilize place ID to get the POI type, so that the detailed POI will be categorized to the POI types for data science use　and at the same time desensitize the personal information (user can choose to delete the previous column, or directly set the column as the POI name column to replace it.)

![image](../images/place_to_place_type%20.png)


## GeoCoding using Google API

This function is to convert the address to coordinates using Google API. This API requires two output columns to respectively store the longitude and latitude.

![image](../images/geocoding_result.png)

Tips: Basically there are two API with the similar function. Coordinates could be acquired by text search via Google Place API, an API that will return a place object with the input text, no matter what the user input is a POI name, address or abbreviation, while it can also be acquired by GeoCoding API, which only accepts address inputs and the output are coordinates. Though geocoding API is more restricted in input data and has no semantic information output, it can return the coordinates even the there is no POI in address users query, and is cheaper than place API. 


























