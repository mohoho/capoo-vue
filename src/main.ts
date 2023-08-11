import { createApp } from 'vue'
import Antd from 'ant-design-vue';
// import * as AntIcons from "@ant-design/icons-vue"
import 'ant-design-vue/dist/reset.css';
// @ts-ignore
import App from "./App.vue"

const app = createApp(App);
app.use(Antd).mount('#app');

// const antIcons: any = AntIcons
//
// for (const i in antIcons) {
//     app.component(i, antIcons[i]);
// }
