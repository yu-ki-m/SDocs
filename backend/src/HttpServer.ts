
import { Express } from 'express';
import HttpRoutes from './HttpRoutes';
import  { ENV_KEY,EnvInterface } from './EnvMananger';
import { LoggerInterface } from './Logger';


/** サーバー管理 */
export default class Server {
    /** Expressインスタンス */
    app:Express;
    /** パスの紐づけ関数 */
    httpRoutes:HttpRoutes;

    /** 環境変数 */
    env: EnvInterface;

    /** ロガー */
    logger: LoggerInterface;

    constructor(app:Express,env:EnvInterface,httpRoutes:HttpRoutes,logger:LoggerInterface){
        this.app = app
        this.env = env;
        this.httpRoutes = httpRoutes;
        this.logger = logger;

    }

    /** 起動準備 */
    setup(){
        // 環境変数が設定されていることを確認
        this.env.checkAllEnvSet();

        const envModule = this.env
        this.app.use(function (req, res, next) {
            // TODO: テストを追加する
            const clientUrl = envModule.get(ENV_KEY.CLIENT_URL);
            const serverUrl = envModule.get(ENV_KEY.SERVER_URL);
            
            const allowedOriginList = [ serverUrl, clientUrl ];
            const allowedOrigin = allowedOriginList.find((origin) => { return req.headers.origin === origin })
            if (req.headers.origin === allowedOrigin) {
                res.header('Access-Control-Allow-Origin', allowedOrigin)
                res.header('Access-Control-Allow-Headers','Origin,Authorization,Accept,X-Requested-With,Content-Type', )
                res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
                next()
            } else {
                res.status(403).send('Forbidden')
            }
        })

        // app.useの後に記述
        this.httpRoutes.setupRoutes();
    }

    /** サーバー起動 */
    start() {
        const port = this.env.get(ENV_KEY.PORT);
        const server = this.app.listen(port, ()=>{
            this.logger.expressServerStartLog(port)
        });
        return server;
    }
}