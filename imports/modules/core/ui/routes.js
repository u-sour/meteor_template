import Icons from '../utils/icons'
const labelAdminPrefix = 'core.pages.admin'
const labelPageTypesPrefix = 'core.pageTypes'

// breadcrumb parent
const childRoles = [
  {
    title: `${labelAdminPrefix}.settings.title`,
    route: 'core.auth.admin.settings',
  },
  {
    title: `${labelAdminPrefix}.settings.childRoles.title`,
    route: 'core.auth.admin.settings.child-roles',
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
          // Roles
          {
            path: '/core/auth/admin/roles',
            name: 'core.auth.admin.roles',
            component: () => import('./pages/admin/roles/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.roles.title`,
              iconName: Icons.roles,
              isParent: true,
              create: {
                route: 'core.auth.admin.roles.create',
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roles.title`,
                    route: 'core.auth.admin.roles',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/roles/create',
            name: 'core.auth.admin.roles.create',
            component: () => import('./pages/admin/roles/Create.vue'),
            meta: {
              title: `${labelAdminPrefix}.roles.title`,
              iconName: Icons.roles,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.create`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roles.title`,
                    route: 'core.auth.admin.roles',
                  },
                ],
              },
            },
          },
          {
            path: '/core/auth/admin/roles/edit/:id',
            name: 'core.auth.admin.roles.edit',
            component: () => import('./pages/admin/roles/Edit.vue'),
            meta: {
              title: `${labelAdminPrefix}.roles.title`,
              iconName: Icons.users,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.edit`,
                parent: [
                  {
                    title: `${labelAdminPrefix}.roles.title`,
                    route: 'core.auth.admin.roles',
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
          // Child Roles
          {
            path: '/core/auth/admin/settings/child-roles',
            name: 'core.auth.admin.settings.child-roles',
            component: () => import('./pages/admin/child-roles/Index.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.childRoles.title`,
              iconName: Icons.childRole,
              isParent: true,
              create: {
                route: 'core.auth.admin.settings.child-roles.create',
              },
              breadcrumb: {
                title: `${labelPageTypesPrefix}.index`,
                parent: childRoles,
              },
            },
          },
          {
            path: '/core/auth/admin/settings/child-roles/create',
            name: 'core.auth.admin.settings.child-roles.create',
            component: () => import('./pages/admin/child-roles/Create.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.childRoles.title`,
              iconName: Icons.childRole,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.create`,
                parent: childRoles,
              },
            },
          },
          {
            path: '/core/auth/admin/settings/child-roles/edit/:id',
            name: 'core.auth.admin.settings.child-roles.edit',
            component: () => import('./pages/admin/child-roles/Edit.vue'),
            meta: {
              title: `${labelAdminPrefix}.settings.childRoles.title`,
              iconName: Icons.childRole,
              breadcrumb: {
                title: `${labelPageTypesPrefix}.edit`,
                parent: childRoles,
              },
            },
          },
        ],
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
