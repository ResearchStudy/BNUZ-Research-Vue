<template>
<div class="container">
  <h1 style="color: #409eff">{{organizationInfo.name}}</h1>
  <span style="padding-right: 20px">联系人: {{organizationInfo.legal_person}}</span>
  <span>联系电话: {{organizationInfo.phone}}</span>
  <el-divider></el-divider>
  <div style="display: flex">
    <div>
      <img :src="'/api/resources/' + organizationInfo.logo" alt="机构Logo" style="width: 450px;height: 200px">
    </div>
    <div style="padding-left: 40px">
      <div class="detail-info">成立时间: {{organizationInfo.establishDate}}</div>
      <div class="detail-info">注册资金: 人民币{{organizationInfo.registered_money}}万元</div>
      <div class="detail-info">经营范围: {{organizationInfo.business_scope}}</div>
      <div class="detail-info">注册地址: {{organizationInfo.address.country_name}} {{organizationInfo.address.province_name}} {{organizationInfo.address.city_name}} {{organizationInfo.address.details}}</div>
    </div>
  </div>
  <el-divider></el-divider>
  <el-tabs v-model="activeName">
    <el-tab-pane label="发布的课程" name="first">
      <div></div>
    </el-tab-pane>
    <el-tab-pane label="发布的资讯" name="second">
      <div></div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
  import {getInstitutionsInfo} from "../../api/institutions";

  export default {
        name: "OrganizationDetail",
        mounted(){
          this.getInstitutionsInfo(this.$route.params.id);
        },
        data(){
            return{
                organizationInfo: {},
                activeName: 'first'
            }
        },
        methods:{
            async getInstitutionsInfo(id){
                const result = await getInstitutionsInfo(id)
                const organizationInfo = result.institution_details
                const date = new Date(organizationInfo.establish_time * 1000)
                const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1
                organizationInfo.establishDate = date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
                this.organizationInfo = organizationInfo;
            }
        }
    }
</script>

<style scoped>
.container{
  width: 70%;
  margin-left: 15%;
}
  .detail-info{
    padding: 10px;
  }
</style>
