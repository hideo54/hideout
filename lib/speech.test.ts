import Speech from './speech';

describe('lib/speech', () => {
    it('returns voice buffer correctly', async () => {
        const speech = new Speech();
        const voice = await speech.getJPVoice('test', { speaker: 'gentleman'});
        expect(voice).toStrictEqual(Buffer.from('test by ja-JP-Wavenet-D'));
    });
});