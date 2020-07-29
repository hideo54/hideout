import { stripIndent } from 'common-tags';
import breakingParser from './breaking';
import eewParser from './eew';

describe('NERV streaming', () => {
    it('NHK breaking news', () => {
        const raw = stripIndent`
        【NHKニュース速報 17:27】
        緊急事態宣言　３９県の解除を諮問へ
        茨城・石川・岐阜・愛知・福岡含む
        #ニュース #NHKニュース速報`;
        const expected = '速報。緊急事態宣言、３９県の解除を諮問へ。茨城・石川・岐阜・愛知・福岡含む。緊急事態宣言、３９県の解除を諮問へ。茨城・石川・岐阜・愛知・福岡含む。';
        expect(breakingParser(raw)).toBe(expected);
    });

    it('Critical Earthquake Emergency Warning', () => {
        const raw = stripIndent`
        《緊急地震速報（気象庁発表）》
        茨城沖で地震　強い揺れに警戒
        〈強い揺れが予想される地域〉
        茨城　福島　千葉　栃木　埼玉
        #茨城県 #福島県 #千葉県 #栃木県 #埼玉県 #緊急地震速報 #緊急`;
        const expected = '茨城沖で地震。強い揺れに警戒してください。茨城、福島、千葉、栃木、埼玉では、強い揺れに警戒してください。';
        expect(eewParser(raw)).toBe(expected);
    });
});