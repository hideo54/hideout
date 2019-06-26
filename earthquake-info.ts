import { GoogleHome } from './lib/GoogleHome';
import * as Speech from './lib/Speech';
import * as EventSource from 'eventsource';
import * as htmlToText from 'html-to-text';

const streamUrl = `https://unnerv.jp/api/v1/streaming/hashtag?tag=${encodeURI('地震')}`;
const es = new EventSource(streamUrl);
es.addEventListener('update', async event => {
    console.log(event);
    const data = JSON.parse(event.data);
    const content = htmlToText.fromString(data.content, {
        ignoreHref: true
    });
    const phrase = content.split('\n')[1].replace('M', 'マグニチュード');
    
    const speaker = new Speech.Speech();
    const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
    const voice = await speaker.getJPVoice(phrase, Speech.JPSpeaker.Gentleman);
    gHome.pushAudio(voice);
});