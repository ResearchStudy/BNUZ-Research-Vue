import VueRouter from "vue-router";
import Vue from 'vue'
import Login from "@/pages/Login";

Vue.use(VueRouter)

const routes = [
    {path: '/login', component: Login}
]

export default new VueRouter({
    mode: 'history',
    routes
})