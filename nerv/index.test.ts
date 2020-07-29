import { stripIndent } from 'common-tags';
import breakingParser from './breaking';

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
});