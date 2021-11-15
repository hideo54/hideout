import os from 'os';
import dnsjack from 'dnsjack';

export const init = () => {
    const interfaces = os.networkInterfaces();
    const myPrivateIp = Object.values(interfaces).map(nets =>
        nets?.filter(net => net.address.startsWith('192.168.'))
    ).flat()[0]!.address;
    const jack = dnsjack.createServer();
    jack.route('*.hideout', myPrivateIp);
    jack.listen();
};
