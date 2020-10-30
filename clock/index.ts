import moment from 'moment-timezone';

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

const job: Job = async (date: Date, utils: Utils) => {
    const phrase = generatePhrase(date);
    const voice = await utils.speaker.getJPVoice(phrase, { makeCache: true });
    utils.gHome.pushAudio(voice);
};

export default job;