

// export type ENV_KEY_TYPE = keyof typeof ENV_KEY;

export interface LoggerInterface {
    // console
    debug:(...args: string[]) => void;
    log:(...args: string[]) => void;
    info:(...args: string[]) => void;
    warn:(...args: string[]) => void;
    error:(...args: string[]) => void;

    // message
    knexNodeEnvLog(nodeEnv:string):void;
    knexSeedLog(seedName: string): void;
    expressServerStartLog(port:string):void;
}

export default class Logger implements LoggerInterface{
    debug:(...args: string[]) => void;
    log:(...args: string[]) => void;
    info:(...args: string[]) => void;
    warn:(...args: string[]) => void;
    error:(...args: string[]) => void;
    constructor(
        debug:(...args: string[]) => void,
        log:  (...args: string[]) => void,
        info: (...args: string[]) => void,
        warn: (...args: string[]) => void ,
        error:(...args: string[]) => void){
        this.debug = debug;
        this.log = log;
        this.info = info;
        this.warn = warn;
        this.error = error;
    }

    knexNodeEnvLog(nodeEnv:string){ this.log("NODE_ENV is " + nodeEnv)}
    knexSeedLog(seedName:string){ this.log("Knex seed " + seedName)}
    expressServerStartLog(port:string){ this.log("Express server listening on port " + port)}

}

