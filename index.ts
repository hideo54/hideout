import schedule from 'node-schedule';
import dotenv from 'dotenv';
dotenv.config();

import clockJob from './clock';
import comfortabilityJob from './comfortability';
import nhkRadioNewsJob from './NHKradioNews';

schedule.scheduleJob('    */5 * * * *', clockJob);
schedule.scheduleJob('10 */10 * * * *', comfortabilityJob);
schedule.scheduleJob('30 */10 * * * *', nhkRadioNewsJob);

require('./earthquake-info');

import { v3 as hueAPIv3 } from 'node-hue-api';
import { dimLightsBy5 } from './HueLamps';
const hueAPI = hueAPIv3.api;
(async () => {
    const address = process.env.HUE_BRIDGE_ADDRESS!;
    const username = process.env.HUE_BRIDGE_USERNAME!;
    const bridge = await hueAPI.createLocal(address).connect(username);
    schedule.scheduleJob('* 0-6 * * *', async () => {
        await dimLightsBy5(bridge);
    });
})();