import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'

const app = createApp(App)
axios.defaults.baseURL = 'http://localhost'
app.config.globalProperties.$http = axios
axios.defaults.headers.common['Referer'] = null
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus).use(router)

app.mount('#app')