/*
* Log関連以外のメッセージ
*/

export class EXCEPTION_MESSAGE {
    // Exception関連
    static KNEX_NODE_ENV_ERROR = (nodeEnv:string) => "NODE_ENV is not development or test. NODE_ENV is " + nodeEnv + ".";
}

