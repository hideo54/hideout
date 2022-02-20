declare module 'dnsjack' {
    type EventName = string | Symbol;
    type OnError = (err: EventName) => void;
    type OnProxy = () => void;

    interface To {
        ip: string;
        ttl: number;
    }

    type Callback = (err: string | Symbol | null, to: string | To) => void;

    interface Data {
        domain: string;
        rinfo: {
            address: string;
            family: 'IPv4' | 'IPv6';
            port: number;
            size: number;
        }; // https://nodejs.org/api/dgram.html#dgram_event_message
    }

    type EventEmitter = import('events').EventEmitter;

    type Pattern = string | string[];
    type Route = string | ((data: Data, callback: Callback) => void);

    type RouteFunction =
        // | ((route: Route) => void)
        | ((pattern: Pattern, route: Route) => void);

    interface DNSJack extends EventEmitter {
        route: RouteFunction;
        listen(port?: number): DNSJack;
        close(): void;
    }

    export function createServer(proxy?: string): DNSJack;
}
