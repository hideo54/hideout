import EventSource from 'eventsource';
import htmlToText from 'html-to-text';
import earthquakeHandler from './earthquake';
import breakingHandler from './breaking';
import eewHandler from './eew';

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
    const watchers: {
        hashtag: string,
        handler: (text: string) => string | null,
        speaker: JPSpeaker,
        headerChaim?: string
    }[] = [
        {
            hashtag: '地震',
            handler: earthquakeHandler,
            speaker: 'gentleman',
        },
        {
            hashtag: 'nhkニュース速報',
            handler: breakingHandler,
            speaker: 'gentleman',
            headerChaim: 'nhk-breaking-chaim',
        },
        {
            hashtag: '緊急', // 大抵緊急地震速報
            handler: eewHandler,
            speaker: 'gentleman',
        },
    ];
    for (const { hashtag, handler, speaker, headerChaim } of watchers) {
        const url = `https://unnerv.jp/api/v1/streaming/hashtag?tag=${encodeURI(hashtag)}`;
        new ReadMastodonTootsStream(url, async (event: any) => {
            const data = JSON.parse(event.data);
            const content = htmlToText.fromString(data.content, {
                ignoreHref: true,
            });
            const phrase = handler(content);
            if (phrase) {
                const voice = await utils.speaker.getJPVoice(phrase, speaker);
                utils.gHome.pushAudio(voice, headerChaim);
            }
        });
    }
};

export default job;