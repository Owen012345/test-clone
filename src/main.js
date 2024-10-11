import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router'
import stores from './stores'
import { registerPlugins } from '@/plugins'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import CustomModal from '@/components/custom/CustomModal.vue'

// dayjs 플러그인 설정
dayjs.extend(utc)
dayjs.extend(timezone)

stores.dispatch('nodeDetail/initStorageSchema')

const app = createApp(App)

app.config.globalProperties.$guessTimezone = function () {
  return dayjs.tz.guess()
}

app.component('CustomModal', CustomModal)

registerPlugins(app)

app.use(router)
app.use(stores)

app.mount('#app')
