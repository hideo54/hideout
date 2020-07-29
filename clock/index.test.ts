import { generatePhrase } from './index';

describe('clock', () => {
    it('Returns correct text at *:00', () => {
        const date = new Date('2020-01-01T10:00:00');
        const phrase = generatePhrase(date);
        expect(phrase).toBe('時刻は10時です。');
    });
    it('Returns correct text at *:30', () => {
        const date = new Date('2020-01-01T10:30:00');
        const phrase = generatePhrase(date);
        expect(phrase).toBe('時刻は10時半です。');
    });
    it('Returns correct text at *:54', () => {
        const date = new Date('2020-01-01T10:54:00');
        const phrase = generatePhrase(date);
        expect(phrase).toBe('時刻は10時54分です。');
    });
});