
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Common from '@/assets/js/common.js'


const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
    },
    
];


const router = new createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {

})
router.afterEach((to, from) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
})

export default router