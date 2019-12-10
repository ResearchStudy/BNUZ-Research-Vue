<template>
    <div id="header">
        <div class="left">
            <div class="logo">师大研学</div>
            <header-link v-for="title in titleArr" :title="title" :key="title"/>
        </div>
        <div class="right">
            <span>注册</span>
            <span>登录</span>
        </div>
    </div>
</template>

<script>
    import HeaderLink from "@/components/HeaderComponent/HeaderLink";
    export default {
        name: "Header",
        components: {HeaderLink},
        data(){
            return {
                titleArr: ['首页', '课程', '圈子', 'APP', '咨询', '我们']
            }
        }
    }
</script>

<style scoped>
#header {
    width: 100%;
    color: white;
    background-color: black;
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
}
.left, .right{
    display: flex;
    align-items: center;
}
.logo{
    font-size: 30px;
}
</style>