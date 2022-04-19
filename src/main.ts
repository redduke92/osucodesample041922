import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp({
    render: () => h(App)
}).use(router).use(router).mount('#app')

/*createApp(App).mount('#app')*/
