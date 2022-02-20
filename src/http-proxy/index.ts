import fs from 'fs/promises';
import type { FastifyInstance } from 'fastify';
import vhost from 'fastify-vhost';

export const init = async (server: FastifyInstance) => {
    const tableStr = await fs.readFile(`${__dirname}/table.json`, 'utf-8');
    const table = JSON.parse(tableStr) as {[key: string]: string};
    for (const [host, upstream] of Object.entries(table)) {
        server.register(vhost, {
            host,
            upstream,
        });
    }
};
