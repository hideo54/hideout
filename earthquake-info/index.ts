import EventSource from 'eventsource';
import htmlToText from 'html-to-text';

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
    // @ts-ignore
    const earthquakeEventHandler = async event => {
        const data = JSON.parse(event.data);
        const content = htmlToText.fromString(data.content, {
            ignoreHref: true
        });

        // `content` example 1
        //// 【地震情報 2019年6月24日】
        //// 9時11分頃、千葉県南東沖を震源とする地震がありました。震源の深さは約60km、地震の規模はM5.5、最大震度4を千葉県、東京都、神奈川県で観測しています。この地震による津波の心配はありません。
        //// #地震 #千葉県 #東京都 #神奈川県 #埼玉県 #山梨県 #静岡県 #茨城県 #栃木県 #群馬県 #長野県 #宮城県 #福島県 #新潟県
        // https://unnerv.jp/@UN_NERV/102323677977611526

        // `content` example 2
        //// 【地震 09:11】
        //// ［震度４］千葉南部、東京２３区、神奈川東部、神奈川西部
        //// ［震度３］埼玉南部、千葉北東部、千葉北西部、東京多摩東部、伊豆大島、新島、三宅島、山梨中・西部、山梨東部・富士五湖、伊豆地方、静岡東部
        //// #地震 #千葉県 #東京都 #神奈川県 #埼玉県 #山梨県 #静岡県
        // https://unnerv.jp/@UN_NERV/102323670536881278

        let phrase = '';
        if (content.split('\n')[0].slice(1, 5) === '地震情報') {
            // Pattern 1
            phrase += content.split('\n')[1].replace('M', 'マグニチュード');
        } else {
            // Pattern 2
            for (const line of content.split('\n').slice(1, -1)) {
                const intensity = line.split('］')[0].slice(1);
                const areasText = line.split('］')[1];
                phrase += `${intensity}は、${areasText}。`;
            }
            phrase = phrase.slice(0, -1); // to remove 。 at the end
            phrase += 'です。';
        }
        const voice = await utils.speaker.getJPVoice(phrase, 'gentleman');
        utils.gHome.pushAudio(voice);
    }
    const earthquakeInfoStreamUrl = `https://unnerv.jp/api/v1/streaming/hashtag?tag=${encodeURI('地震')}`;
    new ReadMastodonTootsStream(earthquakeInfoStreamUrl, earthquakeEventHandler);
};

export default job;