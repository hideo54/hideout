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

        // `content` example 2
        //// 【地震 09:11】
        //// ［震度４］千葉南部、東京２３区、神奈川東部、神奈川西部
        //// ［震度３］埼玉南部、千葉北東部、千葉北西部、東京多摩東部、伊豆大島、新島、三宅島、山梨中・西部、山梨東部・富士五湖、伊豆地方、静岡東部
        //// #地震 #千葉県 #東京都 #神奈川県 #埼玉県 #山梨県 #静岡県

        // `content` example 3
        //// 1/6地震の活動状況等に関する情報
        //// 南海トラフ地震関連解説情報
        //// ＊＊　見出し　＊＊
        //// 　第３１回南海トラフ沿いの地震に関する評価検討会、第４０９回地震防災対策強化地域判定会で、南海トラフ周辺の地殻活動を評価しました。
        //// ＊＊　本文　＊＊
        //// 　今回開催した第３１回南海トラフ沿いの地震に関する評価検討会、第４０９回地震防災対策強化地域判定会で評価した、南海トラフ周辺の地殻活動の調査結果は以下のとおりです。
        //// 　現在のところ、南海トラフ沿いの大規模地震の発生の可能性が平常時（注）と比べて相対的に高まったと考えられる特段の変化は観測されていません。
        //// 　（注）南海トラフ沿いの大規模地震（Ｍ８からＭ９クラス）は、「平常時」においても今後３０年以内に発生する確率が７０から８０％であり、昭和東南海地震・昭和南海地震の発生から既に７０年以上が経過していることから切迫性の高い状態です。
        //// １．地震の観測状況
        //// （顕著な地震活動に関係する現象）
        //// 　南海トラフ周辺では、特に目立った地震活動はありませんでした。
        //// （ゆっくりすべりに関係する現象）
        //// #地震 #地震の活動状況等に関する情報

        const lines = content.split('\n');
        const [ _, hourStr, minuteStr ] = lines[0].match(/^【地震 ([0-9]{2}):([0-9]{2})/) || [];
        if (hourStr && minuteStr) {
            // Pattern 2
            const hour = Number(hourStr);
            const minute = Number(minuteStr);
            const phrases = [`${hour}時${minute}分に地震が発生しました。`];
            const info = lines.filter(line => line.startsWith('［'));
            const scales = new Map();
            for (const i of info) {
                const [ _, scale, areas ] = i.match(/^［震度([１２３４５６７][弱強]?)］(\S*)$/) || [];
                phrases.push(`震度${scale}が、${areas}、`);
            }
            phrases.push('です。');
            const voice = await utils.speaker.getJPVoice(phrases.join(), 'gentleman');
            utils.gHome.pushAudio(voice);
        } else if (lines[0].startsWith('【地震情報')) {
            // Pattern 1
            const phrase = lines[1].replace('M', 'マグニチュード');
            const voice = await utils.speaker.getJPVoice(phrase, 'gentleman');
            utils.gHome.pushAudio(voice);
        }
        // Pattern 3 is ignored
    }
    const earthquakeInfoStreamUrl = `https://unnerv.jp/api/v1/streaming/hashtag?tag=${encodeURI('地震')}`;
    new ReadMastodonTootsStream(earthquakeInfoStreamUrl, earthquakeEventHandler);
};

export default job;