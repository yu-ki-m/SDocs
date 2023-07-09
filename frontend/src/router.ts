import { createRouter, createWebHistory, RouteLocationRaw, Router } from 'vue-router'
import Top from './pages/Top/index.vue'
import Editor from './pages/Editor/index.vue'

export class PATHS {
    static TOP:RouteLocationRaw = "/";
    static EDITOR:RouteLocationRaw = "/editor";
}

const routes = [
    { path: PATHS.TOP.toString(), name: "Top", component: Top },
    { path: PATHS.EDITOR.toString(), name: "Editor", component: Editor },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router







