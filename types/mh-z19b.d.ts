declare module 'mh-z19b' {
    export default class {
        constructor(port?: string);
        readCO2(): Promise<number>;
        callibrate(): void;
        abcOn(): void;
        abcOff(): void;
    }
}