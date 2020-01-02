<template>
<div style="display: flex;border: 1px solid #ffffff;padding: 20px;background-color: white">
<div>
  <img :src="imgSrc" alt="courseIcon" style="width: 100%;height: 150px">
  <br><br>
  <div style="padding-left: 5%;width: 100%;height: 80px" >
    <el-link :underline="false" style="font-size: 16px;font-weight: bold">{{title.length > 10 ? title.substring(0, 10) + '...' :title}}</el-link>
    <br>
    <span style="font-size: 14px">  {{description.length > 37 ? description.substring(0, 37) + '...' : description}}  </span>
  </div>
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
          description: {
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
