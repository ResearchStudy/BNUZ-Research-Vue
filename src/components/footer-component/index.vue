<template>
<div id="footer">
  <div style="display: flex">
    <div v-for="footerMsg in footerLeftArr" :key="footerMsg.title">
      <FooterTable :title="footerMsg.title" :children="footerMsg.children" :position="footerMsg.position"/>
    </div>
  </div>
  <div style="padding-right: 220px;padding-left: 220px" >
    <div v-for="footerMsg in footerRightArr" :key="footerMsg.title">
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
  justify-content: space-between;
  width: 80%;
  margin-left: 10%;
}
</style>
