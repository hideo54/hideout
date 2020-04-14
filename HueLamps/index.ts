import { v3 as hueAPIv3 } from 'node-hue-api';
import Bridge from 'node-hue-api/lib/api/Api';
const LightState = hueAPIv3.lightStates.LightState;

interface SimpleLightState {
    on: boolean;
    bri: number;
    ct: number;
    alert: 'select';
    colormode: 'ct' | 'xy';
    mode: 'homeautomation';
    reachable: boolean;
}

interface ColorfulLightState extends SimpleLightState {
    hue: number;
    sat: number;
    effect: 'none';
    xy: [ number, number ];
}

const colorfulLightIDs = [ 1 ];
const simpleLightIDs = [ 2, 3 ];
const allLightIDs = [...colorfulLightIDs, ...simpleLightIDs];

// This program assumes that all lamps are regarded as an integrated light system and are controlled by hideout system.
// So every lamps has a same brightness.

export const dimLightsBy5 = async (bridge: Bridge) => {
    const currentState: SimpleLightState = await bridge.lights.getLightState(allLightIDs[0]);
    if (!currentState.on) return;
    const newBri = Math.max(currentState.bri - 5, 0);
    const dimmerState = newBri === 0
        ? new LightState().off()
        : new LightState().on(true).bri(newBri);
    for (const lightID of allLightIDs) {
        await bridge.lights.setLightState(lightID, dimmerState);
    }
};