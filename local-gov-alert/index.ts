import axios from 'axios';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';

const url = 'http://www.bousai-mail.jp/suginami/musen/';

const getLatest = async () => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const source = iconv.decode(res.data, 'Shift_JIS');
    const $ = cheerio.load(source);
    const latestLink = $('a').first().attr('href')!;
    const latestDateStr = $('body').text().match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}/)![0];
    const latestDate = new Date(latestDateStr);
    return { link: latestLink, date: latestDate };
};

const getPhrase = async (url: string) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    const source = iconv.decode(res.data, 'Shift_JIS');
    const $ = cheerio.load(source);
    const text = $('body').text();
    const body = text.match(/→「(\S[^」]*)」/)![1];
    return body;
};

const job: Job = async (date: Date, utils: Utils) => {
    const latest = await getLatest();
    const phrase = await getPhrase(url + latest.link);
    if (Number(date) - 2 * 60 * 1000 < Number(latest.date)) { // Within 2 minutes
        const voice = await utils.speaker.getJPVoice(phrase, { speaker: 'gentleman' });
        utils.gHome.pushAudio(voice);
    }
};

export default job;