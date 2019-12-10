<template>
    <div id="headerLink">
        {{title}}
    </div>
</template>

<script>
    export default {
        name: "HeaderLink",
        props: {
            title: String
        }
    }
</script>

<style scoped>
#headerLink{
    display: flex;
    align-items: center;
    color: white;
    padding: 0 10px;
    height: 100%;
}
</style>