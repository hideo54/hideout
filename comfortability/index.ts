export const generatePhrase = (temperature: number, humidity: number, month: number) => {
    const t = temperature.toFixed(1);
    const h = humidity.toFixed(1);

    const [ isTempTooLow, isTempTooHigh ] = [ 5, 6, 7, 8, 9 ].includes(month)
        ? [ temperature < 23, temperature > 30] // Summer
        : [ temperature < 16, temperature > 23]; // Winter
    const isHumidityTooLow = humidity < 40;
    const isHumidityTooHigh = humidity > 60;

    const tWarning = `部屋の温度を${isTempTooLow ? '上げ' : '下げ'}ましょう。`;
    const hWarning = `部屋の湿度を${isHumidityTooLow ? '上げ' : '下げ'}ましょう。`;
    if (isHumidityTooLow || isHumidityTooHigh) {
        if (isTempTooLow || isTempTooHigh) {
            return `現在、気温${t}度、湿度${h}パーセントです。`
                + tWarning + hWarning;
        }
        return `現在、湿度${h}パーセントです。${hWarning}`;
    }
    if (isTempTooLow || isTempTooHigh) {
        return `現在、気温${t}度です。${tWarning}`;
    }
    return;
};

const job: Job = async (date: Date, utils: Utils) => {
    const data = await utils.bme280.readSensorData();
    const month = date.getMonth() + 1;
    const phrase = generatePhrase(data.temperature_C, data.humidity, month);
    if (phrase) {
        const voice = await utils.speaker.getJPVoice(phrase, { speaker: 'boy' });
        utils.gHome.pushAudio(voice);
    }
};

export default job;