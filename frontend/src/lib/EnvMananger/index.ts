
export enum ENV_KEY {
    VITE_SERVER_BASE_URL  = 'VITE_SERVER_BASE_URL',
}

export type ENV_KEY_TYPE = keyof typeof ENV_KEY;

export interface EnvInterface {
    processEnv:ImportMetaEnv;
    get(key:ENV_KEY_TYPE):string;
}


export default class Env implements EnvInterface{

    processEnv:ImportMetaEnv;

    constructor(processEnv:ImportMetaEnv){
        this.processEnv = processEnv;
    }


    get(key:ENV_KEY_TYPE):string{
        const env = this.processEnv[key];
        if(env === undefined || env === ''){
            throw new Error(`環境変数:${key}が設定されていません。`);
        }
        return env;
    }

}

