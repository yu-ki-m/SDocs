import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import './styles/globals.css'
import './styles/colors.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
