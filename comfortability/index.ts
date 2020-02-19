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

    const temperature = data.temperature_C;
    const humidity = data.humidity;
    // const pressure = data.pressure_hPa;

    const report = `現在、気温${temperature.toFixed(1)}度、湿度${humidity.toFixed(1)}パーセント。`;
    let advice = '';

    const now = new Date();
    if ([ 5, 6, 7, 8, 9 ].includes(now.getMonth() + 1)) { // Summer
        if (temperature < 25) {
            advice += '室温を上げてください。';
        }
        if (temperature > 28) {
            advice += '室温を下げてください。';
        }
        if (humidity < 55) {
            advice += '湿度を上げてください。';
        }
        if (humidity > 65) {
            advice += '湿度を下げてください。';
        }
    }
    if ([ 11, 12, 1, 2, 3].includes(now.getMonth() + 1)) { // Winter
        if (temperature < 18) {
            advice += '室温を上げてください。';
        }
        if (temperature > 22) {
            advice += '室温を下げてください。';
        }
        if (humidity < 45) {
            advice += '湿度を上げてください。';
        }
        if (humidity > 60) {
            advice += '湿度を下げてください。';
        }
    }
    if (advice) {
        return report + advice;
    } else {
        return null;
    }
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