# Make Kepler.gl a better GIS tool

## Introduction  

This system is an adaption of Kepler.gl, which makes it more powerful as a GIS tool, especially for spatial data scientists in Japan. The [demo](https://natsuapo.github.io/keplerjis/demo.html) and the [document](https://natsuapo.github.io/keplerjis) are available.

<img width="1397" alt="image" src="https://user-images.githubusercontent.com/8382478/169823138-3ae30de3-2ec2-410d-a314-160364087be0.png">


The enhancement is made up of the following aspects:

- [Data Loading](https://natsuapo.github.io/keplerjis/dl-main)
- [Base Map](https://natsuapo.github.io/keplerjis/basemap)
- [Layers](https://natsuapo.github.io/keplerjis/layer)
- [Data Processing](https://natsuapo.github.io/keplerjis/processing)
- [Interaction functions](https://natsuapo.github.io/keplerjis/interaction-main)

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
  - Any contribution to the original [Kepler.gl](https://github.com/keplergl/kepler.gl) is welcome.
  - Any issue and bug report in this [repo](https://github.com/natsuapo/keplerjis/issues) is welcome.
    - I am still on modifying the code, I will make the enhanced Kepler.gl repo open in the future.




**Notes:**

- Currently, the enhanced part is only in English, the Japanese version will be established later.
- You will need internet to load the base map.


## Recent big updates

- JISMesh Reaggregation layers implemented.
- Modifying several actions for better creating dashboard.
- Modify layer/filter/datasource remove part;
- Update Kepler.gl version from 2.5.4 to 2.5.5 (with more typescript and some new features);
- Update the document.


