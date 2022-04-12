import  { RouteRecordRaw  } from 'vue-router'
import AllTasks from '../views/AllTasks.vue'
import CompletedTasks from '../views/CompletedTasks.vue'
import ActiveTasks from '../views/ActiveTasks.vue'
import { createWebHistory, createRouter } from "vue-router";


const routes: Array<RouteRecordRaw > = [
    {
        path:'/',
        components: {
            default: AllTasks,
        },
    },
    {
        path:'/all',
        components: {
            default: AllTasks,
        },
    },
    {
        path:'/completed',
        components: {
            default: CompletedTasks,
        },
    },
    {
        path:'/active',
        components: {
            default: ActiveTasks,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/",
      }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;