import { stripIndent } from 'common-tags';
import earthquakeParser from './earthquake';

describe('Report parser for earthquake news', () => {
    it('Parses abstract earthquake information', () => {
        const raw = stripIndent`
        【地震情報 2019年6月24日】
        9時11分頃、千葉県南東沖を震源とする地震がありました。震源の深さは約60km、地震の規模はM5.5、最大震度4を千葉県、東京都、神奈川県で観測しています。この地震による津波の心配はありません。
        #地震 #千葉県 #東京都 #神奈川県 #埼玉県 #山梨県 #静岡県 #茨城県 #栃木県 #群馬県 #長野県 #宮城県 #福島県 #新潟県`;
        const expected = '9時11分頃、千葉県南東沖を震源とする地震がありました。震源の深さは約60km、地震の規模はマグニチュード5.5、最大震度4を千葉県、東京都、神奈川県で観測しています。この地震による津波の心配はありません。';
        expect(earthquakeParser(raw)).toBe(expected);
    });

    it('Parses intensity report', () => {
        const raw = stripIndent`
        【地震 09:11】
        ［震度４］千葉南部、東京２３区、神奈川東部、神奈川西部
        ［震度３］埼玉南部、千葉北東部、千葉北西部、東京多摩東部、伊豆大島、新島、三宅島、山梨中・西部、山梨東部・富士五湖、伊豆地方、静岡東部
        #地震 #千葉県 #東京都 #神奈川県 #埼玉県 #山梨県 #静岡県`;
        const expected = '9時11分に地震が発生しました。震度４が、千葉南部、東京２３区、神奈川東部、神奈川西部、震度３が、埼玉南部、千葉北東部、千葉北西部、東京多摩東部、伊豆大島、新島、三宅島、山梨中・西部、山梨東部・富士五湖、伊豆地方、静岡東部、です。';
        expect(earthquakeParser(raw)).toBe(expected);
    });
});