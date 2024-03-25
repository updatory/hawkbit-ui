import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import type { EventList } from '@/events/EventList'
import DistributionService from '@/services/DistributionService'

// Source: https://stackoverflow.com/a/64019074
const emitter = mitt<EventList>()

const app = createApp(App)

app.config.globalProperties.emitter = emitter

// app.provide('moduleService', new ModuleService())
// app.provide('artifactService', new ArtifactService())
app.provide('distributionService', new DistributionService())

app.use(router)

app.mount('#app')
