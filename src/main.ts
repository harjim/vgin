import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'
import i18n from './locale'

import 'nprogress/nprogress.css'
import '@/styles/tailwind.scss'

const app = createApp(App)

app.use(createPinia()).use(i18n).use(router)

app.mount('#app')
