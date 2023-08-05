import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
import store from './store/index.js'
import i18n from '@/assets/language'
import 'vant/lib/index.css'
import '@/assets/css/global.css'
import '@/assets/js/disable-enlarge.js'
import Global from '@/assets/js/global.js'
import Common from '@/assets/js/common.js'
import { LotteryGrid } from 'lattice-lottery-plus'
import 'lattice-lottery-plus/lib/lattice-lottery.css'
import Vconsole from 'vconsole';
const vConsole = new Vconsole()
const OjbApp = createApp(App)
OjbApp.config.globalProperties.$global = Global
OjbApp.config.globalProperties.$common = Common


OjbApp
.use(router)
.use(i18n)
.use(store)
.use(LotteryGrid)
.use(Vant)
.use(vConsole)
.mount('#app')
