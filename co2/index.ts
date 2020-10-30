const job: Job = async (date: Date, utils: Utils) => {
    const value = await utils.mhz19.readCO2();
    if (value < 1000) return;
    let phrase = `現在の二酸化炭素濃度は ${value} ピーピーエムです。今すぐ換気してください。`;
    const voice = await utils.speaker.getJPVoice(phrase, { speaker: 'boy' });
    utils.gHome.pushAudio(voice);
};

export default job;