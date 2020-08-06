const { deploy } = require('sftp-sync-deploy');

const config = require('./sftpConfig.json');
const options = {
    exclude: [
        'node_modules/',
        '.env',
    ],
    excludeMode: 'ignore',
};

deploy(config, options);