declare module 'bme280-sensor' {
    type Options = {
        i2cBusNo?: number;
        i2cAddress?: number;
        outputsInfo?: boolean;
    };
    type Data = {
        temperature_C: number;
        humidity: number;
        pressure_hPa: number;
    };
    export default class {
        constructor(options?: Options);
        init(): Promise<number>;
        resett(): Promise<void>;
        readSensorData(): Promise<Data>;
        loadCalibration(callback: () => void): void;
        static BME280_DEFAULT_I2C_ADDRESS(): number;
        static CHIP_ID1_BMP280(): number;
        static CHIP_ID2_BMP280(): number;
        static CHIP_ID3_BMP280(): number;
        static CHIP_ID_BME280(): number;
        static int16(msb:number, lsb:number): number
        static uint16(msb:number, lsb:number): number;
        static uint20(msb: number, lsb: number, xlsb: number): number;
        static convertCelciusToFahrenheit(c: number): number;
        static convertHectopascalToInchesOfMercury(hPa: number): number;
        static convertMetersToFeet(m: number): number;
        static calculateHeatIndexCelcius(temperature_C: number, humidity: number): number;
        static calculateDewPointCelcius(temperature_C: number, humidity: number): number;
        static calculateAltitudeMeters(pressure_hPa: number, seaLevelPressure_hPa: number): number;
    }
}