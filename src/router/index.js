import VueRouter from "vue-router";
import Vue from 'vue'
import Login from "@/pages/Login";
import Index from '@/pages/Admin/Index/index'
import Home from '@/pages/Admin/Home/index'
import TabsManager from '@/pages/Admin/TabsManager/index'
import AuditPending from '@/pages/Admin/AuditPending/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login', component: Login
    }, {
        path: '/admin', component: Index, children: [
            { path: '/', redirect: 'home' },
            { path: 'home', component: Home },
            { path: 'tabs', component: TabsManager },
            { path: 'audit-pending', component: AuditPending }
        ]
    }

]

export default new VueRouter({
    mode: 'history',
    routes
})