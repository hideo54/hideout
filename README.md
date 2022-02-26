# hideout

Original Smarthome System for hideo54.

## v2: Re-created.

引っ越しに伴い住居環境が大幅に変化したため、1から作り直すことになりました。

## Features

- [x] DNS
- [ ] Proxy (WIP)
- [ ] Original Prometheus exporter
- [ ] Audio broadcast API through speaker
- [ ] Breaking News
- [ ]
- [ ] API (migration with auth)
- [ ] Welcome page (migration from hideout-web)

### Related (but not this repository)

* hideout-API (deprecated)
* hideout-web (deprecated)
* Original Homebridge accessories (WIP)

## Prerequisites

* Set up BME280 sensor with I2C
* Set up MH-Z19 sensor with UART (WIP)
* Run the program through pm2 in sudo
* Make `src/http-proxy/table.json`
