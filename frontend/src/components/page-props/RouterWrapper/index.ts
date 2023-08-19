import { LocationQuery, Router } from 'vue-router'
import router, { PATHS } from '../../../router'
export interface RouterWrapperInterface {
    toTopPage(): void
    getQuery(): LocationQuery
    toEditorPage(template: string): void
}

export class RouterWrapper implements RouterWrapperInterface {
    router: Router
    constructor() {
        this.router = router
    }
    getQuery(): LocationQuery {
        return this.router.currentRoute.value.query
    }
    toTopPage(): void {
        this.router.push({ path: PATHS.TOP.toString() })
    }

    toEditorPage(template: string): void {
        this.router.push({ path: PATHS.EDITOR.toString(), query: { template: template } })
    }
}

// export class RouterWrapper implements RouterWrapperInterface{
//     addRoute(parentName: RouteRecordName, route: RouteRecordRaw): () => void
//     addRoute(route: RouteRecordRaw): () => void
//     addRoute(parentName: unknown, route?: unknown): (() => void) | (() => void) {
//         throw new Error('Method not implemented.')
//     }
//     removeRoute(name: RouteRecordName): void {
//         throw new Error('Method not implemented.')
//     }
//     hasRoute(name: RouteRecordName): boolean {
//         throw new Error('Method not implemented.')
//     }
//     getRoutes(): RouteRecordNormalized[] {
//         throw new Error('Method not implemented.')
//     }
//     resolve(to: RouteLocationRaw, currentLocation?: RouteLocationNormalizedLoaded | undefined): RouteLocation & { href: string } {
//         throw new Error('Method not implemented.')
//     }
//     push(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
//         throw new Error('Method not implemented.')
//     }
//     replace(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
//         throw new Error('Method not implemented.')
//     }
//     back(): void {
//         throw new Error('Method not implemented.')
//     }
//     forward(): void {
//         throw new Error('Method not implemented.')
//     }
//     go(delta: number): void {
//         throw new Error('Method not implemented.')
//     }
//     beforeEach(guard: NavigationGuardWithThis<undefined>): () => void {
//         throw new Error('Method not implemented.')
//     }
//     beforeResolve(guard: NavigationGuardWithThis<undefined>): () => void {
//         throw new Error('Method not implemented.')
//     }
//     afterEach(guard: NavigationHookAfter): () => void {
//         throw new Error('Method not implemented.')
//     }
//     onError(handler: (error: any, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => any): () => void {
//         throw new Error('Method not implemented.')
//     }
//     isReady(): Promise<void> {
//         throw new Error('Method not implemented.')
//     }
//     install(app: App<any>): void {
//         throw new Error('Method not implemented.')
//     }

// }
