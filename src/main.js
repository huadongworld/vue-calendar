import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';

Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Select);

new Vue({
  el: '#app',
  render: h => h(App)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: (h) => h(App),
});
