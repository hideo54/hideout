# hideout

![Main CI](https://github.com/hideo54/hideout/workflows/Main%20CI/badge.svg)
[![codecov](https://codecov.io/gh/hideo54/hideout/branch/master/graph/badge.svg)](https://codecov.io/gh/hideo54/hideout)

hidoe54's original smarthome system.

This system is well open-sourced, but special hardware setup is required; highly customized for my hardware and hideout Network.

## Features

以下を自動音声で通知します:

* 時報 (10分ごと)
* 部屋の温湿度が過度に不快である場合
* 部屋の二酸化炭素濃度が高い場合
* 地震速報
* 緊急地震速報
* NHKニュース速報
* NHKラジオニュース

また、次のような機能を持ちます:

* 夜寝る時間になったら自動で徐々に照明を暗くする。手動で戻してもなお暗くし続け、就寝を促す。
* 朝起きる時間になったら自動で徐々に照明を明るくする。手動で戻してもなお明るくし続け、起床を促す。

## How to run

### Hardware Dependency

* Raspberry Pi
* BME280 sensor connected through I2C
* MH-Z19 sensor connected through UART
* Google Home (to be depreacted)

### Preparation

1. Clone this repository.
1. Setup each hardware.
1. `cp sample.env .env` and edit it appropriately.
1. To use Google Text to Speech API, you need to issue `key.json` from Google Cloud Platform Console. Put it to the root.
1. `npm run production`
1. `mv dist` and `node index.js`. Use tools like pm2 for permanent running.

## Deploy

Just pulling from GitHub is not useful because there are so many ignored source files and secret keys. Therefore, deploy system using SFTP is supported. This approach can also avoid slow tsc compile. (tsc compile is too slow on Raspberry Pi.)

### Preparation

1. `cp sftpConfig.sample.json sftpConfig.json` and edit the latter appropriately in development environment.
1. Create `.env` appropriately in production environment.

### Deploy procedure

1. Run `npm run deploy` in development environment.
1. Run `npm run production` in production environment.