import TextToSpeech from '@google-cloud/text-to-speech';

const jpSpeakerName = {
    woman: 'ja-JP-Wavenet-B',
    boy: 'ja-JP-Wavenet-C',
    gentleman: 'ja-JP-Wavenet-D',
} as const;
type JPSpeaker = keyof typeof jpSpeakerName;

export class Speech {
    // @ts-ignore
    private client;
    static speakerName = jpSpeakerName;

    constructor() {
        this.client = new TextToSpeech.TextToSpeechClient();
    }

    async getJPVoice(text: string, speaker: JPSpeaker = 'woman', rate: number = 1.1) {
        const request = {
            input: { text },
            voice: {
                languageCode: 'ja-JP',
                name: jpSpeakerName[speaker],
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: rate,
                volumeGainDb: 0.0,
            },
        };
        const [ response ] = await this.client.synthesizeSpeech(request);
        return response.audioContent;
    }
}