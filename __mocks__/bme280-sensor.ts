import type { Options, Data } from 'bme280-sensor';

export default class {
    constructor(options?: Options) {}

    async readSensorData() {
        const sampleData: Data = {
            temperature_C: 32.09,
            humidity: 34.851083883116694,
            pressure_hPa: 1010.918480644477,
            temperature_F: 89.76200000000001,
            pressure_inHg: 29.852410107059583,
        }; // https://github.com/hideo54/bme280-sensor
        return sampleData;
    }
}