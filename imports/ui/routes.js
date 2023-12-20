import Home from './pages/Home.vue'
const routes = [
    {
        path: '/',
        name: 'app',
        component: () => import('./layouts/AppLayout.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('./pages/About.vue'),
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'routeChecker',
                component: () => import('./pages/NotFound.vue'),
                meta: { notRequiresAuth: true }
            }
        ]
    },
];

export default routes;