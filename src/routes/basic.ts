import { RouteRecordRaw } from 'vue-router'
import ResultPage from '@/views/system/ResultPage.vue'

export const NotFoundRoute: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: ResultPage,
    meta: {
      status: '404'
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

export const NotPermissionRoute: RouteRecordRaw[] = [
  {
    path: '/403',
    name: '403',
    component: ResultPage,
    meta: {
      status: '403'
    }
  }
]

export const ServerErrorRoute: RouteRecordRaw[] = [
  {
    path: '/500',
    name: '500',
    component: ResultPage,
    meta: {
      status: '500'
    }
  }
]

export const whiteRoute = [...NotPermissionRoute, ...ServerErrorRoute, ...NotFoundRoute]
