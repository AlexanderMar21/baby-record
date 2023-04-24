import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import { VueFire, VueFireAuth } from 'vuefire';
import 'virtual:windi.css';
import { firebaseApp } from './services/firebase';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(autoAnimatePlugin);
app.use(VueFire, {
	// imported above but could also just be created here
	firebaseApp,
	modules: [
		// we will see other modules later on
		VueFireAuth(),
	],
});
app.mount('#app');
