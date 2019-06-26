import * as Speech from './lib/Speech';
import { GoogleHome } from './lib/GoogleHome';
import * as schedule from 'node-schedule';
import * as moment from 'moment-timezone';
import * as dotenv from 'dotenv';
dotenv.config();

schedule.scheduleJob('*/10 * * * *', async date => {
    const speaker = new Speech.Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
    const fireDate = moment(date).tz('Asia/Tokyo');
    const phrase = `時刻は${fireDate.hour()}時${fireDate.minute()}分です。`;
    const voice = await speaker.getJPVoice(phrase, Speech.JPSpeaker.Boy);
    gHome.pushAudio(voice);
});