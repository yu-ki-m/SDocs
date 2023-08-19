import Env, { ENV_KEY } from './index'
describe("index", () => {
    describe("isEnvSet", () => {
        test("環境変数が設定されていない場合falseが返ること", () => {
            // * Arrage
            const env = new Env({} as NodeJS.ProcessEnv);
            // * Act
            const actual = env.isEnvSet(ENV_KEY.DB_HOST)
            // * Assert
            expect(actual).toBe(false);
        });
        test("環境変数が設定されている場合trueが返ること", () => {
            // * Arrage
            const env = new Env({[ENV_KEY.DB_HOST]:'localhost'} as NodeJS.ProcessEnv);
            // * Act
            const actual = env.isEnvSet(ENV_KEY.DB_HOST);
            // * Assert
            expect(actual).toBe(true);
        });
    });
    describe("checkAllEnvSet",()=>{
        test("1つでも環境変数が設定されていなければエラーとなること", () => {
            // * Arrange
            
            const env = new Env({
                [ENV_KEY.NODE_ENV]:'unittest',
                //[ENV_KEY.PORT]:'3000', // 不足させる箇所
                [ENV_KEY.SERVER_URL]:'http://localhost:3000',
                [ENV_KEY.CLIENT_URL]:'http://localhost:5173',
                [ENV_KEY.DB_CLIENT]:'postgresql',
                [ENV_KEY.DB_HOST]:'localhost',
                [ENV_KEY.DB_PORT]:'5432',
                [ENV_KEY.DB_USER]: 'postgres',
                [ENV_KEY.DB_PASSWORD]:'postgrespass',
                [ENV_KEY.DB_DATABASE]:'sdocs',
                [ENV_KEY.DB_POOL_MIN]:'2',
                [ENV_KEY.DB_POOL_MAX]:'10',
            } as NodeJS.ProcessEnv);
            // 結果受け取り用変数
            let result = undefined;
            // * Act
            try{
                env.checkAllEnvSet();
            }catch(e){
                result = e;
            }
            // * Assert
            expect(result).toBeInstanceOf(Error);
        });

        test("環境変数が設定されている場合エラーが発生しないこと", () => {
            // * Arrange
            const env = new Env({
                [ENV_KEY.NODE_ENV]:'test',
                [ENV_KEY.PORT]:'3000',
                [ENV_KEY.SERVER_URL]:'http://localhost:3000',
                [ENV_KEY.CLIENT_URL]:'http://localhost:5173',
                [ENV_KEY.DB_CLIENT]:'postgresql',
                [ENV_KEY.DB_HOST]:'localhost',
                [ENV_KEY.DB_PORT]:'5432',
                [ENV_KEY.DB_USER]: 'postgres',
                [ENV_KEY.DB_PASSWORD]:'postgrespass',
                [ENV_KEY.DB_DATABASE]:'sdocs',
                [ENV_KEY.DB_POOL_MIN]:'2',
                [ENV_KEY.DB_POOL_MAX]:'10',
            } as NodeJS.ProcessEnv);
            // 結果受け取り用変数
            let result = undefined;
            // * Act
            try{
                env.checkAllEnvSet();
            }catch(e){
                result = e;
            }
            // * Assert
            expect(result).toBe(undefined);
        });
    })
    describe("get",()=>{
        test("環境変数が設定されていない場合、例外がスローされること", () => {
            // * Arrange
            const env = new Env({} as NodeJS.ProcessEnv);
            let actual = undefined;
            // * Act
            try{
                env.get(ENV_KEY.DB_HOST);
            }catch(e){
                actual = e;
            }
            // * Assert
            expect(actual).toBeInstanceOf(Error);
        });
        test("環境変数が設定されている場合値が返ること", () => {
            // * Arrange
            const env = new Env({[ENV_KEY.DB_HOST]:'localhost'} as NodeJS.ProcessEnv);
            // * Act
            const actual = env.get(ENV_KEY.DB_HOST);
            // * Assert
            expect(actual).toBe('localhost');
        });
    });
});
