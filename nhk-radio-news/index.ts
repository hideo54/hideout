import axios from 'axios';
import moment from 'moment-timezone';

const fetchLatestNews = async ()  => {
    const apiUrl = 'https://api.nhk.or.jp/r-news/v1/newslist.js';
    const data = await axios.get(apiUrl).then(response => {
        return JSON.parse(response.data // `radionews(…);`
            .slice('radionews('.length) // `…);`
            .slice(0, -2) // `…`
        );
    });
    const latestNews = data.news[data.news.length - 1];
    // `latestNews` example:
    //// {
    ////     "startdate": "Mon, 01 Jul 2019 10:00:03 +09:00",
    ////     "enddate": "Mon, 01 Jul 2019 10:05:00 +09:00",
    ////     "title": "午前10時のNHKニュース",
    ////     "soundlist": {
    ////         "sound_normal": {
    ////             "size": "2376621",
    ////             "type": "mp3",
    ////             "duration": "297",
    ////             "filename": "20190701100003_23355_1_1_1"
    ////         },
    ////         "sound_fast": {},
    ////         "sound_slow":{}
    ////     }
    //// }
    const filename = latestNews.soundlist.sound_normal.filename;
    const startDateRFC2822String = `${latestNews.startdate.slice(0, -3)}00` // Cut colon in "+09:00"
    return {
        date: moment(startDateRFC2822String).tz('Asia/Tokyo'),
        url: `https://www.nhk.or.jp/r-news/ondemand/mp3/${filename}.mp3`,
    };
};

const job: Job = async (date: Date, utils: Utils) => {
    const news = await fetchLatestNews();
    if (news.date.hour() === moment(date).hour()) {
        utils.gHome.pushAudioUrl(news.url);
    }
};

export default job;