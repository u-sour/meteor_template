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
                meta: { requiresGuest: true },
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
                path: '/core/auth/admin',
                name: 'core.auth.admin',
                component: () => import('./layouts/AdminLayout.vue'),
                meta: { requiresAuth: true },
                redirect: { name: 'core.auth.admin.dashboard' },
                children: [
                    {
                        path: '/core/auth/admin/dashboard',
                        name: 'core.auth.admin.dashboard',
                        component: () => import('./pages/admin/Dashboard.vue'),
                        meta: { title: 'Dashboard', iconName: 'SolarSiderbarLinear' }
                    },
                    {
                        path: '/core/auth/admin/users',
                        name: 'core.auth.admin.users',
                        component: () => import('./pages/admin/Users.vue'),
                        meta: { title: 'Users', iconName: 'SolarSmileCircleLinear' }
                    }
                ]
            },
            {
                path: '/core/:pathMatch(.*)*',
                name: 'core.routeChecker',
                component: () => import('./pages/NotFound.vue'),
            }
        ]
    }
];
export default routes;