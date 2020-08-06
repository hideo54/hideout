import { generatePhrase } from './index';

describe('comfortability', () => {
    it('8月 気温31度 湿度70%', () => {
        const phrase = generatePhrase(31, 70, 8);
        expect(phrase).toBe('現在、気温31.0度、湿度70.0パーセントです。部屋の温度を下げましょう。部屋の湿度を下げましょう。');
    });
    it('8月 気温27度 湿度70%', () => {
        const phrase = generatePhrase(27, 70, 8);
        expect(phrase).toBe('現在、湿度70.0パーセントです。部屋の湿度を下げましょう。');
    });
    it('1月 気温25度 湿度45%', () => {
        const phrase = generatePhrase(25, 45, 1);
        expect(phrase).toBe('現在、気温25.0度です。部屋の温度を下げましょう。');
    });
    it('1月 気温19度 湿度45%', () => {
        const phrase = generatePhrase(19, 45, 1);
        expect(phrase).toBe(undefined);
    });
});