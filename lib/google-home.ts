import http from 'http';
import { AddressInfo } from 'net';
import { promises as fs } from 'fs';
import { Buffer } from 'buffer';
// @ts-ignore
import { Client as GoogleCastClient, DefaultMediaReceiver } from 'castv2-client';

export class GoogleHome {
    IPAddress: string;

    constructor(ip: string) {
        this.IPAddress = ip;
    }

    pushAudio(audio: Buffer, headChaim?: string) {
        const client = new GoogleCastClient();
        client.connect( this.IPAddress, () => {
            // @ts-ignore
            client.launch(DefaultMediaReceiver, (err, player) => {
                if (err) {
                    console.error(err);
                    client.close();
                }
                const server = http.createServer(async (request, response) => {
                    response.setHeader('Content-Type', 'audio/mpeg');
                    if (headChaim) {
                        const headChaimBuffer = await fs.readFile(`${__dirname}/../audio/${headChaim}.mp3`);
                        audio = Buffer.concat([ headChaimBuffer, audio ]);
                    }
                    response.end(audio);
                });
                server.listen(0);
                const address = server.address() as AddressInfo;
                const media = {
                    contentId: `http://${process.env.SERVER_ADDRESS}:${address.port}`,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                };
                player.load(media, { autoplay: true }, () => {
                    server.close();
                    client.close();
                });
            });
        });
    }

    pushAudioUrl(url: string) {
        const client = new GoogleCastClient();
        client.connect( this.IPAddress, () => {
            // @ts-ignore
            client.launch(DefaultMediaReceiver, (err, player) => {
                if (err) {
                    console.error(err);
                    client.close();
                }
                const media = {
                    contentId: url,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                };
                player.load(media, { autoplay: true }, () => {
                    client.close();
                });
            });
        });
    }
}