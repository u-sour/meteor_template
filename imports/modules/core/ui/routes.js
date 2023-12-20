const routes = [
    {
        path: '/core',
        component: () => import('./layouts/CoreLayout.vue'),
        redirect: { name: 'core.auth' },
        children: [
            {
                path: '/core/auth',
                name: 'core.auth',
                component: () => import('./pages/Authentication.vue'),
                redirect: { name: 'core.auth.signIn' },
                children: [
                    {
                        path: '/core/auth/sign-in',
                        name: 'core.auth.signIn',
                        component: () => import('./components/auth/SignInForm.vue'),
                    },
                    {
                        path: '/core/auth/sign-up',
                        name: 'core.auth.signUp',
                        component: () => import('./components/auth/SignUpForm.vue'),
                    }
                ]
            },
            {
                path: '/core/:pathMatch(.*)*',
                name: 'core.routeChecker',
                component: () => import('./pages/NotFound.vue'),
                meta: { notRequiresAuth: true }
            }
        ]
    }
];
export default routes;