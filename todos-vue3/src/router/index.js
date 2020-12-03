import Home from '../views/home/Home.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/hello',
        name: 'Hello',
        component: () => import('../views/hello/Hello.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes
})
export default router
