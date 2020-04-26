export interface AirCondition {
    temperature: number;
    humidity: number;
    THI: number;
    comfortability: ComfortabilityDescription;
}

enum ComfortabilityDescription {
    Cold = '寒い',
    Chilly = '肌寒い',
    Normal = '何も感じない',
    Comfortable = '快い',
    NotHot = '暑くない',
    Warm = 'やや暑い',
    Hot = '暑くて汗が出る',
    VeryHot = '暑くてたまらない'
}

const getComfortability = (THI: number): ComfortabilityDescription => {
    if (THI < 55) return ComfortabilityDescription.Cold;
    if (THI < 60) return ComfortabilityDescription.Chilly;
    if (THI < 65) return ComfortabilityDescription.Normal;
    if (THI < 70) return ComfortabilityDescription.Comfortable;
    if (THI < 75) return ComfortabilityDescription.NotHot;
    if (THI < 80) return ComfortabilityDescription.Warm;
    if (THI < 85) return ComfortabilityDescription.Hot;
    return ComfortabilityDescription.VeryHot;
};

export const getAirCondition = (temperature: number, humidity: number): AirCondition => {
    const THI: number = temperature * 0.81 + (temperature * 0.99 - 14.3) * humidity * 0.01 + 46.3;
    const comfortability = getComfortability(THI);
    return { temperature, humidity, THI, comfortability };
};
