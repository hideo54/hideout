import * as Speech from './lib/Speech';
import { GoogleHome } from './lib/GoogleHome';
import * as schedule from 'node-schedule';
import * as moment from 'moment-timezone';
import * as dotenv from 'dotenv';
dotenv.config();

schedule.scheduleJob('*/5 * * * *', async date => {
    const speaker = new Speech.Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
    const fireDate = moment(date).tz('Asia/Tokyo');
    let phrase = `時刻は${fireDate.format('h')}時`;
    switch (fireDate.minute()) {
        case 0:
            phrase += '';
            break;
        case 30:
            phrase += '半';
            break;
        default:
            phrase += `${fireDate.minute()}分`;
    }
    phrase += 'です。';
    const voice = await speaker.getJPVoice(phrase, Speech.JPSpeaker.Woman);
    gHome.pushAudio(voice);
});