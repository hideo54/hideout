import dnsjack from 'dnsjack';
import records from './records.json';

const jack = dnsjack.createServer();

interface Record {
    name: string;
    address: string;
}

for (const record of records as Record[]) {
    jack.route(record.name, (data, callback) => {
        callback(null, record.address);
    });
}

jack.listen();