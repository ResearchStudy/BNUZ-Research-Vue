<template>
    <div id="header">
        <div class="left">
            <div class="logo">北师研学</div>
            <div style="display: flex; justify-content: space-between">
                <header-link v-for="title in titleArr" :title="title" :key="title"/>
            </div>
        </div>
        <div class="right" style="margin-right: 10px">
            <button style="margin-right: 30px" v-if="role === 8">我要发布</button>
            <button style="margin-right: 17px" @click="navigateTo('/register')" v-if="role.length === 0">注册</button>
            <button @click="navigateTo('/login')" v-if="role.length === 0">登录</button>
            <a v-if="role.length !== 0" style="cursor: pointer" @click="navigateToAdmin">{{userInfo.nickname}}</a>
        </div>
    </div>
</template>

<script>
    import HeaderLink from "@/components/header-component/HeaderLink";
    export default {
        name: "Header",
        components: {HeaderLink},
        data(){
            return {
                titleArr: ['首页', '课程', '机构', 'APP', '资讯', '掠影', '我们']
            }
        },
        methods:{
            navigateTo(path){
                this.$router.push({path: path})
            },
            navigateToAdmin(){
                if(this.role === 99){
                    this.$router.push({path: '/admin/dashboard'})
                }else{
                    this.$router.push({path: '/person'})
                }
            }
        },
        computed:{
            role(){
                return this.$store.getters.role
            },
            userInfo(){
              return this.$store.getters.userInfo
            }
        }
    }
</script>

<style scoped>
#header {
    width: 100%;
    color: white;
    background-color: #202329;
    height: 60px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 8px rgba(0,0,0,.06);
}
.left, .right{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo{
    font-size: 30px;
    cursor: pointer;
    margin: 0px 50px;
}
.right button{
    border: 1px #5dd5c8 solid;
    border-radius: 15px;
    background-color: inherit;
    color: white;
    letter-spacing: 1px;
    padding: 0px 9px 0px 11px;
    font-size: 13px;
}
    .right button:hover{
        color: #5dd5c8;
        transition: color 0.2s;
    }
    .right button:focus{
        outline: 0;
    }
</style>
