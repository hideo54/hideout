import { stripIndent } from 'common-tags';
import emergencyParser from './emergency';

describe('Report parser for emergency warning', () => {
    it('Parses critical Earthquake Emergency Warning', () => {
        const raw = stripIndent`
        《緊急地震速報（気象庁発表）》
        茨城沖で地震　強い揺れに警戒
        〈強い揺れが予想される地域〉
        茨城　福島　千葉　栃木　埼玉
        #茨城県 #福島県 #千葉県 #栃木県 #埼玉県 #緊急地震速報 #緊急`;
        const expected = '茨城沖で地震。強い揺れに警戒してください。茨城、福島、千葉、栃木、埼玉では、強い揺れに警戒してください。';
        expect(emergencyParser(raw)).toBe(expected);
    });
});