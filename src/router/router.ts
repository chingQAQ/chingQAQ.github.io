import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import PageForHome from '@/views/PageForHome.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: PageForHome
	}
];
const history = createWebHashHistory();
const configuration = Object.assign({}, { routes }, { history });
const router = createRouter(configuration);

export { router, routes };
