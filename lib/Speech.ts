import TextToSpeech from '@google-cloud/text-to-speech';
import * as dotenv from 'dotenv';
dotenv.config();

export enum JPSpeaker {
    Woman = 'ja-JP-Wavenet-B',
    Boy = 'ja-JP-Wavenet-C',
    Gentleman = 'ja-JP-Wavenet-D'
}

export class Speech {
    // @ts-ignore
    private client;

    constructor() {
        this.client = new TextToSpeech.TextToSpeechClient();
    }

    async getJPVoice(text: string, speaker: JPSpeaker = JPSpeaker.Woman, rate: number = 1.1) {
        const request = {
            input: { text },
            voice: {
                languageCode: 'ja-JP',
                name: speaker
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: rate,
                volumeGainDb: 0.0
            }
        };
        const [ response ] = await this.client.synthesizeSpeech(request);
        return response.audioContent;
    }
}