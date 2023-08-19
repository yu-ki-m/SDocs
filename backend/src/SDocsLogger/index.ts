
import winston from 'winston';

export const createLogger = (logConfig:winston.LoggerOptions):winston.Logger => {
    return winston.createLogger(logConfig);
}

export interface SDocsLoggerInterface {
    logger: winston.Logger;


    // message
    knexNodeEnvLog(nodeEnv:string):void;
    knexSeedLog(seedName: string): void;
    expressServerStartLog(port:string):void;
}

export default class SDocsLogger implements SDocsLoggerInterface{
    logger: winston.Logger;
    constructor( logger: winston.Logger ){
        this.logger = logger;
        
    }

    knexNodeEnvLog(nodeEnv:string){ this.logger.log('info',"NODE_ENV is " + nodeEnv)}
    knexSeedLog(seedName:string){this.logger.log('info',"Knex seed " + seedName)}
    expressServerStartLog(port:string){ this.logger.info("Express server listening on port " + port)}

}


