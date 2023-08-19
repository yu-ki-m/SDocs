import { EnvInterface, ENV_KEY } from './components/EnvMananger'

export const getHttpConfig = (env: EnvInterface) => {
    return {
        baseURL: env.get(ENV_KEY.VITE_SERVER_BASE_URL),
        headers: { 'Content-type': 'application/json' }
    }
}
