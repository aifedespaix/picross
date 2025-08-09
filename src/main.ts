import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/assets/tailwind.css';
import i18n from './i18n';
import { configure } from 'vee-validate';
import { VeeValidateConfig } from 'vee-validate/dist/types/config';

/**
 * Expected properties available in the default message generator of vee-validate.
 */
interface ValidationValues extends Record<string, unknown> {
  _rule_: string;
}

configure({
  // this will be used to generate messages.
  defaultMessage: (_: unknown, values: ValidationValues): string =>
    i18n.global.t(`validations.${values._rule_}`, values),
} as Partial<VeeValidateConfig>);

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.mount('#app');
