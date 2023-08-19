import dotenv from 'dotenv'
dotenv.config()

export enum ENV_KEY {
    NODE_ENV     = 'NODE_ENV',
    PORT         = 'PORT',
    SERVER_URL   = 'SERVER_URL',
    CLIENT_URL   = 'CLIENT_URL',
    DB_CLIENT    = 'DB_CLIENT',
    DB_HOST      = 'DB_HOST',
    DB_PORT      = 'DB_PORT',
    DB_USER      = 'DB_USER',
    DB_PASSWORD  = 'DB_PASSWORD',
    DB_DATABASE  = 'DB_DATABASE',
    DB_POOL_MIN  = 'DB_POOL_MIN',
    DB_POOL_MAX  = 'DB_POOL_MAX',
}

export type ENV_KEY_TYPE = keyof typeof ENV_KEY;

export interface EnvInterface {
    processEnv:NodeJS.ProcessEnv;
    checkAllEnvSet():void;
    isEnvSet(key:ENV_KEY_TYPE):boolean;
    get(key:ENV_KEY_TYPE):string;
}

export default class Env implements EnvInterface{

    /**
     * process.env
     */
    processEnv:NodeJS.ProcessEnv;

    constructor(processEnv:NodeJS.ProcessEnv){
        this.processEnv = processEnv;
    }

    checkAllEnvSet(){
        const unSetEnv:string[] = [];
        for (const key in ENV_KEY) {
            if (Object.prototype.hasOwnProperty.call(ENV_KEY, key)) {
                const envName = ENV_KEY[key as keyof typeof ENV_KEY];
                if(this.isEnvSet(envName) === false){
                    unSetEnv.push(envName);
                }
            }
            if(unSetEnv.length > 0){
                throw new Error(`環境変数:${unSetEnv.join(',')}が設定されていません。`);
            }
        }
    }

    isEnvSet(key:ENV_KEY_TYPE):boolean{
        const envName = ENV_KEY[key];
        if(this.processEnv[envName] === undefined || this.processEnv[envName] === ''){
            return false
        }
        return true;
    }

    get(key:ENV_KEY_TYPE):string{
        const env = this.processEnv[key];
        if(env === undefined || env === ''){
            throw new Error(`環境変数:${key}が設定されていません。`);
        }
        return env;
    }




}

