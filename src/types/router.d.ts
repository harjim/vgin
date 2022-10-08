import 'vue-router'

type StatusType = '403' | '404' | '500'

declare module 'vue-router' {
  interface RouteMeta {
    status?: StatusType
  }
}
