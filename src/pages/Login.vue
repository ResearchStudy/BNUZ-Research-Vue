<template>
    <div>
        <header-component/>
        <footer-component/>
    </div>
</template>

<script>
    import HeaderComponent from '@/components/header-component/index'
    import FooterComponent from '@/components/footer-component/index'
    export default {
        name: "Login",
        components: {HeaderComponent, FooterComponent}
    }
</script>

<style scoped>

</style>
