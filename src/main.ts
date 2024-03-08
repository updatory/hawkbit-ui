import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ModuleService from '@/services/ModuleService'
import ArtifactService from '@/services/ArtifactService'
import mitt from 'mitt';
import type { EventList } from '@/events/EventList'

// Source: https://stackoverflow.com/a/64019074
const emitter = mitt<EventList>();

const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app.provide('moduleService', new ModuleService());
app.provide('artifactService', new ArtifactService());

app.use(router);

app.mount('#app');
