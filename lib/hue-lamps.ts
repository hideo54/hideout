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

type simpleColorKeys = 'white' | '夕方';
const simpleColors: {[key in simpleColorKeys]: {ct: number}} = {
    white: { ct: 250 },
    夕方: { ct: 443 },
};

const colorfulLightIDs = [ 1 ];
const simpleLightIDs = [ 2, 3 ];
const allLightIDs = [...colorfulLightIDs, ...simpleLightIDs];

// This program assumes that all lamps are regarded as an integrated light system and are controlled by hideout system.
// So every lamps has a same brightness.

export const darkenLightsBy5 = async (bridge: Bridge) => {
    const currentState: SimpleLightState = await bridge.lights.getLightState(allLightIDs[0]);
    if (!currentState.on) return;
    const newBri = Math.max(currentState.bri - 5, 0);
    const color = simpleColors.夕方;
    const dimmerState = newBri === 0
        ? new LightState().off()
        : new LightState().on(true).bri(newBri).ct(color.ct);
    for (const lightID of allLightIDs) {
        await bridge.lights.setLightState(lightID, dimmerState);
    }
};

export const brightenLightsBy5 = async (bridge: Bridge) => {
    const currentState: SimpleLightState = await bridge.lights.getLightState(allLightIDs[0]);
    const newBri = currentState.on ? Math.min(currentState.bri + 5, 254) : 5;
    const color = simpleColors.white;
    const brighterState = new LightState().on(true).bri(newBri).ct(color.ct);
    for (const lightID of allLightIDs) {
        await bridge.lights.setLightState(lightID, brighterState);
    }
};
