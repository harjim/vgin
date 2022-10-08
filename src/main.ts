import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
