import {createApp} from 'vue'
import router from "./route";
import registerDrag from './directive/drag'
import App from './App.vue'

// const app = createApp({})
const app = createApp(App)
console.log(router)
app.use(router)
registerDrag(app).mount('#app')
