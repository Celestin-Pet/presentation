
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


import VueLoaders from 'vue-loaders';
import 'vue-loaders/dist/vue-loaders.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(LoadingPlugin)
app.use(VueLoaders)

app.mount('#app')
