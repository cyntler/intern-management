import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intern-list',
      component: () => import('./screens/InternList.vue'),
    },
    {
      path: '/new',
      name: 'intern-add-new',
      component: () => import('./screens/InternAddNew.vue'),
    },
    {
      path: '/edit/:id',
      name: 'intern-edit',
      component: () => import('./screens/InternEdit.vue'),
    },
  ],
});

export default router;
