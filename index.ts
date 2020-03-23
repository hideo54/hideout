import schedule from 'node-schedule';
import dotenv from 'dotenv';
dotenv.config();

import clockJob from './clock';
import comfortabilityJob from './comfortability';
import nhkRadioNewsJob from './NHKradioNews';

require('./earthquake-info');

schedule.scheduleJob('   */ 5 * * * *', clockJob);
schedule.scheduleJob('10 */10 * * * *', comfortabilityJob);
schedule.scheduleJob('30   10 * * * *', nhkRadioNewsJob);