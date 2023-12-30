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
                    // Dashboard
                    {
                        path: '/core/auth/admin/dashboard',
                        name: 'core.auth.admin.dashboard',
                        component: () => import('./pages/admin/Dashboard.vue'),
                        meta: {
                            title: 'Dashboard',
                            iconName: 'SolarSiderbarLinear',
                            isParent: true,
                            breadcrumb: {
                                title: 'Index',
                                parent: {
                                    title: 'Dashboard',
                                    route: 'core.auth.admin.dashboard'
                                },
                            },
                        }
                    },
                    // Users
                    {
                        path: '/core/auth/admin/users',
                        name: 'core.auth.admin.users',
                        component: () => import('./pages/admin/users/Index.vue'),
                        meta: {
                            title: 'Users',
                            iconName: 'SolarSmileCircleLinear',
                            isParent: true,
                            create: {
                                route: 'core.auth.admin.users.create'
                            },
                            breadcrumb: {
                                title: 'Index',
                                parent: {
                                    title: 'Users',
                                    route: 'core.auth.admin.users'
                                },
                            },
                        }
                    },
                    {
                        path: '/core/auth/admin/users/create',
                        name: 'core.auth.admin.users.create',
                        component: () => import('./pages/admin/users/Create.vue'),
                        meta: {
                            title: 'Users',
                            iconName: 'SolarSmileCircleLinear',
                            breadcrumb: {
                                title: 'Create',
                                parent: {
                                    title: 'Users',
                                    route: 'core.auth.admin.users'
                                },
                            },
                        },
                    },
                    // Settings
                    {
                        path: '/core/auth/admin/settings',
                        name: 'core.auth.admin.settings',
                        component: () => import('./pages/admin/Settings.vue'),
                        meta: {
                            title: 'Settings',
                            iconName: 'SolarSettingsLinear',
                            isParent: true,
                            breadcrumb: {
                                title: 'Index',
                                parent: {
                                    title: 'Settings',
                                    route: 'core.auth.admin.settings'
                                },
                            },
                        }
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