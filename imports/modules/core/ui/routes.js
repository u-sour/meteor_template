import Icons from '../utils/icons'
const labelAdminPrefix = 'core.pages.admin'
const labelPageTypesPrefix = 'core.pageTypes'

// breadcrumb parent
const roles = [
  {
    title: `${labelAdminPrefix}.settings.title`,
    route: 'core.auth.admin.settings',
  },
  {
    title: `${labelAdminPrefix}.settings.roles.title`,
    route: 'core.auth.admin.settings.roles',
  },
]

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
          },
        ],
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
              title: `${labelAdminPrefix}.dashboard.title`,
              iconName: Icons.dashboard,
              authorization: {
                parentRoutePath: '/core/auth/admin/dashboard',
                roles: ['01'],
              },
              isParent: true,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.dashboard.title`,
                    route: 'core.auth.admin.dashboard',
                  },
                ],
              },
            },
          },
          // Profile
          {
            path: '/core/auth/admin/profile',
            name: 'core.auth.admin.profile',
            component: () => import('./pages/admin/profile/index.vue'),
            meta: {
              title: `${labelAdminPrefix}.profile.title`,
              iconName: Icons.profile,
              authorization: {
                parentRoutePath: '/core/auth/admin/profile',
                roles: ['01'],
              },
              isParent: true,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.profile.title`,
                    route: 'core.auth.admin.profile',
                  },
                ],
              },
            },
          },
          // Users
          {
            path: '/core/auth/admin/users',
            name: 'core.auth.admin.users',
            component: () => import('./pages/admin/users/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.users.title`,
              iconName: Icons.users,
              authorization: {
                parentRoutePath: '/core/auth/admin/users',
                roles: ['01'],
              },
              isParent: true,
              create: {
                route: 'core.auth.admin.users.create',
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.users.title`,
                    route: 'core.auth.admin.users',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/users/create',
            name: 'core.auth.admin.users.create',
            component: () => import('./pages/admin/users/Create.vue'),
            meta: {
              title: `${labelAdminPrefix}.users.title`,
              iconName: Icons.users,
              authorization: {
                parentRoutePath: '/core/auth/admin/users',
                roles: ['02'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.create`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.users.title`,
                    route: 'core.auth.admin.users',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/users/edit/:id',
            name: 'core.auth.admin.users.edit',
            component: () => import('./pages/admin/users/Edit.vue'),
            meta: {
              title: `${labelAdminPrefix}.users.title`,
              iconName: Icons.users,
              authorization: {
                parentRoutePath: '/core/auth/admin/users',
                roles: ['03'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.edit`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.users.title`,
                    route: 'core.auth.admin.users',
                  },
                ],
              },
            },
          },
          // Role Groups
          {
            path: '/core/auth/admin/role-groups',
            name: 'core.auth.admin.role-groups',
            component: () => import('./pages/admin/role-groups/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.roleGroups.title`,
              iconName: Icons.roleGroups,
              authorization: {
                parentRoutePath: '/core/auth/admin/role-groups',
                roles: ['01'],
              },
              isParent: true,
              create: {
                route: 'core.auth.admin.role-groups.create',
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roleGroups.title`,
                    route: 'core.auth.admin.role-groups',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/role-groups/create',
            name: 'core.auth.admin.role-groups.create',
            component: () => import('./pages/admin/role-groups/Create.vue'),
            meta: {
              title: `${labelAdminPrefix}.roleGroups.title`,
              iconName: Icons.roleGroups,
              authorization: {
                parentRoutePath: '/core/auth/admin/role-groups',
                roles: ['02'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.create`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roleGroups.title`,
                    route: 'core.auth.admin.role-groups',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/role-groups/edit/:id',
            name: 'core.auth.admin.role-groups.edit',
            component: () => import('./pages/admin/role-groups/Edit.vue'),
            meta: {
              title: `${labelAdminPrefix}.roleGroups.title`,
              iconName: Icons.roleGroups,
              authorization: {
                parentRoutePath: '/core/auth/admin/role-groups',
                roles: ['03'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.edit`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roleGroups.title`,
                    route: 'core.auth.admin.role-groups',
                  },
                ],
              },
            },
          },
          // Settings
          {
            path: '/core/auth/admin/settings',
            name: 'core.auth.admin.settings',
            component: () => import('./pages/admin/settings/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.title`,
              iconName: Icons.settings,
              authorization: {
                parentRoutePath: '/core/auth/admin/settings',
                roles: ['01'],
              },
              isParent: true,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.settings.title`,
                    route: 'core.auth.admin.settings',
                  },
                ],
              },
            },
          },
          // Roles
          {
            path: '/core/auth/admin/settings/roles',
            name: 'core.auth.admin.settings.roles',
            component: () => import('./pages/admin/roles/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.roles.title`,
              iconName: Icons.roles,
              authorization: {
                parentRoutePath: '/core/auth/admin/settings/roles',
                roles: ['01'],
              },

              isParent: true,
              create: {
                route: 'core.auth.admin.settings.roles.create',
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: roles,
              },
            },
          },
          {
            path: '/core/auth/admin/settings/roles/create',
            name: 'core.auth.admin.settings.roles.create',
            component: () => import('./pages/admin/roles/Create.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.roles.title`,
              iconName: Icons.roles,
              authorization: {
                parentRoutePath: '/core/auth/admin/settings/roles',
                roles: ['02'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.create`,
                parent: roles,
              },
            },
          },
          {
            path: '/core/auth/admin/settings/roles/edit/:id',
            name: 'core.auth.admin.settings.roles.edit',
            component: () => import('./pages/admin/roles/Edit.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.roles.title`,
              iconName: Icons.roles,
              authorization: {
                parentRoutePath: '/core/auth/admin/settings/roles',
                roles: ['03'],
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.edit`,
                parent: roles,
              },
            },
          },
        ],
      },
      {
        path: '/core/forbidden',
        name: 'core.forbidden',
        component: () => import('./pages/Forbidden.vue'),
      },
      {
        path: '/core/:pathMatch(.*)*',
        name: 'core.routeChecker',
        component: () => import('./pages/NotFound.vue'),
      },
    ],
  },
]

export default routes
