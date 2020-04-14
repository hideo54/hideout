import MHZ19 from 'mh-z19b';
import * as Speech  from '../lib/Speech';
import { GoogleHome } from '../lib/GoogleHome';

export default async (sensor: MHZ19) => {
    const value = await sensor.readCO2();
    if (value < 500) return;
    let phrase = `現在の二酸化炭素濃度は${value}ppmです。`;
    if (value >= 1000) phrase += '今すぐ換気してください。';

    const speaker = new Speech.Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
    const voice = await speaker.getJPVoice(phrase, Speech.JPSpeaker.Gentleman);
    gHome.pushAudio(voice);
};