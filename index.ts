import schedule from 'node-schedule';
import dotenv from 'dotenv';
dotenv.config();

import clockJob from './clock';
import comfortabilityJob from './comfortability';
import nhkRadioNewsJob from './NHKradioNews';

schedule.scheduleJob('   */10 * * * *', clockJob);
schedule.scheduleJob('10 */10 * * * *', comfortabilityJob);
schedule.scheduleJob('30    0 * * * *', nhkRadioNewsJob);

require('./earthquake-info');

// @ts-ignore
import MHZ19 from 'mh-z19b';
import notifyCO2Concentration from './CO2';

const mhz19 = new MHZ19();
schedule.scheduleJob('20 */10 * * * *', async () => {
    await notifyCO2Concentration(mhz19);
});

import { v3 as hueAPIv3 } from 'node-hue-api';
const hueAPI = hueAPIv3.api;
import { darkenLightsBy5, brightenLightsBy5 } from './HueLamps';

(async () => {
    const address = process.env.HUE_BRIDGE_ADDRESS!;
    const username = process.env.HUE_BRIDGE_USERNAME!;
    const bridge = await hueAPI.createLocal(address).connect(username);
    schedule.scheduleJob('* 0-6 * * *', async () => {
        await darkenLightsBy5(bridge);
    });
    schedule.scheduleJob('* 9-12 * * *', async () => {
        await brightenLightsBy5(bridge);
    });
})();