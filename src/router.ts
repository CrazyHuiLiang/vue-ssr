import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history', // 一定要是history模式
        // base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
            },
        ],
    });
}
