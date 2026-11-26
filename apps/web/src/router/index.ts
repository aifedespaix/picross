import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { i18n } from '@/i18n';
import { useAuthStore } from '@/stores/auth';

declare module 'vue-router' {
  interface RouteMeta {
    /** Clé i18n du titre de page. */
    title?: string;
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'play',
    component: () => import('@/views/PlayView.vue'),
    meta: { title: 'nav.play' },
  },
  {
    path: '/play/:id',
    name: 'play-id',
    component: () => import('@/views/PlayView.vue'),
    meta: { title: 'nav.play' },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { title: 'nav.gallery' },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/CreateView.vue'),
    meta: { title: 'nav.create', requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { title: 'nav.profile', requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { title: 'nav.admin', requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthView.vue'),
    props: { mode: 'login' },
    meta: { title: 'nav.login' },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/AuthView.vue'),
    props: { mode: 'register' },
    meta: { title: 'nav.register' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'errors.notFoundPage' },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 },
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.init().catch(() => {
    /* API injoignable : on continue en mode déconnecté */
  });

  if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: 'play' };
  if ((to.name === 'login' || to.name === 'register') && auth.isLoggedIn) return { name: 'play' };
  return true;
});

router.afterEach((to) => {
  const { t } = i18n.global;
  document.title = to.meta.title ? `${t(to.meta.title)} · ${t('app.name')}` : t('app.name');
});
