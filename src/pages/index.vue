<template>
    <div style="height: 100%">
        <el-container>
            <el-header>
                <header-component/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>
                <footer-component/>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import HeaderComponent from '@/components/header-component/index'
    import FooterComponent from '@/components/footer-component/index'
    export default {
        name: "index",
        components: {HeaderComponent, FooterComponent}
    }
</script>

<style scoped>
    .el-main{
        margin-left: 0px !important;
        background-color: white;
        flex: none;
        padding: 0px !important;
    }
    .el-footer{
        line-height: 30px !important;
        display: flex;
        justify-content: center;
    }
    .el-container{
        height: 100%;
    }
</style>
