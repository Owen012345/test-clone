import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import 'vuetify/styles'
import { registerPlugins } from '@/plugins'

const app = createApp(App)
registerPlugins(app)

app.use(router)
app.use(stores)

app.mount('#app')
