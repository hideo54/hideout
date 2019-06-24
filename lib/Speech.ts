import { fstat } from "fs";

const textToSpeech = require('@google-cloud/text-to-speech').v1beta1;

require('dotenv').config();

export enum JPVoice {
    Woman = 'ja-JP-Wavenet-B',
    Boy = 'ja-JP-Wavenet-C',
    Gentleman = 'ja-JP-Wavenet-D'
}

export class Speaker {
    private client;

    constructor() {
        this.client = new textToSpeech.TextToSpeechClient();
    }

    async speakJP(text: string, voice: JPVoice, rate: number = 1.0) {
        const request = {
            input: { text },
            voice: {
                languageCode: 'ja-JP',
                name: voice
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