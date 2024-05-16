import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import type { EventList } from '@/events/EventList'

// Source: https://stackoverflow.com/a/64019074
const emitter = mitt<EventList>()

const app = createApp(App)

app.config.globalProperties.emitter = emitter

app.use(router)

app.mount('#app')
