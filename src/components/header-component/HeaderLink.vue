<template>
    <div id="headerLink">
        <a href="#">{{title}}</a>
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
    height: 60px;
    cursor: pointer;
    padding: 0px 20px;
    line-height: 60px;
}
#headerLink a{
    color: white;
    text-decoration: none;
}
#headerLink a:hover{
    color: #00d7c6;
    transition: color 0.2s;
}

</style>
