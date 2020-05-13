import Speech from '../lib/speech';
import { GoogleHome } from '../lib/google-home';
import BME280 from 'bme280-sensor';
import MHZ19 from 'mh-z19b';
import HueAPI from 'node-hue-api/lib/api/Api';
import { WebClient as SlackWebClient } from '@slack/web-api';

declare global {
    interface Utils {
        speaker: Speech,
        gHome: GoogleHome,
        slackWebClient: SlackWebClient,
        bme280: BME280,
        mhz19: MHZ19,
        hueBridge: HueAPI,
    }

    type Job = (date: Date, utils: Utils) => void;
    type JPSpeaker = 'woman' | 'boy' | 'gentleman';
}