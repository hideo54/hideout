import axios from 'axios';

export enum HueLampAlertEffect {
    none,
    select, // one breathe cycle
    lselect // breathe cycles for 15s or until 'none' received
}

export enum HueLampDynamicEffect {
    none,
    colorloop
}

export enum ColorMode {
    HueAndSaturation,
    ColorSpace,
    ColorTemperature
}

export interface Color {
    hue?: number; // 色
    saturation?: number; // sat; 彩度
    x?: number; // CIE Color Space におけるX座標
    y?: number; // CIE Color Space におけるY座標
    colorTemperature?: number; // ct; Mired Color temperature
}

export class ColorMaker {
    color: Color;

    private RGBtoXY(red: number, green: number, blue: number): number[] {
        // 1. [0, 255] -> [0, 1]
        red /= 255;
        green /= 255;
        blue /= 255;

        // 2. Gamma Collection
        const r = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
        const g = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        const b = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

        // 3. the Wide RGB D65 conversion formula
        const X = r * 0.649926 + g * 0.103455 + b * 0.197109;
        const Y = r * 0.234327 + g * 0.743075 + b * 0.022598;
        const Z = r * 0.000000 + g * 0.053077 + b * 1.035763;

        // 4.
        const x = X / (X + Y + Z);
        const y = Y / (X + Y + Z);

        return [x, y];
    }

    RGB(red: number, green: number, blue: number): Color {
        const [x, y] = this.RGBtoXY(red, green, blue);
        this.color = { x, y };
        return this.color;
    }

    HEX(hex: string) {
        const [x, y] = this.RGBtoXY(
            parseInt(hex.substr(0, 2), 16),
            parseInt(hex.substr(2, 2), 16),
            parseInt(hex.substr(4, 2), 16)
        );
        this.color = { x, y };
        return this.color;
    }

    temperature(temperature: number) {
        // [153, 500] -> [6500, 2000]

    }
}

export interface HueLampState {
    on: boolean;
    color: Color;
    brightness: number;
    effect: HueLampDynamicEffect;
    alert: HueLampAlertEffect;
    colormode: ColorMode;
    // mode: string; // Not on the official document yet…
    reachable: boolean;
}

export class HueLamp {
    readonly id: number;
    readonly name: string;
    readonly productName: string;
    readonly state: HueLampState;

    constructor (id: number, name: string, productName: string) {
        this.id = id;
        this.name = name;
        this.productName = productName;
    }
}

export class HueLampController {
    bridgeIP: string | undefined = undefined;
    username: string;

    constructor (username: string, bridgeIP: string | undefined = undefined) {
        if (bridgeIP) this.bridgeIP = bridgeIP;
        this.username = username;
    }

    async getAllLamps(): Promise<{[key: string]: HueLamp[]}> {
        if (this.bridgeIP == undefined) {
            throw new Error();
        }
        const url = `http://${this.bridgeIP}/api/${this.username}/lights`;
        const response = await axios.get(url);
        let lamps = {};
        for (const i in response.data) {
            lamps[i] = (new HueLamp(
                Number(i),
                response.data[i].name,
                response.data[i].productname,
            ));
        }
        return lamps;
    }

    async setLightState(
        id: number, color: Color, brightness: number,
        alertEffect: HueLampAlertEffect = HueLampAlertEffect.none, 
        dynamicEffect: HueLampDynamicEffect = HueLampDynamicEffect.none) {
        const url = `http://${this.bridgeIP}/api/${this.username}/lights/${id}/state`;
        const response = await axios.put(url, {
            on: true,
            bri: Math.round(brightness * 2.55),
            hue: color.hue,
            sat: color.saturation,
            xy: [ color.x, color.y],
            ct: color.colorTemperature,
            // alert: HueLampAlertEffect.none, // todo
            // effect: HueLampDynamicEffect.none, // todo
            transitiontime: 1
        });
        console.log(response.data);
    }
}