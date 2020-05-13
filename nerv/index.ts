import EventSource from 'eventsource';
import htmlToText from 'html-to-text';
import earthquakeHandler from './earthquake';

class ReadMastodonTootsStream {
    streamUrl: string;
    eventSource: EventSource;

    constructor(url: string, eventHandler: any) {
        this.streamUrl = url;
        this.eventSource = new EventSource(url);
        this.eventSource.addEventListener('update', eventHandler);
    }
}

const job = async (utils: Utils) => {
    const handlers: {
        url: string,
        handler: (text: string) => string | null,
        speaker: JPSpeaker,
    }[] = [
        {
            url: `https://unnerv.jp/api/v1/streaming/hashtag?tag=${encodeURI('地震')}`,
            handler: earthquakeHandler,
            speaker: 'gentleman',
        },
    ];
    for (const {url, handler, speaker} of handlers) {
        new ReadMastodonTootsStream(url, async (event: any) => {
            const data = JSON.parse(event.data);
            const content = htmlToText.fromString(data.content, {
                ignoreHref: true,
            });
            const phrase = handler(content);
            if (phrase) {
                const voice = await utils.speaker.getJPVoice(phrase, speaker);
                utils.gHome.pushAudio(voice);
            }
        });
    }
};

export default job;