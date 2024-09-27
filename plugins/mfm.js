import { defineNuxtPlugin } from '#app';
import Mfm from 'mfm-renderer';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Mfm);
});
