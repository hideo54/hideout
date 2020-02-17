import { Speech } from '../lib/Speech';
import { GoogleHome } from '../lib/GoogleHome';
import schedule from 'node-schedule';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
dotenv.config();

export const generatePhrase = (date: Date) => {
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
    return phrase;
};

const job = async (date: Date) => {
    const phrase = generatePhrase(date);
    const speaker = new Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
    const voice = await speaker.getJPVoice(phrase, 'Woman');
    gHome.pushAudio(voice);
};

schedule.scheduleJob('*/5 * * * *', job);