import type {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name: 'Snappic Stream-EZ', path: '', component: () => import('pages/IndexPage.vue')},
      {name: 'Streams List', path: '/list', component: () => import('pages/ListStreams.vue')},
      {name: 'Streams Visualisation', path: '/graph', component: () => import('pages/StreamGraph.vue')},
      {name: 'Stream Calaculator', path: '/calculator', component: () => import('pages/StreamCalculator.vue')},
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
