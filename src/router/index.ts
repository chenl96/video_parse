import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/pianku',
        name: 'film',
        component: () => import('../views/film.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/search.vue')
    },
    {
        path: '/play',
        name: 'play',
        component: () => import('../views/video.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
