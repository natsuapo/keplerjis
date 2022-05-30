---
layout: default
title: Overview
nav_order: 1
---

# Make kepler.gl a better GIS tool

## Introduction  

This system is an adaption of Kepler.gl, which makes it more powerful as a GIS tool especially for spatial data scientists in Japan. The enhancement is made up of the following aspects: 

- [Data Loading](dl-main)
- [Base Map](basemap)
- [Layers](layer)
- [Data Processing](processing)
- [Interaction functions](interaction-main)

## Demo
A static browser [demo](https://natsuapo.github.io/keplerjis/demo.html) is available. The website is built with loading the minimized UMD file. Which is different from the building method of the [official demo](https://kepler.gl/demo).

## Implementation and acknowledgement

- [Implementation](implementation)

- Acknowledgement:
  - The previous study of this project is presented in [ICC 2021 conference](https://www.researchgate.net/publication/357023205_Enhancing_Keplergl_for_processing_Google_Maps_Timeline_data). (now it is just an abstract, and I plan to extend it to a full paper.)

```
@article{xia2021enhancing,
  title={Enhancing Kepler. gl for processing Google Maps Timeline data},
  author={Xia, Tianqi and Kanasugi, Hiroshi and Fan, Zipei and Si, Ruochen and Feng, Chuyao and Takayasu, Hiroshi and Shibasaki, Ryosuke},
  journal={Abstracts of the ICA},
  volume={3},
  pages={319},
  year={2021}
}
```

- Contribution:
  - Any contribution to the original [kepler.gl](https://github.com/keplergl/kepler.gl) is welcome.
  - Any issue and bug report in this [repo](https://github.com/natsuapo/keplerjis/issues) is welcome.
    - I am still on modifying the code, I will make the forked kepler.gl repo open in the future.
