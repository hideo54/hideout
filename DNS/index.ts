import dnsjack from 'dnsjack';

const jack = dnsjack.createServer();

jack.route('*.hideout', (data, callback) => {
    callback(null, '192.168.0.10');
});

jack.listen();