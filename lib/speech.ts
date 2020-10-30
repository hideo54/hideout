import crypto from 'crypto';
import { promises as fs } from 'fs';
import TextToSpeech from '@google-cloud/text-to-speech';

const jpSpeakerName: {[key in JPSpeaker]: string} = {
    woman: 'ja-JP-Wavenet-B',
    boy: 'ja-JP-Wavenet-C',
    gentleman: 'ja-JP-Wavenet-D',
};

interface GetJPVoiceOption {
    speaker?: JPSpeaker;
    rate?: number;
    makeCache?: boolean;
}

export default class Speech {
    // @ts-ignore
    private client;
    static speakerName = jpSpeakerName;

    constructor() {
        this.client = new TextToSpeech.TextToSpeechClient();
    }

    async getJPVoice(text: string, { speaker = 'woman', rate = 1.1, makeCache = false }: GetJPVoiceOption) {
        const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex');
        const path =`${__dirname}/../audio/cache/${md5}.mp3`;
        const audio = await fs.readFile(path).catch(async () => {
            const request = {
                input: { text },
                voice: {
                    languageCode: 'ja-JP',
                    name: jpSpeakerName[speaker],
                },
                audioConfig: {
                    audioEncoding: 'MP3' as const,
                    speakingRate: rate,
                    volumeGainDb: 0.0,
                },
            };
            const [ response ] = await this.client.synthesizeSpeech(request);
            const audio = response.audioContent as Buffer;
            if (makeCache) {
                await fs.writeFile(path, audio, 'binary');
            }
            return audio;
        });
        return audio;
    }
}