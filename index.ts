import schedule from 'node-schedule';
import dotenv from 'dotenv';
dotenv.config();

import BME280 from 'bme280-sensor';
import MHZ19 from 'mh-z19b';

import { v3 as hueAPIv3 } from 'node-hue-api';
const hueAPI = hueAPIv3.api;

import { Speech } from './lib/speech';
import { GoogleHome } from './lib/google-home';

const init = async () => {
    const speaker = new Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS!);
    const bme280 = new BME280({
        i2cBusNo: 1,
        i2cAddress: 0x76,
        outputsInfo: false,
});
    await bme280.init();
    const mhz19 = new MHZ19();
    const hueAddress = process.env.HUE_BRIDGE_ADDRESS!;
    const hueUsername = process.env.HUE_BRIDGE_USERNAME!;
    const hueBridge = await hueAPI.createLocal(hueAddress).connect(hueUsername);
    const utils = {
        speaker, gHome, bme280, mhz19, hueBridge,
    } as Utils;
    return utils;
};

import clockJob from './clock';
import notifyCO2Concentration from './co2';
import comfortabilityJob from './comfortability';
import nhkRadioNewsJob from './nhk-radio-news';
import { darkenLightsBy5, brightenLightsBy5 } from './lib/hue-lamps';

require('./earthquake-info');

init().then(utils => {
    schedule.scheduleJob(' 0 */10 * * * *', async date => {
        await clockJob(date, utils);
    });
    schedule.scheduleJob('10 */10 * * * *', async date => {
        await comfortabilityJob(date, utils);
    });
    schedule.scheduleJob('30 */10 * * * *', async date => {
        await notifyCO2Concentration(date, utils);
    });
    schedule.scheduleJob('40    0 * * * *', async date => {
        await nhkRadioNewsJob(date, utils);
    });
    schedule.scheduleJob('* 0-6 * * *', async () => {
        await darkenLightsBy5(utils.hueBridge);
    });
    schedule.scheduleJob('* 9-12 * * *', async () => {
        await brightenLightsBy5(utils.hueBridge);
    });
    });