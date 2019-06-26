const textToSpeech = require('@google-cloud/text-to-speech').v1beta1;

require('dotenv').config();

export enum JPSpeaker {
    Woman = 'ja-JP-Wavenet-B',
    Boy = 'ja-JP-Wavenet-C',
    Gentleman = 'ja-JP-Wavenet-D'
}

export class Speech {
    private client;

    constructor() {
        this.client = new textToSpeech.TextToSpeechClient();
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