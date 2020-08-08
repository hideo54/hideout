import Speech from './speech';

describe('lib/speech', () => {
    it('returns voice buffer correctly', async () => {
        const speech = new Speech();
        const voice = await speech.getJPVoice('test', 'gentleman');
        expect(voice).toStrictEqual(Buffer.from('test by ja-JP-Wavenet-D'));
    });
    it('returns woman voice buffer if not specified', async () => {
        const speech = new Speech();
        const voice = await speech.getJPVoice('test');
        expect(voice).toStrictEqual(Buffer.from('test by ja-JP-Wavenet-B'));
    });
});