import {createApp} from '@/main';

// 客户端特定引导逻辑
const {app} = createApp();

// 这里假定App.vue模版中根元素具有 id="app"
app.$mount('#app');
