import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
import Login from "@/pages/index/Login";
import Register from "@/pages/index/Register";
import Organization from "@/pages/organization/Organization";
import OrganizationIndex from "@/pages/organization/index";
import CoursesIndex from "@/pages/courses/index";
import CoursesForm from "@/pages/courses/CoursesForm";
import Home from "@/pages/index/Home";
import store from '@/store'
import {checkUserLogin, getUserInfo} from "../api/user";
import rootAdminRoutes from "./rootAdmin";
import normalRoutes from "./normal";
import NotFound from "../pages/common/NotFound";
import insitutionAdminRoutes from "./institutionAdmin";
import OrganizationRegister from "@/pages/organization/OrganizationRegister";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: index,
        children: [
            { path: '', component: Home },
            { path: 'login', component: Login },
            { path: 'register', component: Register },
            {path: 'organization/', component: OrganizationIndex, children: [
                    {path: '', component: Organization},
                    {path: 'register', component: OrganizationRegister}
                ]},
            {
                path: 'courses/', component: CoursesIndex, children: [
                    {path: 'form',component: CoursesForm }
                ]
            }
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

const permitAllRoutes = ['/login', '/register', '/home', '/organization'];


router.beforeEach((to, from, next) => {
    if (to.path.includes("/logout")) {
        localStorage.setItem("id", "");
        store.dispatch('setRole', "")
        next({ path: '/login' })
    }
    if (permitAllRoutes.includes(to.path) || store.getters.role.length !== 0) {
        next()
    }
    else {
        if (!localStorage.getItem("id") || localStorage.getItem("id").length === 0) {
            next({ path: '/login' })
        } else {
            if (store.getters.role.length === 0) {
                checkUserLogin().then((res) => {
                    if(!res.status){
                        next({path : '/login'})
                        localStorage.setItem("id", "")
                    }else{
                        getUserInfo(localStorage.getItem("id")).then((res) => {
                            store.dispatch('setUserInfoAndRole', res);
                            if (res.role === 99) {
                                router.addRoutes(rootAdminRoutes);
                            } else if (res.role === 8) {
                                router.addRoutes(insitutionAdminRoutes)
                            }
                            else if (res.role === 0 || res.role === 1 || res.role === 2) {
                                router.addRoutes(normalRoutes);
                            }
                            next({ path: to.path })
                        })
                    }
                })
            }
        }
    }
});


export default router
