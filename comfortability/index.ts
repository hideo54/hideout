import BME280 from 'bme280-sensor';

const generatePhrase = async (sensor: BME280) => {
    const data = await sensor.readSensorData();

    const temperature = data.temperature_C;
    const humidity = data.humidity;
    // const pressure = data.pressure_hPa;

    const report = `現在、気温${temperature.toFixed(1)}度、湿度${humidity.toFixed(1)}パーセントです。`;
    let advice = '';

    const now = new Date();
    if ([ 5, 6, 7, 8, 9 ].includes(now.getMonth() + 1)) { // Summer
        if (temperature < 23) {
            advice += '部屋の温度を上げましょう。';
        }
        if (temperature > 28) {
            advice += '部屋の温度を下げましょう。';
        }
    }
    if ([ 10, 11, 12, 1, 2, 3, 4 ].includes(now.getMonth() + 1)) { // Winter
        if (temperature < 18) {
            advice += '部屋の温度を上げましょう。';
        }
        if (temperature > 22) {
            advice += '部屋の温度を下げましょう。';
        }
    }
    if (humidity < 40) {
        advice += '部屋の湿度を上げましょう。';
    } else if (humidity > 60) {
        advice += '部屋の湿度を下げましょう。';
    }
    if (advice) {
        return report + advice;
    }
    return;
};

const job: Job = async (date: Date, utils: Utils) => {
    const phrase = await generatePhrase(utils.bme280);
    if (phrase) {
        const voice = await utils.speaker.getJPVoice(phrase, 'boy');
        utils.gHome.pushAudio(voice);
    }
};

export default job;