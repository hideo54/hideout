import { promises as fs } from 'fs';
import util from 'util';
import child_process from 'child_process';
import { v4 as uuid } from 'uuid';

const exec = util.promisify(child_process.exec);

const audioDirPath = `${__dirname}/../audio`;

export const playAudioBuffer = async (audio: Buffer, headChaim?: string) => {
    if (headChaim) {
        const headChaimBuffer = await fs.readFile(`${audioDirPath}/${headChaim}.mp3`);
        audio = Buffer.concat([ headChaimBuffer, audio ]);
    }
    const tmpFilePath = `${audioDirPath}/tmp-${uuid()}`;
    await fs.writeFile(tmpFilePath, audio);
    await playAudioFile(tmpFilePath);
    await fs.unlink(tmpFilePath);
};

export const playAudioFile = async (path: string) => {
    const device = 'local';
    await exec(`omxplayer -o ${device} ${path}`);
};