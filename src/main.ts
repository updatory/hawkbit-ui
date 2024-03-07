import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ModuleService from '@/services/ModuleService'

const app = createApp(App);

app.provide('moduleService', new ModuleService());

app.use(router);

app.mount('#app');
