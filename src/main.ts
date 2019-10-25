import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/assets/tailwind.css';
import i18n from './i18n';
import {configure} from 'vee-validate';
import {VeeValidateConfig} from 'vee-validate/dist/types/config';

Vue.config.productionTip = false;

configure({
  // this will be used to generate messages.
  defaultMessage: (_, values) => {
    if (values) {
      return i18n.t(`validations.${values._rule_}`, values);
    }
  },
} as Partial<VeeValidateConfig>);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
