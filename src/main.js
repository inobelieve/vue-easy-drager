import {createApp} from 'vue'
import router from "./route";
import registerDrag from './directive/drag'
import App from './App.vue'

// const app = createApp({})
const app = createApp(App)
app.use(router)
registerDrag(app).mount('#app')
