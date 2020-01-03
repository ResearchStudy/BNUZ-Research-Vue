<template>
<div style="border: 1px solid #ffffff;padding: 20px;background-color: white;overflow: hidden;display: inline-block">
<div style="cursor: pointer;border: 1px solid #f2f2f2; box-shadow: 0 0 10px 0 rgba(0,0,0,0.1)">
  <img :src="imgSrc" alt="courseIcon" style="width: 100%;height: 150px" v-if="imgSrc !== '/api/resources/'">
  <img src="../../assets/img/default-news.jpg" alt="courseIcon" style="width: 100%;height: 150px" v-else>
  <div style="padding-left: 5%;width: 100%;height: 80px;margin-top: 10px" >
    <el-link :underline="false" style="font-size: 16px;font-weight: bold">{{title.length > 10 ? title.substring(0, 10) + '...' :title}}</el-link>
    <div style="font-size: 14px;margin-top: 10px;width: 90%">  {{description.length > 37 ? description.substring(0, 37) + '...' : description}}  </div>
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
