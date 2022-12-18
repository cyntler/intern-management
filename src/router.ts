import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intern-list',
      component: () => import('./screens/InternList.vue'),
    },
  ],
});

export default router;
