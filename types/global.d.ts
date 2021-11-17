import Speech from '../lib/speech';
import { GoogleHome } from '../lib/google-home';
import BME280 from 'bme280-sensor';
import MHZ19 from 'mh-z19b';

declare global {
    interface Utils {
        speaker: Speech;
        gHome: GoogleHome;
        bme280: BME280,
        mhz19: MHZ19;
    }

    type Job = (date: Date, utils: Utils) => Promise<void>;
    type JPSpeaker = 'woman' | 'boy' | 'gentleman';
}
