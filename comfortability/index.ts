import { getAirCondition, AirCondition } from '../lib/Air';
import { Speech } from '../lib/Speech';
import { GoogleHome } from '../lib/GoogleHome';
import schedule from 'node-schedule';
// @ts-ignore
import BME280 from 'bme280-sensor';

const generatePhrase = async () => {
    const options = {
        i2cBusNo: 1,
        i2cAddress: 0x76,
    };
    const bme280 = new BME280(options);
    const data = await bme280.readSensorData();
    const { temperature, humidity, THI, comfortability } = getAirCondition(data.temperature_C, data.humidity);
    if (60 < THI && THI < 75) {
        return null;
    }
    return `現在、気温${temperature}度、湿度${humidity}と、部屋が${comfortability}状態です。`;
};

const job = async (date: Date) => {
    const phrase = await generatePhrase();
    if (phrase) {
        const speaker = new Speech();
        const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
        const voice = await speaker.getJPVoice(phrase, 'Woman');
        gHome.pushAudio(voice);
    }
};

schedule.scheduleJob('10 */10 * * * *', job);