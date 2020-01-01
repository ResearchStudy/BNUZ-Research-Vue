<template>
<div id="footer">
  <div style="display: flex">
    <div v-for="(footerMsg, index) in footerLeftArr" :key="footerMsg.title" :style="index === 0 ? {paddingLeft: '30px'} : {paddingLeft: '150px'}">
      <FooterTable :title="footerMsg.title" :children="footerMsg.children" :position="footerMsg.position"/>
    </div>
  </div>
  <div style="padding-right: 1%">
    <div v-for="footerMsg in footerRightArr" :key="footerMsg.title" style="padding-left: 50px">
      <FooterTable :title="footerMsg.title" :children="footerMsg.children" :position="footerMsg.position"/>
    </div>
  </div>
</div>
</template>

<script>
    import FooterTable from "./FooterTable";
    export default {
        name: "index",
        components: {FooterTable},
        data(){
            return {
                footerLeftArr:[
                    {
                        title: "企业服务",
                        children: ["研学搜索", "新闻资讯", "研学APP"],
                        position: "left"
                    },{
                        title: "使用与帮助",
                        children: ["用户协议与隐私政策", "防骗指南", "研学发布规则"],
                        position: "left"
                    },{
                        title: "关于我们",
                        children: ["项目介绍", "企业背景", "加入我们"],
                        position: "left"
                    }
                ],
                footerRightArr: [
                    {
                        title: "师大研学平台",
                        children: ["企业服务热线与投诉举报电话  123456789", "工作日  8:00 - 22:00", "休息日  0:00 - 24:00"],
                        position: "right"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
#footer{
  display: flex;
  margin-top: 30px;
  width: 88%;
  margin-left: 6%;
}
</style>
