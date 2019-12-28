<template>
<div style="display: flex;border: 1px solid #f2f2f2;padding: 20px;background-color: white">
<div>
  <img :src="imgSrc" alt="courseIcon" style="width: 150px;height: 150px">
</div>
<div style="padding-left: 20px">
  <h4>{{title}}</h4>
  <span>{{courseType}} | {{tagName}}</span>
</div>
</div>
</template>

<script>
    export default {
        name: "card",
        props:{
            title: {
                type: String,
                default: ''
            },
            courseType: {
                type: String,
                default: ''
            },
            tagName:{
                type: String,
                default: ''
            },
            imgSrc: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
