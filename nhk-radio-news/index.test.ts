jest.mock('axios');

import axios from 'axios';
import { promises as fs } from 'fs';
import { fetchLatestNews } from './index';

// @ts-ignore
axios.get = jest.fn(async (url: string) => {
    const newslistJs = await fs.readFile(`${__dirname}/newslist.sample.js`, 'utf-8');
    return {
        status: 200,
        data: newslistJs,
    };
});

describe('nhk-radio-news', () => {
    it('fetches the latest news audio url', async () => {
        const { date, url } = await fetchLatestNews();
        const expectedDate = '2020-08-07T21:00:03+09:00';
        const expectedFilename = '20200807210003_33670_1_1_2';
        expect(date.format()).toBe(expectedDate);
        expect(url).toBe(`https://www.nhk.or.jp/r-news/ondemand/mp3/${expectedFilename}.mp3`);
    });
});