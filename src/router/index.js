import VueRouter from "vue-router";
import Vue from 'vue'
import Login from "@/pages/Login";
import Index from '@/pages/Admin/Index/index'
import Home from '@/components/Admin/Home/index'
import TabsManager from '@/components/Admin/TabsManager/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login', component: Login
    }, {
        path: '/admin', component: Index, children: [
            { path: '/', redirect: 'home' },
            { path: 'home', component: Home },
            { path: 'tabs', component: TabsManager }
        ]
    }

]

export default new VueRouter({
    mode: 'history',
    routes
})