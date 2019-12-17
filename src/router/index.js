import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
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
