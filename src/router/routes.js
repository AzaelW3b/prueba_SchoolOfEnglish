
const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'niveles', icono: 'manage_accounts', label: 'Niveles', name: 'niveles', component: () => import('../modules/NivelesModule.vue') },
      { path: 'usuarios', icono: 'person', label: 'Usuarios', name: 'usuarios', component: () => import('../modules/UsuariosModule.vue') }
      // { path: 'usuarios', component: () => import('modules/UsuariosModule.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
