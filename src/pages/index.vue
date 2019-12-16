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

</style>