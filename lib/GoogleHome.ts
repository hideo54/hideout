// @ts-nocheck
// because there's no type definition of castv2-client.
import * as http from 'http';
import { AddressInfo } from 'net';
import { Client as GoogleCastClient, DefaultMediaReceiver } from 'castv2-client';
import dotenv from 'dotenv';
dotenv.config();

export class GoogleHome {
    IPAddress: string;

    constructor(ip: string) {
        this.IPAddress = ip;
    }

    pushAudio(audio: Buffer) {
        const client = new GoogleCastClient();
        client.connect( this.IPAddress, () => {
            client.launch(DefaultMediaReceiver, (err, player) => {
                if (err) {
                    console.error(err);
                    client.close();
                }
                const server = http.createServer((request, response) => {
                    response.setHeader('Content-Type', 'audio/mpeg');
                    response.end(audio);
                });
                server.listen(0);
                const address = server.address() as AddressInfo;
                const media = {
                    contentId: `http://${process.env.SERVER_ADDRESS}:${address.port}`,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                };
                player.load(media, { autoplay: true }, (err, status) => {
                    server.close();
                    client.close();
                });
            });
        });
    }

    pushAudioUrl(url: string) {
        const client = new GoogleCastClient();
        client.connect( this.IPAddress, () => {
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
                player.load(media, { autoplay: true }, (err, status) => {
                    client.close();
                });
            });
        });
    }
}