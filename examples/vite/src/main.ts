import { createApp } from 'vue'
import App from './App.vue'
import { msg } from 'virtual:modules'

console.log(msg)

const app = createApp(App)

app.mount('#app')
