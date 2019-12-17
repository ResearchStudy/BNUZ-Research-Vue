import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
import Login from "@/pages/Login";
import Index from '@/pages/Admin/Index/index'
import Home from '@/pages/Admin/Home/index'
import TabsManager from '@/pages/Admin/TabsManager/index'
import AuditPendingList from '@/pages/Admin/AuditPendingList/index'
import AuditPendingDetail from '@/pages/Admin/AuditPendingDetail/index'
import PreEntry from '@/pages/Person/PreEntry/index'
import PersonIndex from '@/pages/Person/Index/index'
import AlrEntry from '@/pages/Person/AlrEntry/index'
import ResetPwd from '@/pages/Person/ResetPwd/index'
import LoginOrRegister from "@/pages/index/LoginOrRegister";
import store from '@/store'
import {getUserInfo} from "../api/user";
import adminRoutes from "./admin";
import normalRoutes from "./normal";
import NotFound from "../pages/common/NotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: index,
        children: [
            {path: 'login', component: LoginOrRegister},
            {path: 'register', component: LoginOrRegister},

        ]
    },{
        path : '/person' , component : PersonIndex, children:[
            {path : 'pre-entry' , component : PreEntry},
            {path : 'alr-entry' , component : AlrEntry},
            {path : 'reset-pwd' ,component : ResetPwd},
        ]
    },
    {
        path: '*',
        component: NotFound
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
});

const permitAllRoutes = ['/login', '/register'];


router.beforeEach((to, from, next) => {
    if(permitAllRoutes.includes(to.path) || store.getters.role.length !== 0){
        next()
    }
    else{
        if (!localStorage.getItem("id") || localStorage.getItem("id").length === 0) {
            next({path: '/login'})
        } else {
            if (store.getters.role.length === 0) {
                getUserInfo(localStorage.getItem("id")).then((res) => {
                    store.dispatch('setUserInfoAndRole', res);
                    if (res.role === 99) {
                        router.addRoutes(adminRoutes);
                        next({path: "/admin/home"});
                    }else if(res.role === 1){
                        router.addRoutes(normalRoutes);
                        next({path: "/home"})
                    }
                })
            }
        }
    }
})


export default router
