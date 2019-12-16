import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
import LoginOrRegister from "@/pages/LoginOrRegister";
import Index from '@/pages/Admin/Index/index'
import Home from '@/pages/Admin/Home/index'
import TabsManager from '@/pages/Admin/TabsManager/index'
import AuditPendingList from '@/pages/Admin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/Admin/AuditPendingDetail/index'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: index,
        children: [
            {path: 'login', component: LoginOrRegister},
            {path: 'register', component: LoginOrRegister},
        ]
    }, {
        path: '/admin', component: Index, children: [
            {path: '/', redirect: 'home'},
            {path: 'home', component: Home},
            {path: 'tabs', component: TabsManager},
            {path: 'audit-pending', component: AuditPendingList},
            {path: 'audit-pending/:id', component: AuditPendingDetail}
        ]
    }

]

export default new VueRouter({
    mode: 'history',
    routes
})
