import  { parseQuery, RouteRecordRaw  } from 'vue-router'
import App from '../App.vue'
import TodoList from '../components/TodoList.vue'
import { createWebHistory, createRouter } from "vue-router";


const routes: Array<RouteRecordRaw > = [
    {path:'/', component: App, name:'Home' },
    {
        path: '/all',
        component: TodoList,
        props: true,
        name: 'All'}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;