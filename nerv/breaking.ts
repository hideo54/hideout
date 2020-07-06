export default ((text: string) => {
    // `content` example
    //// 【NHKニュース速報 17:27】
    //// 緊急事態宣言　３９県の解除を諮問へ
    //// 茨城・石川・岐阜・愛知・福岡含む
    //// #ニュース #NHKニュース速報

    const lines = text.split('\n').map(line => {
        if (line.startsWith('【')) return null;
        if (line.startsWith('#')) return null;
        line = line.replace(/　/g, '、');
        line += '。';
        return line;
    });
    const phrase = '速報。' + lines.join('').repeat(2);
    return phrase;
});