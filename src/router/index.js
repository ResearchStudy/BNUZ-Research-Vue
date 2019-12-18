import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
import Login from "@/pages/index/Login";
import Register from "@/pages/index/Register";
import Organization from "@/pages/organization/Organization";
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
            {path: '', component: Organization},
            {path: 'login', component: Login},
            {path: 'register', component: Register}
        ]
    },
    {
        path: "*",
        component: NotFound
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
});

const permitAllRoutes = ['/login', '/register', '/home'];


router.beforeEach((to, from, next) => {
    if(to.path.includes("/logout")){
        localStorage.setItem("id", "");
        store.dispatch('setRole', "")
        next({path: '/login'})
    }
    if(permitAllRoutes.includes(to.path) ||store.getters.role.length !== 0){
        next()
    }
    else{
        if (!localStorage.getItem("id") || localStorage.getItem("id").length === 0) {
            next({path: '/login'})
        } else {
            if (store.getters.role.length === 0) {
                getUserInfo(localStorage.getItem("id")).then((res) => {
                    store.dispatch('setUserInfoAndRole', res);
                    if (res.role === 8) {
                        router.addRoutes(adminRoutes);
                    }else if(res.role === 1){
                        router.addRoutes(normalRoutes);
                    }
                    next({path: to.path})
                })
            }
        }
    }
})


export default router
