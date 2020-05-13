export default ((text: string) => {
    // `text` example
    //// 《緊急地震速報（気象庁発表）》
    //// 茨城沖で地震　強い揺れに警戒
    //// 〈強い揺れが予想される地域〉
    //// 茨城　福島　千葉　栃木　埼玉
    //// #茨城県 #福島県 #千葉県 #栃木県 #埼玉県 #緊急地震速報 #緊急

    // 処理の例外は本来無視すべきであるが、このタグは「緊急」であるから、どのみち無視すべきでない。
    // 例外が発生した場合、とりあえず、本文を丸々流すこととする。

    const lines = text.split('\n');
    if (lines[0] === '《緊急地震速報（気象庁発表）》') {
        const [_, epicenter] = lines[1].match(/^(\S*)で地震　強い揺れに警戒$/) || [];
        const areas = lines[3].split('　');
        const phrase = `${epicenter}で地震が発生しました。次の地域では強い揺れに警戒してください。${areas.join('、')}。`;
        return phrase;
    }
    // 緊急地震速報以外の緊急tootとして、北朝鮮ミサイルに伴うJアラートなどがある。
    return text;
});