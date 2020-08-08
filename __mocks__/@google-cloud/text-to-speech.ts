interface Request {
    input: {
        text: string;
    };
    voice: {
        languageCode: 'ja-JP';
        name: 'ja-JP-Wavenet-B' | 'ja-JP-Wavenet-C' | 'ja-JP-Wavenet-D';
    };
    audioConfig: {
        audioEncoding: 'MP3';
        speakingRate: number;
        volumeGainDb: number;
    };
}

class TextToSpeechClient {
    initializationDone: boolean = false;

    constructor() {
        this.initializationDone = true;
    }

    async synthesizeSpeech(req: Request) {
        if (this.initializationDone === false) throw new Error('Initialization required');
        const text = req.input.text;
        const name = req.voice.name;
        return [{
            audioContent: Buffer.from(`${text} by ${name}`), // sample
        }];
    }
}

export default { TextToSpeechClient };