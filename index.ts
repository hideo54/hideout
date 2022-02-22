import os from 'os';
import fastify from 'fastify';
import BME280 from 'bme280-sensor';
import MHZ19 from 'mh-z19b';

import * as httpProxy from './src/http-proxy';
import * as dns from './src/dns';

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
        try {
            await this.bme280?.init();
        } catch (e) {
            console.error(e);
            this.bme280 = null;
        }
    }
}

const init = async () => {
    if (os.hostname() === 'Chika') {
        const sensors = new Sensors();
        await sensors.init();
        const tmp = await sensors.bme280?.readSensorData();
        console.log(tmp);
    }

    const server = fastify();
    await httpProxy.init(server);
    server.listen(80);

    dns.init();
};

init();
