import dotenv from 'dotenv';
dotenv.config();

import BME280 from 'bme280-sensor';
import MHZ19 from 'mh-z19b';

import * as dns from './dns';

class Sensors {
    disabled: boolean = true;
    bme280: BME280 | null = null;
    mhz19: MHZ19 | null = null;

    constructor({ disabled }: { disabled: boolean; } = { disabled: false }) {
        this.disabled = disabled;
        if (this.disabled) return;
        this.bme280 = new BME280({
            i2cBusNo: 1,
            i2cAddress: 0x76,
            outputsInfo: false,
        });
        this.mhz19 = new MHZ19();
    }

    async init() {
        if (this.disabled) return;
        await this.bme280?.init();
    }
}

const init = async () => {
    if (process.env.NODE_ENV === 'production') {
        const sensors = new Sensors();
        await sensors.init();
    }

    dns.init();
};

init();
