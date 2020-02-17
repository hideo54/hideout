import { getAirCondition } from '../lib/Air';
import { Speech, JPSpeaker } from '../lib/Speech';
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
    await bme280.init();
    const data = await bme280.readSensorData();
    const condition = getAirCondition(data.temperature_C, data.humidity);
    const temperature = condition.temperature.toFixed(1);
    const humidity = condition.humidity.toFixed(1);
    const { comfortability, THI } = condition;
    if (60 < THI && THI < 75) {
        return null;
    }
    return `現在、気温${temperature}度、湿度${humidity}パーセントと、部屋が${comfortability}状態です。`;
};

const job = async (date: Date) => {
    const phrase = await generatePhrase();
    if (phrase) {
        const speaker = new Speech();
        const gHome = new GoogleHome(process.env.GOOGLE_HOME_ADDRESS);
        const voice = await speaker.getJPVoice(phrase, JPSpeaker.Woman);
        gHome.pushAudio(voice);
    }
};

schedule.scheduleJob('10 */10 * * * *', job);